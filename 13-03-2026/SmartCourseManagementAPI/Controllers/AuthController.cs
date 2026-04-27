using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartCourseManagementAPI.Data;
using SmartCourseManagementAPI.DTOs;
using SmartCourseManagementAPI.Models;
using SmartCourseManagementAPI.Services;
using System.Security.Cryptography;
using System.Text;

namespace SmartCourseManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtService _jwtService;

        public AuthController(ApplicationDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        // Register Student
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO dto)
        {
            if (await _context.Students.AnyAsync(x => x.Email == dto.Email))
                return BadRequest("Email already exists");

            var student = new Student
            {
                Name = dto.Name,
                Email = dto.Email,
                Phone = dto.Phone,
                PasswordHash = HashPassword(dto.Password),
                Role = "Student"
            };

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return Ok("Student registered successfully");
        }

        // Login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            var student = await _context.Students
                .FirstOrDefaultAsync(x => x.Email == dto.Email);

            if (student == null)
                return Unauthorized("Invalid email");

            if (student.PasswordHash != HashPassword(dto.Password))
                return Unauthorized("Invalid password");

            var token = _jwtService.GenerateToken(student);

            return Ok(new
            {
                token,
                role = student.Role
            });
        }

        // Password Hash
        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();

            var bytes = Encoding.UTF8.GetBytes(password);

            var hash = sha256.ComputeHash(bytes);

            return Convert.ToBase64String(hash);
        }
    }
}