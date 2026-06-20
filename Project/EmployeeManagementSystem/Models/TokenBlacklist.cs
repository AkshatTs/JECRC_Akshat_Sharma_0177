namespace EmployeeManagementSystem.Models
{
    public class TokenBlacklist
    {
        public int Id { get; set; }
        public string Token { get; set; } = string.Empty;
        public DateTime BlacklistedAt { get; set; } = DateTime.UtcNow;
    }
}