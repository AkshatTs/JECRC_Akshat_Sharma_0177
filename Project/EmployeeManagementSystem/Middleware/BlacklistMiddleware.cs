using EmployeeManagementSystem.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Middleware
{
    public class BlacklistMiddleware
    {
        private readonly RequestDelegate _next;

        public BlacklistMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, AppDbContext db)
        {
            var authHeader = context.Request.Headers["Authorization"].ToString();

            if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
            {
                var token = authHeader.Substring(7);
                var isBlacklisted = await db.TokenBlacklist
                    .AnyAsync(t => t.Token == token);

                if (isBlacklisted)
                {
                    context.Response.StatusCode = 401;
                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsync(
                        "{\"success\":false,\"message\":\"Token has been invalidated. Please login again.\"}");
                    return;
                }
            }

            await _next(context);
        }
    }
}