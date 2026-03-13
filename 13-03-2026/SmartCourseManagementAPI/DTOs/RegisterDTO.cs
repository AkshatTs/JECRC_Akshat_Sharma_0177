namespace SmartCourseManagementAPI.DTOs
{
    public class RegisterDTO
    {
        public required string Name { get; set; }

        public required string Email { get; set; }

        public required string Phone { get; set; }

        public required string Password { get; set; }
    }
}