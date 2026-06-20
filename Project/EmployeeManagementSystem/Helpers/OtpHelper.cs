namespace EmployeeManagementSystem.Helpers
{
    public class OtpHelper
    {
        public static string GenerateOtp()
        {
            var random = new Random();
            return random.Next(100000, 999999).ToString();
        }

        public static string HashOtp(string otp)
        {
            return BCrypt.Net.BCrypt.HashPassword(otp);
        }

        public static bool VerifyOtp(string otp, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(otp, hash);
        }
    }
}