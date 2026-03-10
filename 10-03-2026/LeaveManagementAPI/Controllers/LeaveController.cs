using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using LeaveManagementAPI.Data;
using LeaveManagementAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace LeaveManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LeaveController(AppDbContext context)
        {
            _context = context;
        }

        // APPLY LEAVE (Employee only)
        [Authorize(Roles = "Employee")]
        [HttpPost("apply")]
        public async Task<IActionResult> ApplyLeave(LeaveRequest request)
        {
            var userId = int.Parse(User.FindFirst("UserId")!.Value);

            request.EmployeeId = userId;
            request.Status = "Pending";

            _context.LeaveRequests.Add(request);
            await _context.SaveChangesAsync();

            return Ok("Leave request submitted");
        }

        // VIEW MY LEAVES (Employee)
        [Authorize(Roles = "Employee")]
        [HttpGet("my-leaves")]
        public async Task<IActionResult> MyLeaves()
        {
            var userId = int.Parse(User.FindFirst("UserId")!.Value);

            var leaves = await _context.LeaveRequests
                .Where(x => x.EmployeeId == userId)
                .ToListAsync();

            return Ok(leaves);
        }

        // VIEW ALL LEAVES (Manager)
        [Authorize(Roles = "Manager")]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllLeaves()
        {
            var leaves = await _context.LeaveRequests.ToListAsync();

            return Ok(leaves);
        }

        // APPROVE LEAVE
        [Authorize(Roles = "Manager")]
        [HttpPut("approve/{id}")]
        public async Task<IActionResult> ApproveLeave(int id)
        {
            var leave = await _context.LeaveRequests.FindAsync(id);

            if (leave == null)
                return NotFound();

            leave.Status = "Approved";

            await _context.SaveChangesAsync();

            return Ok("Leave approved");
        }

        // REJECT LEAVE
        [Authorize(Roles = "Manager")]
        [HttpPut("reject/{id}")]
        public async Task<IActionResult> RejectLeave(int id)
        {
            var leave = await _context.LeaveRequests.FindAsync(id);

            if (leave == null)
                return NotFound();

            leave.Status = "Rejected";

            await _context.SaveChangesAsync();

            return Ok("Leave rejected");
        }
    }
}