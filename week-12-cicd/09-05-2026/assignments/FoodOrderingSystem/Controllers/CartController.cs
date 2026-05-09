using FoodOrderingSystem.Data;
using FoodOrderingSystem.Models;
using FoodOrderingSystem.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FoodOrderingSystem.Controllers
{
    [Authorize]
    public class CartController : Controller
    {
        private readonly ApplicationDbContext _db;

        public CartController(ApplicationDbContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;

            ShoppingCartVM shoppingCartVM = new()
            {
                ListCart = _db.ShoppingCarts.Include(u => u.FoodItem).Where(u => u.ApplicationUserId == userId),
                OrderTotal = 0
            };

            foreach (var cart in shoppingCartVM.ListCart)
            {
                shoppingCartVM.OrderTotal += (cart.FoodItem.Price * cart.Count);
            }

            return View(shoppingCartVM);
        }

        public IActionResult Plus(int cartId)
        {
            var cartFromDb = _db.ShoppingCarts.FirstOrDefault(u => u.Id == cartId);
            cartFromDb.Count += 1;
            _db.ShoppingCarts.Update(cartFromDb);
            _db.SaveChanges();
            return RedirectToAction(nameof(Index));
        }

        public IActionResult Minus(int cartId)
        {
            var cartFromDb = _db.ShoppingCarts.FirstOrDefault(u => u.Id == cartId);
            if (cartFromDb.Count <= 1)
            {
                _db.ShoppingCarts.Remove(cartFromDb);
            }
            else
            {
                cartFromDb.Count -= 1;
                _db.ShoppingCarts.Update(cartFromDb);
            }
            _db.SaveChanges();
            return RedirectToAction(nameof(Index));
        }

        public IActionResult Remove(int cartId)
        {
            var cartFromDb = _db.ShoppingCarts.FirstOrDefault(u => u.Id == cartId);
            _db.ShoppingCarts.Remove(cartFromDb);
            _db.SaveChanges();
            return RedirectToAction(nameof(Index));
        }

        // GET: Loads the checkout page
        public IActionResult Summary()
        {
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;

            ShoppingCartVM shoppingCartVM = new()
            {
                ListCart = _db.ShoppingCarts.Include(u => u.FoodItem).Where(u => u.ApplicationUserId == userId),
                OrderHeader = new()
            };

            shoppingCartVM.OrderHeader.ApplicationUser = _db.Users.FirstOrDefault(u => u.Id == userId);

            foreach (var cart in shoppingCartVM.ListCart)
            {
                shoppingCartVM.OrderHeader.OrderTotal += (cart.FoodItem.Price * cart.Count);
            }

            return View(shoppingCartVM);
        }

        // POST: Submits the order
        [HttpPost]
        [ActionName("Summary")]
        public IActionResult SummaryPOST(ShoppingCartVM shoppingCartVM)
        {
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;

            shoppingCartVM.ListCart = _db.ShoppingCarts.Include(u => u.FoodItem).Where(u => u.ApplicationUserId == userId).ToList();

            shoppingCartVM.OrderHeader.ApplicationUserId = userId;
            shoppingCartVM.OrderHeader.OrderDate = System.DateTime.Now;
            shoppingCartVM.OrderHeader.OrderStatus = "Pending"; // Order received but not yet processed

            foreach (var cart in shoppingCartVM.ListCart)
            {
                shoppingCartVM.OrderHeader.OrderTotal += (cart.FoodItem.Price * cart.Count);
            }

            _db.OrderHeaders.Add(shoppingCartVM.OrderHeader);
            _db.SaveChanges();

            // Move items from Shopping Cart to Order Details
            foreach (var cart in shoppingCartVM.ListCart)
            {
                OrderDetail orderDetail = new()
                {
                    FoodItemId = cart.FoodItemId,
                    OrderId = shoppingCartVM.OrderHeader.Id,
                    Price = cart.FoodItem.Price,
                    Count = cart.Count
                };
                _db.OrderDetails.Add(orderDetail);
            }
            _db.SaveChanges();

            // Empty the user's shopping cart
            _db.ShoppingCarts.RemoveRange(shoppingCartVM.ListCart);
            _db.SaveChanges();

            return RedirectToAction(nameof(OrderConfirmation), new { id = shoppingCartVM.OrderHeader.Id });
        }

        public IActionResult OrderConfirmation(int id)
        {
            return View(id);
        }
    }
}