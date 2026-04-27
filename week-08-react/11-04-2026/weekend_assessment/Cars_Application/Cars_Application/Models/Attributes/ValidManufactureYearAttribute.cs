using System.ComponentModel.DataAnnotations;
namespace Cars_Application.Models.Attributes
{
    public class ValidManufactureYearAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is int year)
            {
                int currentYear = DateTime.Now.Year;
                if (year < 1886 || year > currentYear) // 1886 is widely considered the birth year of the modern car
                {
                    return new ValidationResult($"Manufacture year must be between 1886 and {currentYear}.");
                }
                return ValidationResult.Success;
            }
            return new ValidationResult("Invalid year format.");
        }
    }
}
