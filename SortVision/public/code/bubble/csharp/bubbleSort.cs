using System;

namespace SortVision
{
    /// <summary>
    /// A class that provides Bubble Sort functionality.
    /// </summary>
    public class BubbleSort
    {
        /// <summary>
        /// Sorts an integer array using the Bubble Sort algorithm.
        /// </summary>
        /// <param name="arr">The array to be sorted.</param>
        public static void Sort(int[] arr)
        {
            if (arr == null || arr.Length <= 1)
            {
                // Array is null, empty, or has a single element; no sorting needed. d
                return;
            }

            int n = arr.Length;
            for (int i = 0; i < n - 1; i++)
            {
                // Track if any swapping is done in this pass
                bool swapped = false;

                for (int j = 0; j < n - i - 1; j++)
                {
                    // Compare adjacent elements
                    if (arr[j] > arr[j + 1])
                    {
                        // Swap if needed
                        int temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;

                        swapped = true;
                    }
                }

                // If no swaps occurred, the array is already sorted
                if (!swapped)
                {
                    break;
                }
            }
        }

        /// <summary>
        /// Main method for testing the BubbleSort implementation.
        /// </summary>
        public static void Main(string[] args)
        {
            // Test cases
            int[][] testCases = {
                new int[] { 64, 34, 25, 12, 22, 11, 90 }, // Standard case
                new int[] { 1 },                          // Single element
                new int[] { },                            // Empty array
                new int[] { 1, 2, 3, 4, 5 },              // Already sorted
                new int[] { 5, 4, 3, 2, 1 },              // Reverse sorted
                new int[] { 3, 3, 1, 2, 3 }               // Contains duplicates
            };

            Console.WriteLine("Bubble Sort Test Cases:");
            foreach (var testCase in testCases)
            {
                Console.WriteLine("\nOriginal Array: " + string.Join(", ", testCase));
                Sort(testCase);
                Console.WriteLine("Sorted Array:   " + string.Join(", ", testCase));
            }
        }
    }
}
