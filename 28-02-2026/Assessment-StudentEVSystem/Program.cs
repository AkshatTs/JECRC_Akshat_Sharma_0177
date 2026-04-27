using System;

// Entity Class
public class Student
{
public int StudentId { get; set; }
public string Name { get; set; }
public int Marks { get; set; }
public int Age { get; set; }
public int Attendance { get; set; }
}

// Core Engine (No eligibility logic here)
public class EligibilityEngine
{
public void CheckEligibility(Student student, string program, Predicate<Student> rule)
{
bool isEligible = rule(student);


    Console.WriteLine("========= ELIGIBILITY CHECK =========");
    Console.WriteLine("Student Name : " + student.Name);
    Console.WriteLine("Program      : " + program);
    Console.WriteLine("Eligible     : " + isEligible);
    Console.WriteLine("-----------------------------------");
    Console.WriteLine();
}


}

public class DefaultSolution
{
public static void Main()
{
// Hardcoded Dataset
Student student = new Student
{
StudentId = 301,
Name = "Ananya",
Marks = 78,
Age = 18,
Attendance = 85
};


    // Eligibility Rules using Predicate

    // Engineering → Marks ≥ 60
    Predicate<Student> engineeringRule = s => s.Marks >= 60;

    // Medical → Marks ≥ 70 AND Age ≥ 17
    Predicate<Student> medicalRule = s => s.Marks >= 70 && s.Age >= 17;

    // Management → Marks ≥ 55 AND Attendance ≥ 75
    Predicate<Student> managementRule = s => s.Marks >= 55 && s.Attendance >= 75;

    // Create Engine
    EligibilityEngine engine = new EligibilityEngine();

    // Validate Programs
    engine.CheckEligibility(student, "Engineering", engineeringRule);
    engine.CheckEligibility(student, "Medical", medicalRule);
    engine.CheckEligibility(student, "Management", managementRule);
}

}
