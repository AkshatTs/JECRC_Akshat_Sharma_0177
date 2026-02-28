using System;
namespace OrderDemo{
    public abstract class OrderProcessor{
        public int OrderId { get; set; }
        public double Amount { get; set; }

        public abstract void ProcessPayment();
        public abstract void GenerateInvoice();
        public abstract void SendNotification();

        public void DisplayOrderDetails(){
            Console.WriteLine("Order ID: " + OrderId);
            Console.WriteLine("Order Amount: " + Amount);
        }
    }

    class OnlineOrder : OrderProcessor{
        public override void ProcessPayment(){
            Console.WriteLine("Processing online payment using Debit Card");
        }

        public override void GenerateInvoice(){
            Console.WriteLine("Generating Digital Invoice");
        }

        public override void SendNotification(){
            Console.WriteLine("Sending Email Notification to customer");
        }
    }

    class Program{
        public static void Main(string[] args){
            OrderProcessor order = new OnlineOrder();

            order.OrderId = 101;
            order.Amount = 2500.50;

            order.DisplayOrderDetails();
            order.ProcessPayment();
            order.GenerateInvoice();
            order.SendNotification();
        }
    }
}




// using System;

// namespace OrderProcessingDemo
// {
//     class Program
//     {
//         static void Main(string[] args)
//         {
//             int [] a = new int[4];
//             try
//             {
//                 Console.WriteLine("Before Exeception is generated");
//                 for (int i =0; i < 10; i++)
//                 {
//                     a[i] = i;
//                     Console.WriteLine("a[{0}]: {1}", i, a[i]);
//                 }
//                 Console.WriteLine("this will not be displayed");
//             }
//             catch (IndexOutOfRangeException)
//             {
//                 Console.WriteLine("Index out of bounds");
//             }
//             Console.WriteLine("After catch statement");
//         }
//     }
// }


// using System;

// namespace OrderProcessingDemo
// {
//     class Program
//     {
//         static void Main(string[] args)
//         {
//             int [] a = {4,8,16,32,64,128,256,512};
//             int [] b = {2,0,4,4,0,8};
//             for (int i=0; i<a.Length; i++)
//             {
//                 try
//                 {
//                     Console.WriteLine(a[i] + " / " + b[i] + " is " + a[i]/b[i]);
//                 }
//                 catch(DivideByZeroException)
//                 {
//                     Console.WriteLine("Can not divide by zero");
//                 }
//                 catch(IndexOutOfRangeException)
//                 {
//                     Console.WriteLine("Not matching element found");
//                 }
//             }
//         }
//     }
// }

// using System;

// namespace OrderProcessingDemo
// {
//     class Program
//     {
//         static void Main(string[] args)
//         {
//             int [] a = {4,8,16,32,64,128,256,512};
//             int [] b = {2,0,4,4,0,8};
//             for (int i=0; i<a.Length; i++)
//             {
//                 try
//                 {
//                     Console.WriteLine(a[i] + " / " + b[i] + " is " + a[i]/b[i]);
//                 }
//                 catch(DivideByZeroException)
//                 {
//                     Console.WriteLine("Some exception occur");
//                 }
//             }
//         }
//     }
// }


// using System;


// namespace OrderProcessingDemo
// {
//     class Program
//     {
//         static void Main(string[] args)
//         {
//             int [] a = {4,8,16,32,64,128,256,512};
//             int [] b = {2,0,4,4,0,8};
//             for (int i=0; i<a.Length; i++)
//             {
//                 try
//                 {
//                     Console.WriteLine(a[i] + " / " + b[i] + " is " + a[i]/b[i]);
//                 }
//                 catch(DivideByZeroException)
//                 {
//                     Console.WriteLine("Can not divide by zero");
//                 }
//             }
//         }
//     }
// }


// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Text;
// using System.Threading.Tasks;
// namespace CustomExceptionExampleCode
// {
//     class MyException: Exception 
//     {
//         public MyException(string Message): base (Message) {}
//         public MyException() {}
//         public MyException(string Message, Exception inner): base (Message,inner) {}
//     }
//     class Program
//     {
//         static void Main(string[] args) 
//         {
//             int a = 50;
//             int b= 10;
//             int k = a/ b;
//             try 
//             {
//                 if (k < 10) 
//                 { 
//                     throw new MyException ("value of k is less than 10");
//                 }
//             } 
//             catch (MyException e) 
//             {
//                 Console.WriteLine("Caught My Exception"); 
//                 Console.WriteLine (e.Message);
//                 Console.Read();
//             }
//         }
//     }
// }



// using System;
// using System.Globalization;
// class ExcDemo4
// {
//     public static void Main(string[] args)
//     {
//         int[] numer = { 4, 0, 16, 32, 64, 128, 256, 512 };
//         int[] denom = { 2, 0, 4, 4, 0, 8 };

//         for (int i = 0; i < numer.Length; i++)
//         {
//             try
//             {
//                 Console.WriteLine(numer[i] + " / " + denom[i] + " is " + numer[i] / denom[i]);
//                 throw new DivideByZeroException();
//             }
//             catch (DivideByZeroException)
//             {
//                 Console.WriteLine("Can't Divide by Zero! ");
//             }
//             catch (IndexOutOfRangeException)
//             {
//                 Console.WriteLine("No matching element found");
//             }
//             catch
//             {
//                 Console.WriteLine("Some exception Occured");
//             }
//             finally
//             {
//                 Console.WriteLine("Final block");
//             }

//         }
//     }
// } //nesting of try catch block