namespace EmployeeManagementSystem.Models
{
    public class OtpRequest
    {
        public int OtpRequestId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public string OtpHash { get; set; } = string.Empty;
        public DateTime ExpiresAt { get; set; }
        public bool IsUsed { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}