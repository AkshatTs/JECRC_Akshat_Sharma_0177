using BillGeneratorAPI.Data;
using BillGeneratorAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BillGeneratorAPI.Services
{
    public interface ICatalogService
    {
        Task<List<CatalogItem>> GetAllCatalogItemsAsync();
        Task<List<CatalogItem>> GetCatalogItemsByTypeAsync(string catalogType);
        Task<CatalogItem?> GetCatalogItemByIdAsync(int id);
        Task<CatalogItem> CreateCatalogItemAsync(CatalogItem item);
        Task<CatalogItem> UpdateCatalogItemAsync(int id, CatalogItem item);
        Task<bool> DeleteCatalogItemAsync(int id);
    }

    public class CatalogService : ICatalogService
    {
        private readonly BillGeneratorDbContext _context;
        private readonly ILogger<CatalogService> _logger;

        public CatalogService(BillGeneratorDbContext context, ILogger<CatalogService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<CatalogItem>> GetAllCatalogItemsAsync()
        {
            try
            {
                return await _context.CatalogItems
                    .OrderBy(c => c.CatalogType)
                    .ThenBy(c => c.Category)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching all catalog items");
                throw;
            }
        }

        public async Task<List<CatalogItem>> GetCatalogItemsByTypeAsync(string catalogType)
        {
            try
            {
                return await _context.CatalogItems
                    .Where(c => c.CatalogType == catalogType)
                    .OrderBy(c => c.Category)
                    .ThenBy(c => c.Name)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching catalog items by type {catalogType}", catalogType);
                throw;
            }
        }

        public async Task<CatalogItem?> GetCatalogItemByIdAsync(int id)
        {
            try
            {
                return await _context.CatalogItems.FirstOrDefaultAsync(c => c.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching catalog item with id {id}", id);
                throw;
            }
        }

        public async Task<CatalogItem> CreateCatalogItemAsync(CatalogItem item)
        {
            try
            {
                item.CreatedDate = DateTime.Now;
                _context.CatalogItems.Add(item);
                await _context.SaveChangesAsync();
                
                _logger.LogInformation("Catalog item '{name}' created", item.Name);
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating catalog item");
                throw;
            }
        }

        public async Task<CatalogItem> UpdateCatalogItemAsync(int id, CatalogItem item)
        {
            try
            {
                var existingItem = await _context.CatalogItems.FindAsync(id);
                if (existingItem == null)
                    throw new KeyNotFoundException($"Catalog item with id {id} not found");

                existingItem.Name = item.Name;
                existingItem.Price = item.Price;
                existingItem.Category = item.Category;
                existingItem.CatalogType = item.CatalogType;

                await _context.SaveChangesAsync();
                _logger.LogInformation("Catalog item {id} updated", id);
                return existingItem;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating catalog item with id {id}", id);
                throw;
            }
        }

        public async Task<bool> DeleteCatalogItemAsync(int id)
        {
            try
            {
                var item = await _context.CatalogItems.FindAsync(id);
                if (item == null)
                    return false;

                _context.CatalogItems.Remove(item);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Catalog item {id} deleted", id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting catalog item with id {id}", id);
                throw;
            }
        }
    }
}
