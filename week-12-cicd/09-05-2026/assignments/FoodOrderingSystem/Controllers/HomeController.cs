using FoodOrderingSystem.Data;
using FoodOrderingSystem.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Security.Claims;

namespace FoodOrderingSystem.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext _db;

        public HomeController(ILogger<HomeController> logger, ApplicationDbContext db)
        {
            _logger = logger;
            _db = db;
        }

        public IActionResult Index()
        {
            IEnumerable<FoodItem> foodItemList = _db.FoodItems.Include(u => u.Category).ToList();
            return View(foodItemList);
        }

        // GET: Details (Shows the food item and quantity box)
        public IActionResult Details(int productId)
        {
            ShoppingCart cartObj = new()
            {
                Count = 1,
                FoodItemId = productId,
                FoodItem = _db.FoodItems.Include(u => u.Category).FirstOrDefault(u => u.Id == productId)
            };

            return View(cartObj);
        }

        // POST: Details (Saves the item to the cart)
        [HttpPost]
        [Authorize] // This forces the user to log in before adding to cart!
        public IActionResult Details(ShoppingCart shoppingCart)
        {
            // Get the ID of the currently logged-in user
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;
            shoppingCart.ApplicationUserId = userId;

            // Check if they already have this item in their cart
            ShoppingCart cartFromDb = _db.ShoppingCarts.FirstOrDefault(
                u => u.ApplicationUserId == userId && u.FoodItemId == shoppingCart.FoodItemId);

            if (cartFromDb != null)
            {
                // Item exists, just update the quantity
                cartFromDb.Count += shoppingCart.Count;
                _db.ShoppingCarts.Update(cartFromDb);
            }
            else
            {
                // Add new item to cart
                _db.ShoppingCarts.Add(shoppingCart);
            }

            _db.SaveChanges();
            return RedirectToAction(nameof(Index));
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}