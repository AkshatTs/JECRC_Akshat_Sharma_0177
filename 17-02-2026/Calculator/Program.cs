
using System;
namespace ConsoleApp{
    class ODLExercise{
        int a;
        int b;
        public ODLExercise(){
            Console.Write("Enter value for a: ");
            a = Convert.ToInt32(Console.ReadLine());
            
            Console.Write("Enter value for b: ");
            b = Convert.ToInt32(Console.ReadLine());
        }
        public void Addition(){
            int sum = a + b;
            Console.WriteLine("Sum = " + sum);
        }
        public void Subtraction(){
            int diff = a - b;
            Console.WriteLine("Difference = " + diff);
        }
        public void Multiplication(){
            int prod = a * b;
            Console.WriteLine("Product = " + prod);
        }
        public void Division(){
            int div = a / b;
            Console.WriteLine("Div = " + div);
        }
    }
    class Demo{
        static void Main(){
            ODLExercise obj1 = new ODLExercise();
            obj1.Addition();
            obj1.Subtraction();
            obj1.Multiplication();
            obj1.Division();
        }
    }
}

// using System;

// class OLDExercise
// {
//     int a;
//     int b;

//     public void GetNumbers()
//     {
//         Console.Write("Input First number: ");
//         a = Convert.ToInt32(Console.ReadLine());

//         Console.Write("Input Second number: ");
//         b = Convert.ToInt32(Console.ReadLine());
//     }

//     public void Addition()
//     {
//         int sum = a + b;
//         Console.WriteLine("Sum = " + sum);
//     }

//     public void Subtraction()
//     {
//         int result = a - b;
//         Console.WriteLine("Subtraction = " + result);
//     }

//     public void Multiply()
//     {
//         int result = a * b;
//         Console.WriteLine("Multiplication = " + result);
//     }

//     public void Division()
//     {
//         if (b != 0)
//         {
//             int result = a / b;
//             Console.WriteLine("Division = " + result);
//         }
//         else
//         {
//             Console.WriteLine("Cannot divide by zero");
//         }
//     }
// }

// class Demo
// {
//     static void Main()
//     {
//         OLDExercise obj = new OLDExercise();
//         obj.GetNumbers();
//         obj.Addition();
//         obj.Subtraction();
//         obj.Multiply();
//         obj.Division();
//     }
// }