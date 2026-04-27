using Cars_Application.Models.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Cars_Application.Models.DTOs
{
    public class CreateCarDto
    {
        [Required(ErrorMessage = "Brand is required.")]
        [StringLength(50, MinimumLength =2)]
        public string Brand { get; set; }

        [Required]
        [StringLength(50)]
        public string ModelName { get; set; }

        [Required]
        [ValidManufactureYear]
        public int ManufactureYear { get; set; }

        [Required]
        [Range(500, 8000, ErrorMessage = "Engine CC must be between 500 and 8000.")]
        public int EngineCC { get; set; }

        [Required]
        public string Color { get; set; }

        [Required]
        [AllowedFuelType]
        public string FuelType { get; set; }

        [Required]
        [Range(1000, 10000000, ErrorMessage = "Price must be a valid amount.")]
        public decimal Price { get; set; }
    }
}
