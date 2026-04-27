// // See https://aka.ms/new-console-template for more information
// Console.WriteLine("Hello, World!");
using System;
class ODLExample3{
    public static void Main(){
        string myInp;
        int myInt;

        begin:

        Console.WriteLine("Please enter no. between 1 and 3: ");
        myInp = Console.ReadLine();
        myInt = Int32.Parse(myInp);

        switch(myInt){
            case 1:
                Console.WriteLine("Your number is {0}", myInt);
                break;
            case 2:
                Console.WriteLine("Your number is {0}", myInt);
                break;
            case 3:
                Console.WriteLine("Your number is {0}", myInt);
                break;
            default:
                Console.WriteLine("Your number is {0} is not between 1 and 3", myInt);
                break;
        }
    }
}