namespace SmartCourseManagementAPI.Models
{
    public class Student
    {
        public int StudentId { get; set; }

        public required string Name { get; set; }

        public required string Email { get; set; }

        public required string Phone { get; set; }

        public required string PasswordHash { get; set; }

        public required string Role { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public ICollection<Enrollment>? Enrollments { get; set; }
    }
}