namespace EmployeeManagementSystem.DTOs
{
    public class ApiResponseDto
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public object? Data { get; set; }

        public static ApiResponseDto Ok(string message, object? data = null) =>
            new ApiResponseDto { Success = true, Message = message, Data = data };

        public static ApiResponseDto Fail(string message) =>
            new ApiResponseDto { Success = false, Message = message };
    }
}