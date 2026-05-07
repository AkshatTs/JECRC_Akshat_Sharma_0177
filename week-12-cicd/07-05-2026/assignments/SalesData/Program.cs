using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // STEP 1: Hardcoded Input Data
        // We store the exact sample data as an array of strings
        string[] salesRecords = {
            "P001 North 1500",
            "P001 South 2000",
            "P002 North 3000",
            "P001 East 2500",
            "P002 South 1800",
            "P003 North 1200",
            "P001 West 2200",
            "P002 West 2800",
            "P003 South 900",
            "P002 East 3200"
        };
        
        int threshold = 2000;

        // STEP 2: Setup our Data Structures
        
        // Nested Dictionary: Product -> (Region -> Sales)
        Dictionary<string, Dictionary<string, int>> salesData = new Dictionary<string, Dictionary<string, int>>();

        // Tables to track the highest seller per region
        Dictionary<string, string> bestProductByRegion = new Dictionary<string, string>();
        Dictionary<string, int> highestSaleByRegion = new Dictionary<string, int>();

        // STEP 3: Process the Hardcoded Records
        for (int i = 0; i < salesRecords.Length; i++)
        {
            // Split the string "P001 North 1500" into 3 separate pieces
            string[] parts = salesRecords[i].Split(' ');
            
            string product = parts[0];
            string region = parts[1];
            int amount = int.Parse(parts[2]);

            // If we haven't seen this product before, create its dictionary
            if (!salesData.ContainsKey(product))
            {
                salesData.Add(product, new Dictionary<string, int>());
            }

            // If we haven't seen this region for this product, add it
            if (!salesData[product].ContainsKey(region))
            {
                salesData[product].Add(region, 0);
            }

            // Add the sales amount
            salesData[product][region] = salesData[product][region] + amount;
        }

        // STEP 4: Calculate and Print the Report
        Console.WriteLine("--- Sales Report by Product and Region ---\n");

        List<string> underperforming = new List<string>();

        // Move the keys to a list and sort them so P001 prints before P002
        List<string> products = new List<string>(salesData.Keys);
        products.Sort();

        foreach (string product in products)
        {
            Console.WriteLine($"Product {product}:");
            
            int totalSales = 0;
            int regionCount = 0;

            // Look at all the regions for this specific product
            foreach (var regionData in salesData[product])
            {
                string region = regionData.Key;
                int amount = regionData.Value;

                Console.WriteLine($"  {region}: ${amount}");
                
                totalSales += amount;
                regionCount++;

                // --- CHECK FOR REGIONAL WINNER ---
                if (!highestSaleByRegion.ContainsKey(region) || amount > highestSaleByRegion[region])
                {
                    highestSaleByRegion[region] = amount;
                    bestProductByRegion[region] = product;
                }
            }

            // Calculate product average
            double average = (double)totalSales / regionCount;
            Console.WriteLine($"  Total: ${totalSales}, Average: ${average.ToString("F2")}\n");

            // --- CHECK FOR UNDERPERFORMING ---
            if (average < threshold)
            {
                underperforming.Add($"{product} (${average.ToString("F2")})");
            }
        }

        // STEP 5: Print Regional Bests and Underperforming Products
        Console.WriteLine("Best Selling Product by Region:");
        
        foreach (var region in bestProductByRegion.Keys)
        {
            string winner = bestProductByRegion[region];
            int winningAmount = highestSaleByRegion[region];
            Console.WriteLine($"{region}: {winner} (${winningAmount})");
        }

        Console.WriteLine($"\nUnderperforming Products (< ${threshold} average):");
        
        if (underperforming.Count > 0)
        {
            foreach (string badProduct in underperforming)
            {
                Console.WriteLine(badProduct);
            }
        }
        else
        {
            Console.WriteLine("None");
        }
    }
}