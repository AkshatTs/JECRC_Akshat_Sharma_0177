using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {

        // STEP 1: Hardcoded Input Data
        // Using standard Lists makes the .Contains() method easy to use

        List<string> electronics = new List<string> { "C001", "C002", "C003", "C005", "C008" };
        List<string> clothing = new List<string> { "C002", "C004", "C005", "C006", "C009" };
        List<string> books = new List<string> { "C003", "C005", "C007", "C008", "C010" };

        Console.WriteLine("--- Customer Preference Analysis ---\n");


        // OPERATION 1: ANY category (Union)

        List<string> anyCategory = new List<string>();

        // Add everyone from electronics
        foreach (string person in electronics) 
        {
            anyCategory.Add(person);
        }
        
        // Add from clothing (only if not already there)
        foreach (string person in clothing) 
        {
            if (!anyCategory.Contains(person)) 
            {
                anyCategory.Add(person);
            }
        }
        
        // Add from books (only if not already there)
        foreach (string person in books) 
        {
            if (!anyCategory.Contains(person)) 
            {
                anyCategory.Add(person);
            }
        }
        
        anyCategory.Sort(); // Built-in sort for lists (no LINQ required)
        PrintResult("1. Customers in ANY category (Union):", anyCategory);



        // OPERATION 2: ALL categories (Intersection)

        List<string> allCategories = new List<string>();
        
        foreach (string person in electronics)
        {
            // Must be in electronics AND clothing AND books
            if (clothing.Contains(person) && books.Contains(person))
            {
                allCategories.Add(person);
            }
        }
        PrintResult("2. Customers in ALL categories (Intersection):", allCategories);



        // OPERATION 3: ONLY Electronics (Difference)

        List<string> onlyElectronics = new List<string>();
        
        foreach (string person in electronics)
        {
            // Must be in electronics, but NOT clothing AND NOT books
            if (!clothing.Contains(person) && !books.Contains(person))
            {
                onlyElectronics.Add(person);
            }
        }
        PrintResult("3. Customers ONLY in Electronics (Difference):", onlyElectronics);



        // OPERATION 4: Electronics AND Books but NOT Clothing

        List<string> elecAndBooksNotClothing = new List<string>();
        
        foreach (string person in electronics)
        {
            // Must be in electronics AND books, but NOT clothing
            if (books.Contains(person) && !clothing.Contains(person))
            {
                elecAndBooksNotClothing.Add(person);
            }
        }
        PrintResult("4. Customers in Electronics AND Books but NOT Clothing:", elecAndBooksNotClothing);
    }

    // HELPER METHOD: Keeps our printing logic clean and prevents repetition
    static void PrintResult(string title, List<string> resultList)
    {
        Console.WriteLine(title);
        Console.WriteLine(string.Join(", ", resultList));
        
        // Minor formatting logic to say "customer" vs "customers"
        string plural = resultList.Count == 1 ? "" : "s";
        Console.WriteLine($"Total: {resultList.Count} customer{plural}\n");
    }
}