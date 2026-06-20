using System.ComponentModel.DataAnnotations;

namespace EmployeeManagementSystem.DTOs
{
    public class AssignRoleDto
    {
        [Required]
        public int RoleId { get; set; }
    }
}