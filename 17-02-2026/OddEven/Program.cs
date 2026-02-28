// // See https://aka.ms/new-console-template for more information
// Console.WriteLine("Hello, World!");
using System;
class Program{
    public static void Main(){
        int num1;
        num1 = Convert.ToInt32(Console.ReadLine());
        int num2;
        num2 = Convert.ToInt32(Console.ReadLine());
        if((num1 % 2 == 0 && num2 % 2 == 0) || (num1 % 2 != 0 && num2 % 2 != 0)){
            Console.Write("True");
        }
        else{
            Console.Write("False");
        }
    }
}