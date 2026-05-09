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
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _db;

        public OrderController(ApplicationDbContext db)
        {
            _db = db;
        }

        // GET: View all orders
        public IActionResult Index()
        {
            // Fetch all orders from the database
            IEnumerable<OrderHeader> objOrderHeaders = _db.OrderHeaders.Include(u => u.ApplicationUser).ToList();
            return View(objOrderHeaders);
        }

        // GET: View specific order details
        public IActionResult Details(int orderId)
        {
            OrderVM orderVM = new()
            {
                OrderHeader = _db.OrderHeaders.Include(u => u.ApplicationUser).FirstOrDefault(u => u.Id == orderId),
                OrderDetail = _db.OrderDetails.Include(u => u.FoodItem).Where(u => u.OrderId == orderId)
            };

            return View(orderVM);
        }

        // POST: Update Order Status to "In Process"
        [HttpPost]
        public IActionResult StartProcessing(int orderId)
        {
            var orderHeader = _db.OrderHeaders.FirstOrDefault(u => u.Id == orderId);
            orderHeader.OrderStatus = "In Process";
            _db.SaveChanges();

            return RedirectToAction(nameof(Details), new { orderId = orderId });
        }

        // POST: Update Order Status to "Completed"
        [HttpPost]
        public IActionResult CompleteOrder(int orderId)
        {
            var orderHeader = _db.OrderHeaders.FirstOrDefault(u => u.Id == orderId);
            orderHeader.OrderStatus = "Completed";
            _db.SaveChanges();

            return RedirectToAction(nameof(Details), new { orderId = orderId });
        }

        // POST: Cancel Order
        [HttpPost]
        public IActionResult CancelOrder(int orderId)
        {
            var orderHeader = _db.OrderHeaders.FirstOrDefault(u => u.Id == orderId);
            orderHeader.OrderStatus = "Cancelled";
            _db.SaveChanges();

            return RedirectToAction(nameof(Details), new { orderId = orderId });
        }
    }
}