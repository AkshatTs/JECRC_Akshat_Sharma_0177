namespace SmartCourseManagementAPI.Models
{
    public class Course
    {
        public int CourseId { get; set; }

        public required string CourseName { get; set; }

        public int DepartmentId { get; set; }

        public int Credits { get; set; }

        public int TotalSeats { get; set; }

        public int SeatsAvailable { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public Department? Department { get; set; }

        public ICollection<Enrollment>? Enrollments { get; set; }
    }
}