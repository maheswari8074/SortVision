// File: quickSort.cs
// Description: Efficient and clean Quick Sort implementation in C# with multiple pivot strategies,
// edge case handling, and test cases.

using System;

public class QuickSort
{
    // Entry point: Public method to sort an array using Quick Sort
    public static void Sort(int[] arr, string pivotStrategy = "last")
    {
        if (arr == null || arr.Length <= 1)
            return; // Edge cases: null or single-element array

        QuickSortRecursive(arr, 0, arr.Length - 1, pivotStrategy);
    }

    // Recursive Quick Sort implementation
    private static void QuickSortRecursive(int[] arr, int low, int high, string pivotStrategy)
    {
        if (low < high)
        {
            int pi = Partition(arr, low, high, pivotStrategy);
            QuickSortRecursive(arr, low, pi - 1, pivotStrategy);
            QuickSortRecursive(arr, pi + 1, high, pivotStrategy);
        }
    }

    // Partition function with pivot strategy
    private static int Partition(int[] arr, int low, int high, string pivotStrategy)
    {
        int pivotIndex = ChoosePivot(arr, low, high, pivotStrategy);
        Swap(arr, pivotIndex, high); // Move pivot to end for partitioning
        int pivot = arr[high];

        int i = low - 1;
        for (int j = low; j < high; j++)
        {
            if (arr[j] <= pivot)
            {
                i++;
                Swap(arr, i, j);
            }
        }

        Swap(arr, i + 1, high);
        return i + 1;
    }

    // Swap utility
    private static void Swap(int[] arr, int i, int j)
    {
        if (i != j)
        {
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    // Pivot selection strategies
    private static int ChoosePivot(int[] arr, int low, int high, string strategy)
    {
        return strategy.ToLower() switch
        {
            "first" => low,
            "middle" => low + (high - low) / 2,
            "random" => new Random().Next(low, high + 1),
            _ => high, // default: last element
            "random" => RandomProvider.Next(low, high + 1),
    }

    // Sample usage
    public static void Main()
    {
        Console.WriteLine("Quick Sort Example:");

        int[] array = { 10, 7, 8, 9, 1, 5 };
        Console.WriteLine("Original Array: " + string.Join(", ", array));

        // Using last element as pivot
        Sort(array, "last");

        Console.WriteLine("Sorted Array (Last Pivot): " + string.Join(", ", array));

        // Additional test case using random pivot
        int[] testArray = { 3, 5, 2, 1, 4 };
        Sort(testArray, "random");
        Console.WriteLine("Sorted Array (Random Pivot): " + string.Join(", ", testArray));
    }
}
