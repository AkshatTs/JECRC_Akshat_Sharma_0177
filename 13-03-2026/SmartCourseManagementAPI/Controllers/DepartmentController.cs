using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartCourseManagementAPI.Data;
using SmartCourseManagementAPI.DTOs;
using SmartCourseManagementAPI.Models;

namespace SmartCourseManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DepartmentController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET ALL DEPARTMENTS
        [HttpGet]
        public async Task<IActionResult> GetDepartments()
        {
            var departments = await _context.Departments.ToListAsync();

            return Ok(departments);
        }

        // ADD DEPARTMENT (ADMIN ONLY)
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddDepartment(CreateDepartmentDTO dto)
        {
            var department = new Department
            {
                DepartmentName = dto.DepartmentName
            };

            _context.Departments.Add(department);

            await _context.SaveChangesAsync();

            return Ok("Department created successfully");
        }

        // DELETE DEPARTMENT
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var department = await _context.Departments.FindAsync(id);

            if (department == null)
                return NotFound("Department not found");

            _context.Departments.Remove(department);

            await _context.SaveChangesAsync();

            return Ok("Department deleted successfully");
        }
    }
}