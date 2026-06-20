using EmployeeManagementSystem.DTOs;
using EmployeeManagementSystem.Helpers;
using EmployeeManagementSystem.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystem.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly JwtHelper _jwtHelper;

        public AuthController(AuthService authService, JwtHelper jwtHelper)
        {
            _authService = authService;
            _jwtHelper = jwtHelper;
        }

        // POST /api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.RegisterAsync(dto);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        // POST /api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.LoginAsync(dto);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        // POST /api/auth/request-otp
        [HttpPost("request-otp")]
        public async Task<IActionResult> RequestOtp([FromBody] OtpRequestDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.RequestOtpAsync(dto);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        // POST /api/auth/verify-otp
        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.VerifyOtpAsync(dto);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        // POST /api/auth/logout
        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            var token = _jwtHelper.GetTokenFromHeader(Request);
            if (token == null)
                return Unauthorized(ApiResponseDto.Fail("No token provided."));

            var result = await _authService.LogoutAsync(token);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        // GET /api/roles
        [HttpGet("/api/roles")]
        [Authorize]
        public async Task<IActionResult> GetRoles()
        {
            var result = await _authService.GetRolesAsync();
            return Ok(result);
        }

        // PUT /api/users/{id}/role
        [HttpPut("/api/users/{id}/role")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AssignRole(int id, [FromBody] AssignRoleDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.AssignRoleAsync(id, dto);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        // PUT /api/users/{id}/unlock
        [HttpPut("/api/users/{id}/unlock")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UnlockAccount(int id)
        {
            var result = await _authService.UnlockAccountAsync(id);
            return result.Success ? Ok(result) : BadRequest(result);
        }
    }
}