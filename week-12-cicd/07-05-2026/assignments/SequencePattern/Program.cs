using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // STEP 1: Hardcoded Input Data
        int[] logs = { 1, 3, 2, 3, 3, 4, 5, 3, 6, 7, 8, 9, 10, 3 };
        int k = 2;

        Console.WriteLine("--- Access Pattern Analysis ---\n");

        // STEP 2: The Master Count Dictionary 
        Dictionary<int, int> counts = new Dictionary<int, int>();
        foreach (int num in logs)
        {
            if (counts.ContainsKey(num))
            {
                counts[num] = counts[num] + 1;
            }
            else
            {
                counts.Add(num, 1);
            }
        }


        // REQUIREMENT 1: Longest Consecutive Sequence (Mathematical)
        
        // First, get unique numbers and sort them to easily find sequences
        List<int> uniqueSorted = new List<int>();
        foreach (int num in logs)
        {
            if (!uniqueSorted.Contains(num))
            {
                uniqueSorted.Add(num);
            }
        }
        uniqueSorted.Sort(); 

        int longestStreak = 1;
        int currentStreak = 1;
        int bestStartNum = uniqueSorted[0];
        int currentStartNum = uniqueSorted[0];

        for (int i = 1; i < uniqueSorted.Count; i++)
        {
            // If the number is exactly 1 more than the previous number
            if (uniqueSorted[i] == uniqueSorted[i - 1] + 1)
            {
                currentStreak++;
            }
            else
            {
                // Streak broke. Check if it's the new high score
                if (currentStreak > longestStreak)
                {
                    longestStreak = currentStreak;
                    bestStartNum = currentStartNum;
                }
                currentStreak = 1; // Reset
                currentStartNum = uniqueSorted[i]; // Start new potential streak
            }
        }
        // Final check in case the best streak was at the very end
        if (currentStreak > longestStreak)
        {
            longestStreak = currentStreak;
            bestStartNum = currentStartNum;
        }

        // Generate the text for the sequence
        List<int> sequenceText = new List<int>();
        for (int i = 0; i < longestStreak; i++)
        {
            sequenceText.Add(bestStartNum + i);
        }
        Console.WriteLine($"Longest Consecutive Sequence: {string.Join(",", sequenceText)} (Length: {longestStreak})\n");


        // REQUIREMENT 2: Most Frequent Element
        int mostFrequentNum = 0;
        int highestCount = 0;

        foreach (var row in counts)
        {
            if (row.Value > highestCount)
            {
                highestCount = row.Value;
                mostFrequentNum = row.Key;
            }
        }
        Console.WriteLine($"Most Frequent Element: {mostFrequentNum} (appears {highestCount} times)\n");


        // REQUIREMENT 3: First Non-Repeating Element
        string firstNonRepeating = "None"; 
        
        foreach (int num in logs)
        {
            if (counts[num] == 1)
            {
                firstNonRepeating = num.ToString();
                break; // Stop looking as soon as we find the FIRST one
            }
        }
        Console.WriteLine($"First Non-Repeating Element: {firstNonRepeating}\n");


        // REQUIREMENT 4: Pairs with Difference K
        List<string> pairs = new List<string>();
        
        foreach (int num in uniqueSorted)
        {
            int target = num + k;
            if (counts.ContainsKey(target))
            {
                pairs.Add($"({num}, {target})");
            }
        }
        Console.WriteLine($"Pairs with Difference {k}:");
        Console.WriteLine(string.Join(", ", pairs) + "\n");


        // REQUIREMENT 5: Majority Element
        int totalLogs = logs.Length;
        double percentage = Math.Round(((double)highestCount / totalLogs) * 100, 1);
        
        string majorityText = "";
        if (highestCount > totalLogs / 2)
        {
            majorityText = "Is majority";
        }
        else
        {
            majorityText = "No majority";
        }

        Console.WriteLine($"Majority Element: {mostFrequentNum} (appears {highestCount} out of {totalLogs} times - {percentage}% - {majorityText})");
    }
}