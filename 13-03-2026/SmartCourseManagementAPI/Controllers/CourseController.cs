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
    public class CourseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CourseController(ApplicationDbContext context)
        {
            _context = context;
        }

        // View all courses (Student/Admin)
        [HttpGet]
        public async Task<IActionResult> GetCourses()
        {
            var courses = await _context.Courses
                .Include(c => c.Department)
                .ToListAsync();

            return Ok(courses);
        }

        // Search courses
        [HttpGet("search")]
        public async Task<IActionResult> SearchCourses(string keyword)
        {
            var courses = await _context.Courses
                .Include(c => c.Department)
                .Where(c =>
                    c.CourseName.Contains(keyword) ||
                    c.Department!.DepartmentName.Contains(keyword)
                )
                .ToListAsync();

            return Ok(courses);
        }

        // Add course (Admin only)
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddCourse(CreateCourseDTO dto)
        {
            var course = new Course
            {
                CourseName = dto.CourseName,
                DepartmentId = dto.DepartmentId,
                Credits = dto.Credits,
                TotalSeats = dto.TotalSeats,
                SeatsAvailable = dto.TotalSeats
            };

            _context.Courses.Add(course);

            await _context.SaveChangesAsync();

            return Ok("Course created successfully");
        }

        // Update course (Admin)
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCourse(int id, UpdateCourseDTO dto)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
                return NotFound("Course not found");

            course.CourseName = dto.CourseName;
            course.DepartmentId = dto.DepartmentId;
            course.Credits = dto.Credits;
            course.TotalSeats = dto.TotalSeats;

            await _context.SaveChangesAsync();

            return Ok("Course updated successfully");
        }

        // Delete course (Admin)
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
                return NotFound("Course not found");

            _context.Courses.Remove(course);

            await _context.SaveChangesAsync();

            return Ok("Course deleted successfully");
        }
    }
}