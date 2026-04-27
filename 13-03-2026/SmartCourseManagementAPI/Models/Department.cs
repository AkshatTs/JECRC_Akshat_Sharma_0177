namespace SmartCourseManagementAPI.Models
{
    public class Department
    {
        public int DepartmentId { get; set; }

        public required string DepartmentName { get; set; }

        public ICollection<Course>? Courses { get; set; }
    }
}