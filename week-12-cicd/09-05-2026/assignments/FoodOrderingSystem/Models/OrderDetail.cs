using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodOrderingSystem.Models
{
    public class OrderDetail
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int OrderId { get; set; }
        [ForeignKey("OrderId")]
        [ValidateNever]
        public OrderHeader OrderHeader { get; set; }

        [Required]
        public int FoodItemId { get; set; }
        [ForeignKey("FoodItemId")]
        [ValidateNever]
        public FoodItem FoodItem { get; set; }

        public int Count { get; set; }
        public double Price { get; set; }
    }
}