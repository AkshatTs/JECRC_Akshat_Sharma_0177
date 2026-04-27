using System;
using System.Collections.Generic;
using System.Linq;
namespace ProductDemo{
    public class Product{
        public int Id { get; set;}
        public string Name { get; set;}
        public string Description { get; set;}
        public double Price { get; set;}
        public bool IsStock { get; set;}
    }
    public class ProductCatalog{
        private List<Product> products;
        public ProductCatalog(){
            // products = new List<Product>{
            //     new Product{Id = 008, Name = "Laptop", Description = "Electronics", Price = 75000, IsStock = true},
            //     new Product{Id = 009, Name = "SmartPhone", Description = "Electronics", Price = 55000, IsStock = true},
            //     new Product{Id = 010, Name = "Desk", Description = "Furniture", Price = 15000, IsStock = true},
            //     new Product{Id = 011, Name = "Notebook", Description = "Stationary", Price = 750, IsStock = true}                  
            // };
            products = new List<Product>();

        }
        public void AddProduct(){
            Product product = new Product();
            Console.WriteLine("Enter Product ID : ");
            product.Id = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter Product Name : ");
            product.Name = Console.ReadLine();

            Console.WriteLine("Enter Product Description : ");
            product.Description = Console.ReadLine();

            Console.WriteLine("Enter Product Price : ");
            product.Price = Convert.ToDouble(Console.ReadLine());

            Console.WriteLine("Enter Product IsStock : ");
            product.IsStock = Convert.ToBoolean(Console.ReadLine());

            products.Add(product);
        }
        public bool DeleteProduct(int id){
            var productid = products.FirstOrDefault(p => p.Id == id);
            if(productid == null){
                return false;
            }
            products.Remove(productid);
            return true;
        }
        public void DisplayProducts(){
            foreach(var product in products){
                Console.WriteLine(product.Name);
                Console.WriteLine(product.Description);
                Console.WriteLine(product.Price);
                Console.WriteLine("-------------------------");
            }
        }
    }
    class TestProduct{
        static void Main(string[] args){
            ProductCatalog catalog = new ProductCatalog();
            int choice;
            int id;
            do{
                Console.WriteLine("0. Exit");
                Console.WriteLine("1. Add Product");
                Console.WriteLine("2. Display Product");
                Console.WriteLine("3. Delete Product");
                Console.WriteLine("Enter your Choice!");
                choice = Convert.ToInt32(Console.ReadLine());
                switch(choice){
                    case 0: Console.WriteLine("Exiting ...............");
                            break;
                    case 1: catalog.AddProduct();
                            break;
                    case 2: catalog.DisplayProducts();
                            break;
                    case 3: id = Convert.ToInt32(Console.ReadLine());
                            catalog.DeleteProduct(id);
                            break;
                    default: Console.WriteLine("Invalid Choice!");
                            break;
                }
            }while(choice != 0);
            // catalog.AddProduct();
            // catalog.DisplayProducts();
        }
    }
}