// // See https://aka.ms/new-console-template for more information
// Console.WriteLine("Hello, World!");

using System;
class ODLExample1{
    public static void Main(){
        int[] intArray = new int[5] {23, 45, 12, 87, 09};
        Array.Sort(intArray);
        foreach(int num in intArray){
            Console.WriteLine(num + " ");
        }
    }
}