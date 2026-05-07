using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // STEP 1: Hardcoded Input (Matching your sample)
        int[] originalPrices = { 299, 499, 199, 399, 599, 159, 699, 259 };
        int targetSum = 698;

        Console.WriteLine("--- Product Price Analysis ---");
        Console.WriteLine($"Original Prices: {string.Join(", ", originalPrices)}\n");

        // REQUIREMENT 1: Custom Sorting (Bubble Sort)
        
        // Make a copy so we don't ruin the original array's order
        int[] sortedPrices = new int[originalPrices.Length];
        Array.Copy(originalPrices, sortedPrices, originalPrices.Length);

        // Bubble sort logic
        for (int i = 0; i < sortedPrices.Length - 1; i++)
        {
            for (int j = 0; j < sortedPrices.Length - 1 - i; j++)
            {
                if (sortedPrices[j] > sortedPrices[j + 1])
                {
                    int temp = sortedPrices[j];
                    sortedPrices[j] = sortedPrices[j + 1];
                    sortedPrices[j + 1] = temp;
                }
            }
        }
        Console.WriteLine($"Sorted Prices (Ascending): {string.Join(", ", sortedPrices)}\n");


        // REQUIREMENT 2: Binary Search
        Console.WriteLine("Binary Search Results:");
        
        int[] searchTargets = { 399, 500 }; // The two prices we want to look up

        foreach (int searchTarget in searchTargets)
        {
            int left = 0;
            int right = sortedPrices.Length - 1;
            int foundIndex = -1; 

            while (left <= right)
            {
                int mid = left + (right - left) / 2;

                if (sortedPrices[mid] == searchTarget)
                {
                    foundIndex = mid;
                    break; 
                }
                else if (sortedPrices[mid] < searchTarget)
                {
                    left = mid + 1; 
                }
                else
                {
                    right = mid - 1; 
                }
            }

            if (foundIndex != -1)
                Console.WriteLine($"Price {searchTarget} found at index {foundIndex}");
            else
                Console.WriteLine($"Price {searchTarget} not found");
        }
        Console.WriteLine();


        // REQUIREMENT 3: Pairs that sum to target value (Two Pointers)
        Console.WriteLine($"Pairs that sum to {targetSum}:");
        
        int leftPointer = 0;
        int rightPointer = sortedPrices.Length - 1;
        bool foundPair = false;

        while (leftPointer < rightPointer)
        {
            int currentSum = sortedPrices[leftPointer] + sortedPrices[rightPointer];

            if (currentSum == targetSum)
            {
                Console.WriteLine($"({sortedPrices[leftPointer]}, {sortedPrices[rightPointer]})");
                foundPair = true;
                leftPointer++;
                rightPointer--;
            }
            else if (currentSum < targetSum)
            {
                leftPointer++; 
            }
            else
            {
                rightPointer--; 
            }
        }
        if (!foundPair) Console.WriteLine("None");
        Console.WriteLine();


        // REQUIREMENT 4: Longest Increasing Subsequence (Dynamic Programming)
        int n = originalPrices.Length;
        int[] lisLengths = new int[n]; 
        int[] prevIndices = new int[n]; 

        int maxLength = 1;
        int bestEndIndex = 0;

        for (int i = 0; i < n; i++)
        {
            lisLengths[i] = 1;
            prevIndices[i] = -1; 
        }

        for (int i = 1; i < n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                if (originalPrices[i] > originalPrices[j] && lisLengths[j] + 1 > lisLengths[i])
                {
                    lisLengths[i] = lisLengths[j] + 1;
                    prevIndices[i] = j; 
                }
            }

            if (lisLengths[i] > maxLength)
            {
                maxLength = lisLengths[i];
                bestEndIndex = i;
            }
        }

        // Reconstruct the winning path
        List<int> lisList = new List<int>();
        int curr = bestEndIndex;
        while (curr != -1)
        {
            lisList.Insert(0, originalPrices[curr]); 
            curr = prevIndices[curr];
        }

        Console.WriteLine("Longest Increasing Subsequence:");
        Console.WriteLine($"{string.Join(", ", lisList)} (Length: {maxLength})\n");


        // REQUIREMENT 5: Statistics
        Console.WriteLine("Statistics:");
        
        int lowest = sortedPrices[0];
        int highest = sortedPrices[sortedPrices.Length - 1];

        int sum = 0;
        foreach (int price in sortedPrices) 
        {
            sum += price;
        }
        double average = (double)sum / sortedPrices.Length;

        double median = 0;
        int midIndex = sortedPrices.Length / 2;
        
        if (sortedPrices.Length % 2 == 0)
        {
            // Even length array
            median = (sortedPrices[midIndex - 1] + sortedPrices[midIndex]) / 2.0;
        }
        else
        {
            // Odd length array
            median = sortedPrices[midIndex];
        }

        Console.WriteLine($"Lowest Price: {lowest}");
        Console.WriteLine($"Highest Price: {highest}");
        Console.WriteLine($"Average Price: {average.ToString("F2")}");
        Console.WriteLine($"Median Price: {median.ToString("F2")}");
    }
}