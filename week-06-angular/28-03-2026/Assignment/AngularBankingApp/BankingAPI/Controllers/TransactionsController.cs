using BankingAPI.Data;
using BankingAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransactionsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            var data = await _context.Transactions.ToListAsync();
            return Ok(data);
        }

        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<Transaction>>> FilterByDate([FromQuery] string date)
        {
            if (string.IsNullOrEmpty(date))
            {
                return BadRequest("Date is required");
            }

            var data = await _context.Transactions
                .Where(t => t.Date == date)
                .ToListAsync();

            return Ok(data);
        }

        [HttpGet("sort")]
        public async Task<ActionResult<IEnumerable<Transaction>>> SortByAmount()
        {
            var data = await _context.Transactions
                .OrderBy(t => t.Amount)
                .ToListAsync();

            return Ok(data);
        }

        [HttpPost]
        public async Task<ActionResult<Transaction>> AddTransaction(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Ok(transaction);
        }
    }
}