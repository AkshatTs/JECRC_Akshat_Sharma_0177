using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // STEP 1: Hardcoded Input Data
        string text = "The quick brown fox jumps over the lazy dog. The fox is quick and the dog is lazy. Quick brown fox jumps over the lazy dog again.";
        int topN = 3;

        // STEP 2: Clean the text (Case-insensitive & no punctuation)
        text = text.ToLower(); 
        text = text.Replace(".", "").Replace(",", "").Replace("!", "").Replace("?", "");

        // STEP 3: Split into words
        string[] words = text.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

        // STEP 4: Count the frequencies using a Dictionary
        Dictionary<string, int> wordCounts = new Dictionary<string, int>();

        foreach (string word in words)
        {
            if (wordCounts.ContainsKey(word))
            {
                wordCounts[word] = wordCounts[word] + 1; 
            }
            else
            {
                wordCounts.Add(word, 1); 
            }
        }

        // STEP 5: Calculate and print basic stats
        int totalWords = words.Length;
        int uniqueWords = wordCounts.Count;

        Console.WriteLine("--- Word Frequency Analysis ---");
        Console.WriteLine($"Total words: {totalWords}");
        Console.WriteLine($"Unique words: {uniqueWords}\n");

        // STEP 6: Display Top N words WITHOUT LINQ
        Console.WriteLine($"Top {topN} Frequent Words:");
        
        // Keep track of words we already printed so we don't print them twice
        List<string> alreadyPrinted = new List<string>();

        for (int i = 0; i < topN; i++)
        {
            string currentTopWord = "";
            int currentHighestCount = -1;

            // Go through the whole dictionary to find the biggest number
            foreach (var pair in wordCounts)
            {
                string word = pair.Key;
                int count = pair.Value;

                // If this count is higher than our current highest AND we haven't printed it yet
                if (count > currentHighestCount && !alreadyPrinted.Contains(word))
                {
                    currentHighestCount = count;
                    currentTopWord = word;
                }
            }

            // Print the winner for this round and add it to our "already printed" list
            if (currentHighestCount != -1)
            {
                Console.WriteLine($"{currentTopWord}: {currentHighestCount} times");
                alreadyPrinted.Add(currentTopWord);
            }
        }

        // STEP 7: Find words that appear exactly once
        Console.WriteLine("\nWords appearing exactly once:");
        List<string> singleWords = new List<string>();

        foreach (var pair in wordCounts)
        {
            if (pair.Value == 1)
            {
                singleWords.Add(pair.Key);
            }
        }
        
        // Sort alphabetically so the output looks clean
        singleWords.Sort();
        Console.WriteLine(string.Join(", ", singleWords));

        // STEP 8: Calculate average frequency
        double average = (double)totalWords / uniqueWords;
        
        // Math.Round keeps it nicely formatted to 2 decimal places
        Console.WriteLine($"\nAverage frequency: {Math.Round(average, 2)} times per unique word");
    }
}