using Microsoft.AspNetCore.Mvc;
using ProductManagement.Data;
using ProductManagement.DTOs;
using ProductManagement.Models;
using ProductManagement.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ProductManagement.Controllers
{
    public class ProductsController : Controller
    {
        private readonly IProductRepository _repo;
        private readonly AppDbContext _context;

        public ProductsController(IProductRepository repo, AppDbContext context)
        {
            _repo = repo;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _repo.GetAllAsync();
            return View(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int id)
        {
            var data = await _repo.GetByIdAsync(id);
            if (data == null) return NotFound();
            return View(data);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(ProductRequestDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values.SelectMany(v => v.Errors);
                    foreach (var error in errors)
                    {
                        System.Diagnostics.Debug.WriteLine($"Validation Error: {error.ErrorMessage}");
                    }
                    return View(dto);
                }

                // Verify category exists
                var categoryExists = await _context.CategoryDetails.AnyAsync(c => c.Id == dto.CategoryId);
                if (!categoryExists)
                {
                    ModelState.AddModelError("CategoryId", "Selected category does not exist");
                    return View(dto);
                }

                await _repo.CreateAsync(dto);
                return RedirectToAction(nameof(GetAll));
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Exception in Create: {ex.Message}\n{ex.StackTrace}");
                ModelState.AddModelError("", $"Error creating product: {ex.InnerException?.Message ?? ex.Message}");
                return View(dto);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();

            var dto = new ProductRequestDto
            {
                Name = product.Name,
                Price = product.Price,
                CategoryId = product.CategoryId,
                Description = product.productDetail?.Description
            };

            ViewBag.Id = id;
            return View(dto);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(int id, ProductRequestDto dto)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.Id = id;
                return View("Edit", dto);
            }

            var result = await _repo.UpdateAsync(id, dto);
            if (!result)
                return NotFound();

            return RedirectToAction(nameof(GetAll));
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var data = await _repo.GetByIdAsync(id);
            if (data == null) return NotFound();
            return View(data);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var result = await _repo.DeleteAsync(id);
            if (!result)
                return NotFound();

            return RedirectToAction(nameof(GetAll));
        }

        // API Endpoints (for REST clients)
        [HttpGet("api/products")]
        public async Task<IActionResult> GetAllApi()
            => Ok(await _repo.GetAllAsync());

        [HttpGet("api/products/{id}")]
        public async Task<IActionResult> GetByIdApi(int id)
        {
            var data = await _repo.GetByIdAsync(id);
            return data == null ? NotFound() : Ok(data);
        }

        [HttpPost("api/products")]
        public async Task<IActionResult> CreateApi(ProductRequestDto dto)
            => Ok(await _repo.CreateAsync(dto));

        [HttpPut("api/products/{id}")]
        public async Task<IActionResult> UpdateApi(int id, ProductRequestDto dto)
            => await _repo.UpdateAsync(id, dto) ? NoContent() : NotFound();

        [HttpDelete("api/products/{id}")]
        public async Task<IActionResult> DeleteApi(int id)
            => await _repo.DeleteAsync(id) ? NoContent() : NotFound();
    }
}
