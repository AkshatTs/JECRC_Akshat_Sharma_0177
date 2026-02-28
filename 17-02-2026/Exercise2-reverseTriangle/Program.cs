// // See https://aka.ms/new-console-template for more information
// Console.WriteLine("Hello, World!");
using System;
class Program{
    public static void Main(){
        int num = 2;
        int width = 6;
        for(int i=width;i>=1;i--){
            for(int j=i;j>=1;j--){
                Console.Write(num + " ");
            }
            Console.WriteLine();
        }
    }
}