using System.ComponentModel.DataAnnotations;
namespace Cars_Application.Models.Attributes
{
    public class AllowedFuelTypeAttribute : ValidationAttribute
    {
        private readonly string[] allowedTypes = { "Petrol", "Diesel", "EV", "Hybrid" };

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is string fuelType)
            {
                if (!allowedTypes.Contains(fuelType, StringComparer.OrdinalIgnoreCase))
                {
                    return new ValidationResult($"Fuel type must be one of: Petrol, Diesel, EV, Hybrid.");
                }
                return ValidationResult.Success;
            }
            return new ValidationResult("Fuel type is required.");
        }
    }
}
