using System;
using System.Collections.Generic;
using System.Linq;

class WarehouseTracker
{
    static void Main(string[] args)
    {
        // Dictionary to store productId as the key and quantity as the value
        Dictionary<string, int> inventory = new Dictionary<string, int>();

        // Read the number of operations
        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            string line = Console.ReadLine();
            if (string.IsNullOrWhiteSpace(line)) continue;

            string[] parts = line.Split(' ');
            string command = parts[0].ToUpper();

            switch (command)
            {
                case "ADD":
                    if (parts.Length >= 3)
                    {
                        string id = parts[1];
                        int qty = int.Parse(parts[2]);

                        if (inventory.ContainsKey(id))
                            inventory[id] += qty;
                        else
                            inventory[id] = qty;
                    }
                    break;

                case "REMOVE":
                    if (parts.Length >= 3)
                    {
                        string id = parts[1];
                        int qty = int.Parse(parts[2]);

                        // Validate: Only remove if the product exists and has enough stock
                        if (inventory.ContainsKey(id) && inventory[id] >= qty)
                        {
                            inventory[id] -= qty;
                        }
                    }
                    break;

                case "CHECK":
                    if (parts.Length >= 2)
                    {
                        string id = parts[1];
                        if (inventory.ContainsKey(id))
                        {
                            Console.WriteLine($"Product {id}: {inventory[id]} units");
                        }
                        else
                        {
                            Console.WriteLine($"Product {id}: 0 units");
                        }
                    }
                    break;

                case "BULK":
                    if (parts.Length >= 2)
                    {
                        // Example format: 1003:75,1004:40
                        string[] items = parts[1].Split(',');
                        foreach (var item in items)
                        {
                            string[] itemParts = item.Split(':');
                            if (itemParts.Length == 2)
                            {
                                string id = itemParts[0];
                                int qty = int.Parse(itemParts[1]);

                                if (inventory.ContainsKey(id))
                                    inventory[id] += qty;
                                else
                                    inventory[id] = qty;
                            }
                        }
                    }
                    break;

                case "DISPLAY":
                    Console.WriteLine("--- Current Inventory ---");

                    // Sort keys to maintain a clean display order matching the sample output
                    var sortedKeys = inventory.Keys.ToList();
                    sortedKeys.Sort();

                    foreach (var key in sortedKeys)
                    {
                        // Display all products with stock > 0
                        if (inventory[key] > 0)
                        {
                            Console.WriteLine($"{key}: {inventory[key]} units");
                        }
                    }
                    break;
            }
        }
    }
}