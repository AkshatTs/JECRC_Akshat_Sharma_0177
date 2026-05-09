using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodOrderingSystem.Models
{
    public class ShoppingCart
    {
        public int Id { get; set; }

        public int FoodItemId { get; set; }
        [ForeignKey("FoodItemId")]
        [ValidateNever]
        public FoodItem FoodItem { get; set; }

        [Range(1, 100, ErrorMessage = "Please enter a value between 1 and 100")]
        public int Count { get; set; }

        // This links the cart item to the specific logged-in user
        public string ApplicationUserId { get; set; }
        [ForeignKey("ApplicationUserId")]
        [ValidateNever]
        public Microsoft.AspNetCore.Identity.IdentityUser ApplicationUser { get; set; }
    }
}