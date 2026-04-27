using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartCourseManagementAPI.Data;
using SmartCourseManagementAPI.DTOs;
using SmartCourseManagementAPI.Models;
using System.Security.Claims;

namespace SmartCourseManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnrollmentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EnrollmentController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ENROLL IN COURSE
        [Authorize(Roles = "Student")]
        [HttpPost("enroll")]
        public async Task<IActionResult> EnrollCourse(EnrollCourseDTO dto)
        {
            var studentId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var course = await _context.Courses.FindAsync(dto.CourseId);

            if (course == null)
                return NotFound("Course not found");

            if (course.SeatsAvailable <= 0)
                return BadRequest("No seats available");

            var alreadyEnrolled = await _context.Enrollments
                .AnyAsync(e => e.StudentId == studentId && e.CourseId == dto.CourseId && e.Status == "Enrolled");

            if (alreadyEnrolled)
                return BadRequest("You are already enrolled in this course");

            var enrollment = new Enrollment
            {
                StudentId = studentId,
                CourseId = dto.CourseId,
                Status = "Enrolled"
            };

            course.SeatsAvailable--;

            _context.Enrollments.Add(enrollment);

            await _context.SaveChangesAsync();

            return Ok("Enrollment successful");
        }

        // DROP COURSE
        [Authorize(Roles = "Student")]
        [HttpPost("drop/{courseId}")]
        public async Task<IActionResult> DropCourse(int courseId)
        {
            var studentId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var enrollment = await _context.Enrollments
                .FirstOrDefaultAsync(e =>
                    e.StudentId == studentId &&
                    e.CourseId == courseId &&
                    e.Status == "Enrolled");

            if (enrollment == null)
                return NotFound("Enrollment not found");

            var course = await _context.Courses.FindAsync(courseId);

            enrollment.Status = "Dropped";
            enrollment.DropDate = DateTime.Now;

            course!.SeatsAvailable++;

            await _context.SaveChangesAsync();

            return Ok("Course dropped successfully");
        }

        // VIEW MY COURSES
        [Authorize(Roles = "Student")]
        [HttpGet("my-courses")]
        public async Task<IActionResult> MyCourses()
        {
            var studentId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var courses = await _context.Enrollments
                .Where(e => e.StudentId == studentId && e.Status == "Enrolled")
                .Include(e => e.Course)
                .ThenInclude(c => c!.Department)
                .ToListAsync();

            return Ok(courses);
        }

        // ADMIN VIEW ALL ENROLLMENTS
        [Authorize(Roles = "Admin")]
        [HttpGet("all")]
        public async Task<IActionResult> AllEnrollments()
        {
            var enrollments = await _context.Enrollments
                .Include(e => e.Student)
                .Include(e => e.Course)
                .ThenInclude(c => c!.Department)
                .ToListAsync();

            return Ok(enrollments);
        }
    }
}