namespace SmartCourseManagementAPI.DTOs
{
    public class CreateCourseDTO
    {
        public required string CourseName { get; set; }

        public int DepartmentId { get; set; }

        public int Credits { get; set; }

        public int TotalSeats { get; set; }
    }
}