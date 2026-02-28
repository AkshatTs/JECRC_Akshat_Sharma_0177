// // See https://aka.ms/new-console-template for more information
// Console.WriteLine("Hello, World!");
using System;
class Program{
    static void Main(string[] args){
        int? j = null;
        int? k = 54;
        int result1 = j ?? 0;
        int result2 = k ?? 0;
        Console.WriteLine("result1 = {0}, result2 = {1}", result1, result2);
        Console.ReadLine();
    }
}