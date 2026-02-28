
using System;
namespace ConsoleApp{
    class Product{
        public string Name{get; set;}
        public int ID{get; set;}
        public int Quantity{get; set;}
        public bool ISO{get; set;}
        public string Brand{get; set;}
        public DateTime ExpiryDate{get; set;}

        public Product(string name, int id, int quantity, bool iso, string brand, DateTime expiryDate){
            Name = name;
            ID = id;
            Quantity = quantity;
            ISO = iso;
            Brand = brand;
            ExpiryDate = expiryDate;
        }
        // public void GetProductData(){
        //     Console.WriteLine("Enter Product Name: ");
        //     Name = Console.ReadLine();
        //     Console.WriteLine("Enter Product ID: ");
        //     ID = Convert.ToInt32(Console.ReadLine());
        //     Console.WriteLine("Enter Product Quantity: ");
        //     Quantity = Convert.ToInt32(Console.ReadLine());
        //     Console.WriteLine("Enter Product ISO: ");
        //     ISO = bool.Parse(Console.ReadLine());
        //     Console.WriteLine("Enter Product Brand: ");
        //     Brand = Console.ReadLine();
        //     Console.WriteLine("Enter Product Date of Expiry: ");
        //     ExpiryDate = DateTime.Parse(Console.ReadLine());
        // }
        public void DisplayProductData(){
            Console.WriteLine($"Product Name: {Name}");
            Console.WriteLine($"Product ID: {ID}");
            Console.WriteLine($"Product Quantity: {Quantity}");
            Console.WriteLine($"Product ISO: {ISO}");
            Console.WriteLine($"Product Brand: {Brand}");
            Console.WriteLine($"Product Expiry Date: {ExpiryDate}");
        }
    }
    class Program{
        static void Main(string[] args){
            Product pro1 = new Product("Milk", 1002, 25, true, "Amul", new DateTime(2026, 3, 15));
            //pro1.GetProductData();
            pro1.DisplayProductData();
        }
    }
}