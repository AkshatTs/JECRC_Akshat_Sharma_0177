using System;
class DrawingObject
{
    public virtual void Draw(){
        Console.WriteLine("Drawing something");
    }
}
class Line : DrawingObject
{
    public override void Draw()
    {
        Console.WriteLine("I am a Line");
    }
}
class Circle : DrawingObject
{
    public override void Draw()
    {
        Console.WriteLine("I am a Circle");
    }
}
class Square : DrawingObject
{
    public override void Draw()
    {
        Console.WriteLine("I am a Square");
    }
}

class TestApp
{
    static void Main(string[] args)
    {
        DrawingObject[] shapes = new DrawingObject[3];

        shapes[0] = new Line();
        shapes[1] = new Circle();
        shapes[2] = new Square();

        foreach (DrawingObject obj in shapes)
        {
            obj.Draw();
        }
    }
}