using BillGeneratorAPI.Data;
using BillGeneratorAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BillGeneratorAPI.Services
{
    public interface IBillService
    {
        Task<List<Bill>> GetAllBillsAsync();
        Task<Bill?> GetBillByIdAsync(int id);
        Task<Bill> CreateBillAsync(Bill bill);
        Task<Bill> UpdateBillAsync(int id, Bill bill);
        Task<bool> DeleteBillAsync(int id);
        Task<List<Bill>> GetBillsByDateRangeAsync(DateTime startDate, DateTime endDate);
        Task<DailySalesReport> GetDailySalesReportAsync(DateTime date);
        Task<List<Bill>> SearchBillsAsync(string invoiceNumber);
        Task<Bill> SaveDraftAsync(Bill bill);
        Task<List<Bill>> GetDraftsAsync();
        Task<bool> DeleteDraftAsync(int id);
    }

    public class BillService : IBillService
    {
        private readonly BillGeneratorDbContext _context;
        private readonly ILogger<BillService> _logger;

        public BillService(BillGeneratorDbContext context, ILogger<BillService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<Bill>> GetAllBillsAsync()
        {
            try
            {
                return await _context.Bills
                    .Where(b => !b.IsDraft)
                    .Include(b => b.Items)
                    .OrderByDescending(b => b.CreatedDate)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching all bills");
                throw;
            }
        }

        public async Task<Bill?> GetBillByIdAsync(int id)
        {
            try
            {
                return await _context.Bills
                    .Include(b => b.Items)
                    .FirstOrDefaultAsync(b => b.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching bill with id {id}", id);
                throw;
            }
        }

        public async Task<Bill> CreateBillAsync(Bill bill)
        {
            try
            {
                bill.CreatedDate = DateTime.Now;
                bill.InvoiceNumber = GenerateInvoiceNumber();
                
                _context.Bills.Add(bill);
                await _context.SaveChangesAsync();
                
                _logger.LogInformation("Bill created with invoice number {invoice}", bill.InvoiceNumber);
                return bill;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating bill");
                throw;
            }
        }

        public async Task<Bill> UpdateBillAsync(int id, Bill bill)
        {
            try
            {
                var existingBill = await _context.Bills.Include(b => b.Items).FirstOrDefaultAsync(b => b.Id == id);
                if (existingBill == null)
                    throw new KeyNotFoundException($"Bill with id {id} not found");

                existingBill.Subtotal = bill.Subtotal;
                existingBill.DiscountAmount = bill.DiscountAmount;
                existingBill.DiscountType = bill.DiscountType;
                existingBill.DiscountValue = bill.DiscountValue;
                existingBill.TaxRate = bill.TaxRate;
                existingBill.TaxAmount = bill.TaxAmount;
                existingBill.Total = bill.Total;

                // Remove old items and add new ones
                _context.BillItems.RemoveRange(existingBill.Items);
                existingBill.Items = bill.Items;

                await _context.SaveChangesAsync();
                _logger.LogInformation("Bill {id} updated", id);
                return existingBill;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating bill with id {id}", id);
                throw;
            }
        }

        public async Task<bool> DeleteBillAsync(int id)
        {
            try
            {
                var bill = await _context.Bills.FindAsync(id);
                if (bill == null)
                    return false;

                _context.Bills.Remove(bill);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Bill {id} deleted", id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting bill with id {id}", id);
                throw;
            }
        }

        public async Task<List<Bill>> GetBillsByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            try
            {
                return await _context.Bills
                    .Where(b => !b.IsDraft && b.CreatedDate >= startDate && b.CreatedDate <= endDate)
                    .Include(b => b.Items)
                    .OrderByDescending(b => b.CreatedDate)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching bills by date range");
                throw;
            }
        }

        public async Task<DailySalesReport> GetDailySalesReportAsync(DateTime date)
        {
            try
            {
                var startDate = date.Date;
                var endDate = date.Date.AddDays(1);

                var bills = await _context.Bills
                    .Where(b => !b.IsDraft && b.CreatedDate >= startDate && b.CreatedDate < endDate)
                    .Include(b => b.Items)
                    .ToListAsync();

                return new DailySalesReport
                {
                    Date = date.Date,
                    BillCount = bills.Count,
                    ItemCount = bills.SelectMany(b => b.Items).Count(),
                    TotalSales = bills.Sum(b => b.Total),
                    TotalDiscount = bills.Sum(b => b.DiscountAmount),
                    TotalTax = bills.Sum(b => b.TaxAmount)
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating daily sales report");
                throw;
            }
        }

        public async Task<List<Bill>> SearchBillsAsync(string invoiceNumber)
        {
            try
            {
                return await _context.Bills
                    .Where(b => !b.IsDraft && b.InvoiceNumber.Contains(invoiceNumber))
                    .Include(b => b.Items)
                    .OrderByDescending(b => b.CreatedDate)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error searching bills");
                throw;
            }
        }

        public async Task<Bill> SaveDraftAsync(Bill bill)
        {
            try
            {
                bill.IsDraft = true;
                bill.DraftSavedDate = DateTime.Now;
                
                _context.Bills.Add(bill);
                await _context.SaveChangesAsync();
                
                _logger.LogInformation("Draft saved");
                return bill;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving draft");
                throw;
            }
        }

        public async Task<List<Bill>> GetDraftsAsync()
        {
            try
            {
                return await _context.Bills
                    .Where(b => b.IsDraft)
                    .Include(b => b.Items)
                    .OrderByDescending(b => b.DraftSavedDate)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching drafts");
                throw;
            }
        }

        public async Task<bool> DeleteDraftAsync(int id)
        {
            try
            {
                var bill = await _context.Bills.FindAsync(id);
                if (bill == null || !bill.IsDraft)
                    return false;

                _context.Bills.Remove(bill);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Draft {id} deleted", id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting draft");
                throw;
            }
        }

        private string GenerateInvoiceNumber()
        {
            return $"INV-{DateTime.Now:yyyyMMddHHmmss}-{Guid.NewGuid().ToString()[..8].ToUpper()}";
        }
    }
}
