using FoodOrderingSystem.Data;
using FoodOrderingSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace FoodOrderingSystem.Controllers
{
    public class FoodItemController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public FoodItemController(ApplicationDbContext db, IWebHostEnvironment webHostEnvironment)
        {
            _db = db;
            _webHostEnvironment = webHostEnvironment;
        }

        // GET: Index
        public IActionResult Index()
        {
            List<FoodItem> objFoodItemList = _db.FoodItems.Include(u => u.Category).ToList();
            return View(objFoodItemList);
        }

        // GET: Create
        public IActionResult Create()
        {
            ViewBag.CategoryList = new SelectList(_db.Categories.ToList(), "Id", "Name");
            return View();
        }

        // POST: Create
        [HttpPost]
        public IActionResult Create(FoodItem obj, IFormFile? file)
        {
            if (ModelState.IsValid)
            {
                string wwwRootPath = _webHostEnvironment.WebRootPath;
                if (file != null)
                {
                    // Generate a unique file name
                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

                    // Create the path safely for both Windows and Linux
                    string productPath = Path.Combine(wwwRootPath, "images", "food");

                    // Ensure the directory actually exists before saving
                    if (!Directory.Exists(productPath))
                    {
                        Directory.CreateDirectory(productPath);
                    }

                    // Save the file
                    using (var fileStream = new FileStream(Path.Combine(productPath, fileName), FileMode.Create))
                    {
                        file.CopyTo(fileStream);
                    }

                    // CRITICAL DOCKER FIX: Use forward slashes for Linux web compatibility
                    obj.ImageUrl = "/images/food/" + fileName;
                }

                _db.FoodItems.Add(obj);
                _db.SaveChanges();
                return RedirectToAction("Index");
            }

            // If the model is invalid, repopulate the dropdown so it doesn't crash the view
            ViewBag.CategoryList = new SelectList(_db.Categories.ToList(), "Id", "Name");
            return View(obj);
        }

        // GET: Delete
        public IActionResult Delete(int? id)
        {
            if (id == null || id == 0) return NotFound();

            var foodItemFromDb = _db.FoodItems.Include(u => u.Category).FirstOrDefault(u => u.Id == id);

            if (foodItemFromDb == null) return NotFound();

            return View(foodItemFromDb);
        }

        // POST: Delete
        [HttpPost, ActionName("Delete")]
        public IActionResult DeletePOST(int? id)
        {
            var obj = _db.FoodItems.Find(id);
            if (obj == null) return NotFound();

            // Delete the old image file if it exists
            if (!string.IsNullOrEmpty(obj.ImageUrl))
            {
                // CRITICAL DOCKER FIX: Trim both Windows and Linux slashes to find the file
                var oldImagePath = Path.Combine(_webHostEnvironment.WebRootPath, obj.ImageUrl.TrimStart('/', '\\'));

                if (System.IO.File.Exists(oldImagePath))
                {
                    System.IO.File.Delete(oldImagePath);
                }
            }

            _db.FoodItems.Remove(obj);
            _db.SaveChanges();
            return RedirectToAction("Index");
        }
    }
}