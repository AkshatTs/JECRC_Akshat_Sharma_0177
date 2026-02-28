// // See https://aka.ms/new-console-template for more information
// Console.WriteLine("Hello, World!");
using System;

class Program{
    
    public static void Main()
    {
        // char letter1, letter2, letter3;

        Console.WriteLine("Enter first letter: ");
        char a = Convert.ToChar(Console.ReadLine());

        Console.WriteLine("Enter second letter: ");
        char b = Convert.ToChar(Console.ReadLine());

        Console.WriteLine("Enter third letter: ");
        char c = Convert.ToChar(Console.ReadLine());

        Console.WriteLine(c + b + a);
    }
}
