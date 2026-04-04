using Microsoft.AspNetCore.Mvc;
using BillGeneratorAPI.Models;
using BillGeneratorAPI.Services;

namespace BillGeneratorAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatalogsController : ControllerBase
    {
        private readonly ICatalogService _catalogService;
        private readonly ILogger<CatalogsController> _logger;

        public CatalogsController(ICatalogService catalogService, ILogger<CatalogsController> logger)
        {
            _catalogService = catalogService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CatalogItem>>> GetAllCatalogItems()
        {
            try
            {
                var items = await _catalogService.GetAllCatalogItemsAsync();
                return Ok(items);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all catalog items");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("type/{catalogType}")]
        public async Task<ActionResult<IEnumerable<CatalogItem>>> GetCatalogItemsByType(string catalogType)
        {
            try
            {
                var items = await _catalogService.GetCatalogItemsByTypeAsync(catalogType);
                return Ok(items);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting catalog items by type");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CatalogItem>> GetCatalogItemById(int id)
        {
            try
            {
                var item = await _catalogService.GetCatalogItemByIdAsync(id);
                if (item == null)
                    return NotFound($"Catalog item with id {id} not found");

                return Ok(item);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting catalog item by id");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<CatalogItem>> CreateCatalogItem([FromBody] CatalogItem item)
        {
            try
            {
                if (item == null)
                    return BadRequest("Catalog item cannot be null");

                var createdItem = await _catalogService.CreateCatalogItemAsync(item);
                return CreatedAtAction(nameof(GetCatalogItemById), new { id = createdItem.Id }, createdItem);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating catalog item");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CatalogItem>> UpdateCatalogItem(int id, [FromBody] CatalogItem item)
        {
            try
            {
                if (item == null)
                    return BadRequest("Catalog item cannot be null");

                var updatedItem = await _catalogService.UpdateCatalogItemAsync(id, item);
                return Ok(updatedItem);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating catalog item");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCatalogItem(int id)
        {
            try
            {
                var result = await _catalogService.DeleteCatalogItemAsync(id);
                if (!result)
                    return NotFound($"Catalog item with id {id} not found");

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting catalog item");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
