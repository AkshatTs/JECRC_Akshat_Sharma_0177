namespace Cars_Application.Models.Entities
{
    public class Car
    {
        public Guid Id { get; set; }
        public string Brand { get; set; }
        public string ModelName { get; set; }
        public int ManufactureYear { get; set; }
        public int EngineCC { get; set; }
        public string Color { get; set; }
        public string FuelType { get; set; }
        public decimal Price { get; set; }
    }
}
