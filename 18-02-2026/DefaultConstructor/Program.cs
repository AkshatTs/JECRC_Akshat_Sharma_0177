using System;
class ODLExercise{
    private int number;
    public int Number { get {return number;}}
    public ODLExercise(){
        Random r = new Random();
        number = r.Next();
    }
}
class Program{
    static void Main(string[] args){
        ODLExercise num = new ODLExercise();
        Console.WriteLine("Static Number = " + num.Number);
    }
}