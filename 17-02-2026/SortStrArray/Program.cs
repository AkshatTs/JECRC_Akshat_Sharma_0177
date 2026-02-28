// // See https://aka.ms/new-console-template for more information
// Console.WriteLine("Hello, World!");
using System;
class ODLExample2{
    public static void Main(){
        string[] stringArray = new string[5] {"CSharp", "ASP.net", "EntityFramework", "ADO.net", "WCF"};
        Array.Sort(stringArray);
        foreach(string str in stringArray){
            Console.WriteLine(str + " ");
        }
    }
}