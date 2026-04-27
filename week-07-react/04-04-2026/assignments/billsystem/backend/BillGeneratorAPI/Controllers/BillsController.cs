using Microsoft.AspNetCore.Mvc;
using BillGeneratorAPI.Models;
using BillGeneratorAPI.Services;

namespace BillGeneratorAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BillsController : ControllerBase
    {
        private readonly IBillService _billService;
        private readonly ILogger<BillsController> _logger;

        public BillsController(IBillService billService, ILogger<BillsController> logger)
        {
            _billService = billService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bill>>> GetAllBills()
        {
            try
            {
                var bills = await _billService.GetAllBillsAsync();
                return Ok(bills);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all bills");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Bill>> GetBillById(int id)
        {
            try
            {
                var bill = await _billService.GetBillByIdAsync(id);
                if (bill == null)
                    return NotFound($"Bill with id {id} not found");

                return Ok(bill);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting bill by id");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Bill>> CreateBill([FromBody] Bill bill)
        {
            try
            {
                if (bill == null)
                    return BadRequest("Bill cannot be null");

                var createdBill = await _billService.CreateBillAsync(bill);
                return CreatedAtAction(nameof(GetBillById), new { id = createdBill.Id }, createdBill);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating bill");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Bill>> UpdateBill(int id, [FromBody] Bill bill)
        {
            try
            {
                if (bill == null)
                    return BadRequest("Bill cannot be null");

                var updatedBill = await _billService.UpdateBillAsync(id, bill);
                return Ok(updatedBill);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating bill");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBill(int id)
        {
            try
            {
                var result = await _billService.DeleteBillAsync(id);
                if (!result)
                    return NotFound($"Bill with id {id} not found");

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting bill");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("search/{invoiceNumber}")]
        public async Task<ActionResult<IEnumerable<Bill>>> SearchBills(string invoiceNumber)
        {
            try
            {
                var bills = await _billService.SearchBillsAsync(invoiceNumber);
                return Ok(bills);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error searching bills");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("date-range")]
        public async Task<ActionResult<IEnumerable<Bill>>> GetBillsByDateRange(
            [FromQuery] DateTime startDate, 
            [FromQuery] DateTime endDate)
        {
            try
            {
                var bills = await _billService.GetBillsByDateRangeAsync(startDate, endDate);
                return Ok(bills);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching bills by date range");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("daily-report/{date}")]
        public async Task<ActionResult<DailySalesReport>> GetDailySalesReport(DateTime date)
        {
            try
            {
                var report = await _billService.GetDailySalesReportAsync(date);
                return Ok(report);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating daily sales report");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("draft")]
        public async Task<ActionResult<Bill>> SaveDraft([FromBody] Bill bill)
        {
            try
            {
                if (bill == null)
                    return BadRequest("Bill cannot be null");

                var draft = await _billService.SaveDraftAsync(bill);
                return CreatedAtAction(nameof(GetBillById), new { id = draft.Id }, draft);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving draft");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("drafts/all")]
        public async Task<ActionResult<IEnumerable<Bill>>> GetDrafts()
        {
            try
            {
                var drafts = await _billService.GetDraftsAsync();
                return Ok(drafts);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching drafts");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("draft/{id}")]
        public async Task<ActionResult> DeleteDraft(int id)
        {
            try
            {
                var result = await _billService.DeleteDraftAsync(id);
                if (!result)
                    return NotFound($"Draft with id {id} not found");

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting draft");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
