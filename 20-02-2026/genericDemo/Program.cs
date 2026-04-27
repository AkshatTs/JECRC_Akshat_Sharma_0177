using System;
using System.Security.AccessControl;
namespace GenricDemo{
    class UsingGenrics<T>{
        T obj;
        public UsingGenrics(T obj){
            this.obj = obj;
        }
        public T Get(){
            return obj;
        }
        public void ShowType(/*T obj*/){
            Console.WriteLine("Type of T is " + typeof(T));
        }
    }
    class TestGenerics{
        public static void Main(string[] args){
            UsingGenrics<int> objdata;
            objdata = new UsingGenrics<int>(500);
            objdata.ShowType();

            UsingGenrics<string> objdatastr;
            objdatastr = new UsingGenrics<string>("Akshat");
            objdatastr.ShowType();
        }
    }
}