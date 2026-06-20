using EmployeeManagementSystem.Data;
using EmployeeManagementSystem.DTOs;
using EmployeeManagementSystem.Helpers;
using EmployeeManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Services
{
    public class AuthService
    {
        private readonly AppDbContext _db;
        private readonly JwtHelper _jwtHelper;
        private const int MaxFailedAttempts = 5;

        public AuthService(AppDbContext db, JwtHelper jwtHelper)
        {
            _db = db;
            _jwtHelper = jwtHelper;
        }

        // ─── REGISTER ───────────────────────────────────────────
        public async Task<ApiResponseDto> RegisterAsync(RegisterDto dto)
        {
            var emailExists = await _db.Users.AnyAsync(u => u.Email == dto.Email);
            if (emailExists)
                return ApiResponseDto.Fail("Email is already registered.");

            var roleExists = await _db.Roles.AnyAsync(r => r.RoleId == dto.RoleId);
            if (!roleExists)
                return ApiResponseDto.Fail("Invalid role selected.");

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                RoleId = dto.RoleId
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return ApiResponseDto.Ok("User registered successfully.");
        }

        // ─── LOGIN ──────────────────────────────────────────────
        public async Task<ApiResponseDto> LoginAsync(LoginDto dto)
        {
            var user = await _db.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null)
                return ApiResponseDto.Fail("Invalid email or password.");

            if (user.IsLocked)
                return ApiResponseDto.Fail("Account is locked. Please contact admin.");

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                user.FailedLoginCount++;
                if (user.FailedLoginCount >= MaxFailedAttempts)
                {
                    user.IsLocked = true;
                    await _db.SaveChangesAsync();
                    return ApiResponseDto.Fail("Account locked due to too many failed attempts.");
                }

                await _db.SaveChangesAsync();
                return ApiResponseDto.Fail($"Invalid email or password. {MaxFailedAttempts - user.FailedLoginCount} attempts remaining.");
            }

            // Reset failed count on success
            user.FailedLoginCount = 0;
            await _db.SaveChangesAsync();

            var token = _jwtHelper.GenerateToken(user);

            return ApiResponseDto.Ok("Login successful.", new
            {
                token,
                user.UserId,
                user.Name,
                user.Email,
                Role = user.Role.RoleName
            });
        }

        // ─── REQUEST OTP ─────────────────────────────────────────
        public async Task<ApiResponseDto> RequestOtpAsync(OtpRequestDto dto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null)
                return ApiResponseDto.Fail("No account found with this email.");

            if (user.IsLocked)
                return ApiResponseDto.Fail("Account is locked. Please contact admin.");

            // Invalidate any previous unused OTPs for this user
            var oldOtps = _db.OtpRequests
                .Where(o => o.UserId == user.UserId && !o.IsUsed);
            _db.OtpRequests.RemoveRange(oldOtps);

            var otp = OtpHelper.GenerateOtp();
            var otpRecord = new OtpRequest
            {
                UserId = user.UserId,
                OtpHash = OtpHelper.HashOtp(otp),
                ExpiresAt = DateTime.UtcNow.AddMinutes(5)
            };

            _db.OtpRequests.Add(otpRecord);
            await _db.SaveChangesAsync();

            // Console log for now (will replace with email before Sprint 2)
            Console.WriteLine("========================================");
            Console.WriteLine($"  OTP for {user.Email}: {otp}");
            Console.WriteLine($"  Expires at: {otpRecord.ExpiresAt} UTC");
            Console.WriteLine("========================================");

            return ApiResponseDto.Ok("OTP generated. Check console for the OTP.");
        }

        // ─── VERIFY OTP ──────────────────────────────────────────
        public async Task<ApiResponseDto> VerifyOtpAsync(VerifyOtpDto dto)
        {
            var user = await _db.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null)
                return ApiResponseDto.Fail("No account found with this email.");

            var otpRecord = await _db.OtpRequests
                .Where(o => o.UserId == user.UserId && !o.IsUsed)
                .OrderByDescending(o => o.CreatedAt)
                .FirstOrDefaultAsync();

            if (otpRecord == null)
                return ApiResponseDto.Fail("No OTP found. Please request a new one.");

            if (otpRecord.ExpiresAt < DateTime.UtcNow)
                return ApiResponseDto.Fail("OTP has expired. Please request a new one.");

            if (!OtpHelper.VerifyOtp(dto.Otp, otpRecord.OtpHash))
                return ApiResponseDto.Fail("Invalid OTP.");

            // Mark OTP as used
            otpRecord.IsUsed = true;
            await _db.SaveChangesAsync();

            var token = _jwtHelper.GenerateToken(user);

            return ApiResponseDto.Ok("OTP verified successfully.", new
            {
                token,
                user.UserId,
                user.Name,
                user.Email,
                Role = user.Role.RoleName
            });
        }

        // ─── LOGOUT ──────────────────────────────────────────────
        public async Task<ApiResponseDto> LogoutAsync(string token)
        {
            var already = await _db.TokenBlacklist.AnyAsync(t => t.Token == token);
            if (already)
                return ApiResponseDto.Fail("Token already invalidated.");

            _db.TokenBlacklist.Add(new TokenBlacklist { Token = token });
            await _db.SaveChangesAsync();

            return ApiResponseDto.Ok("Logged out successfully.");
        }

        // ─── ASSIGN ROLE ─────────────────────────────────────────
        public async Task<ApiResponseDto> AssignRoleAsync(int userId, AssignRoleDto dto)
        {
            var user = await _db.Users.FindAsync(userId);
            if (user == null)
                return ApiResponseDto.Fail("User not found.");

            var roleExists = await _db.Roles.AnyAsync(r => r.RoleId == dto.RoleId);
            if (!roleExists)
                return ApiResponseDto.Fail("Invalid role selected.");

            user.RoleId = dto.RoleId;
            await _db.SaveChangesAsync();

            return ApiResponseDto.Ok("Role assigned successfully.");
        }

        // ─── GET ALL ROLES ───────────────────────────────────────
        public async Task<ApiResponseDto> GetRolesAsync()
        {
            var roles = await _db.Roles
                .Select(r => new { r.RoleId, r.RoleName })
                .ToListAsync();

            return ApiResponseDto.Ok("Roles fetched successfully.", roles);
        }

        // ─── UNLOCK ACCOUNT (Admin) ──────────────────────────────
        public async Task<ApiResponseDto> UnlockAccountAsync(int userId)
        {
            var user = await _db.Users.FindAsync(userId);
            if (user == null)
                return ApiResponseDto.Fail("User not found.");

            user.IsLocked = false;
            user.FailedLoginCount = 0;
            await _db.SaveChangesAsync();

            return ApiResponseDto.Ok("Account unlocked successfully.");
        }
    }
}