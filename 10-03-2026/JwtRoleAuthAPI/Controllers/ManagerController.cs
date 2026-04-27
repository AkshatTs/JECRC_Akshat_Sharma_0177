using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace JwtRoleAuthAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ManagerController : ControllerBase
    {
        [HttpGet("dashboard")]
        [Authorize(Roles = "Manager")]
        public IActionResult GetManagerDashboard()
        {
            return Ok("Welcome to the Manager Dashboard! Only users with the Manager role can access this.");
        }

        [HttpGet("reports")]
        [Authorize(Roles = "Admin, Manager")]
        public IActionResult GetManagerReports()
        {
            return Ok("Welcome to the Admin and Manager reports! Only users with the Admin and Manager role can access this.");
        }
    }
}