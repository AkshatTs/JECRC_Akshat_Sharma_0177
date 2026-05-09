namespace FoodOrderingSystem.Models.ViewModels
{
    public class ShoppingCartVM
    {
        public IEnumerable<ShoppingCart> ListCart { get; set; }
        public OrderHeader OrderHeader { get; set; }
        public double OrderTotal { get; set; }
    }
}