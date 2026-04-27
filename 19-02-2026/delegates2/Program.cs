using System;
namespace DelegateDemo{
    public delegate void NotificationSender(string message);
    class Notifiers{
        public static void SendEmail(string message){
            Console.WriteLine("Email Sent: " + message);
        }

        public static void SendSMS(string message){
            Console.WriteLine("SMS Sent: " + message);
        }

        public static void SendPushNotification(string message){
            Console.WriteLine("Push Notification Sent: " + message);
        }
    }

    class NotificationManager{
        public void NotifyUser(string message, NotificationSender sender){
            sender(message);
        }
    }

    class Program{
        static void Main(string[] args){
            NotificationManager manager = new NotificationManager();
            manager.NotifyUser("Welcome to Capgemini Training", Notifiers.SendEmail);
            manager.NotifyUser("Your OTP is 4589", Notifiers.SendSMS);
            manager.NotifyUser("You have a new message!", Notifiers.SendPushNotification);
        }
    }
}
