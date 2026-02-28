using System;
namespace AccessModifierDemo{
    class UsingAccessModifier{
        public void PublicMethod(){
            Console.WriteLine("It's Public");
        }
        private void PrivateMethod(){
            Console.WriteLine("It's Private");
        }
        protected void ProtectedMethod(){
            Console.WriteLine("It's Protected");
        }
        internal void InternalMethod(){
            Console.WriteLine("It's Internal");
        }
        protected internal void ProtectedInternalMethod(){
            Console.WriteLine("It's Protected Internal");
        }
        void SomeMethod(){
            Console.WriteLine("Some Method");
        }
    }

    class Test{
        static void Main(string[] args){
            UsingAccessModifier obj = new UsingAccessModifier();
            obj.PublicMethod();
            obj.InternalMethod();
            obj.ProtectedInternalMethod();
        }
    }
}