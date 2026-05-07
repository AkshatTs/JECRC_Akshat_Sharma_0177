using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // STEP 1: Hardcoded Input Data
        // Parallel arrays: names[0] corresponds to grades[0]
        string[] names = { "John", "Sarah", "Mike", "Emma" };
        
        // This is a "Jagged Array" (An array holding other arrays)
        int[][] grades = {
            new int[] { 85, 90, 78, 92 },
            new int[] { 95, 88, 91, 89 },
            new int[] { 70, 65, 80, 75 },
            new int[] { 88, 92, 94, 96 }
        };

        Console.WriteLine("--- Student Grade Report ---");

        // STEP 2: Setup tracking variables
        double highestOverallAverage = -1;
        string topPerformerName = "";
        
        List<string> honorRoll = new List<string>();
        
        // A HashSet automatically ignores duplicate numbers
        HashSet<int> uniqueGrades = new HashSet<int>();

        // STEP 3: Process the Data
        for (int i = 0; i < names.Length; i++)
        {
            int sum = 0;
            
            // Start the highest and lowest at the very first grade the student got
            int highestGrade = grades[i][0]; 
            int lowestGrade = grades[i][0];
            
            bool allAbove80 = true; // Assume true until proven false

            // Loop through this specific student's grades
            for (int j = 0; j < grades[i].Length; j++)
            {
                int currentGrade = grades[i][j];
                
                sum += currentGrade;
                uniqueGrades.Add(currentGrade); // Add to master list (duplicates ignored automatically)

                // Update min/max if necessary
                if (currentGrade > highestGrade) highestGrade = currentGrade;
                if (currentGrade < lowestGrade) lowestGrade = currentGrade;
                
                // If even one grade is below 80, flag them as false
                if (currentGrade < 80) allAbove80 = false;
            }

            // Calculate average (cast to double so the math doesn't round to whole numbers)
            double average = (double)sum / grades[i].Length;

            // "F2" formats it perfectly to two decimal places (e.g., 86.25)
            Console.WriteLine($"{names[i]}: Average = {average.ToString("F2")}, Highest = {highestGrade}, Lowest = {lowestGrade}");

            // Did they beat the school high score?
            if (average > highestOverallAverage)
            {
                highestOverallAverage = average;
                topPerformerName = names[i];
            }

            // If they passed the threshold, save their formatted string
            if (allAbove80)
            {
                string gradesString = string.Join(",", grades[i]);
                honorRoll.Add($"{names[i]} ({gradesString})");
            }
        }

        // STEP 4: Print Final Aggregated Results
        Console.WriteLine($"\nTop Performer: {topPerformerName} (Average: {highestOverallAverage.ToString("F2")})\n");

        Console.WriteLine("Students with all grades >= 80:");
        foreach (string student in honorRoll)
        {
            Console.WriteLine(student);
        }

        Console.WriteLine("\nUnique Grade Values Across All Students:");
        
        // HashSets don't keep things sorted. We easily move it to a standard List and sort it!
        List<int> sortedUniqueGrades = new List<int>(uniqueGrades);
        sortedUniqueGrades.Sort();

        Console.WriteLine(string.Join(",", sortedUniqueGrades));
        Console.WriteLine($"Total unique grades: {sortedUniqueGrades.Count}");
    }
}