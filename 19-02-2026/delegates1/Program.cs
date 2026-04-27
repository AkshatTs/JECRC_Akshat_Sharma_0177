namespace DelegateDemo{
    public delegate void ArithmeticOperation(int x, int y);
    class UsingDelegates{
        static void Add(int x, int y){
            Console.WriteLine(x + y);
        }
        static void Subtract(int x, int y){
            Console.WriteLine(x - y);
        }
        static void Multiply(int x, int y){
            Console.WriteLine(x * y);
        }
        static void Divide(int x, int y){
            Console.WriteLine(x / y);
        }

        static void Main(string[] args){
            // ArithmeticOperation  obj = new ArithmeticOperation(Add);
            // obj(45, 30);
            // ArithmeticOperation  obj1 = new ArithmeticOperation(Subtract);
            // obj1(45, 30);
            ArithmeticOperation  obj = new ArithmeticOperation(Add);
            obj += new ArithmeticOperation(Subtract);
            obj += new ArithmeticOperation(Multiply);
            obj += new ArithmeticOperation(Divide);
            // obj -= new ArithmeticOperation(Multiply);
            obj(45, 30);
        }
    }

}