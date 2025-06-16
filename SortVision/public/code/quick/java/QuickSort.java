

import java.util.Arrays;

/**
 * Implements the Quick Sort algorithm for sorting an array of integers.
 * Quick Sort is a divide-and-conquer algorithm that works by selecting a 'pivot'
 * element from the array and partitioning the other elements into two sub-arrays,
 * according to whether they are less than or greater than the pivot. The sub-arrays
 * are then sorted recursively.
 *
 * <h3>Pivot Strategy:</h3>
 * This implementation uses the Lomuto partition scheme, where the pivot is chosen
 * as the last element of the segment (`arr[high]`). Other strategies like
 * median-of-three or random pivot selection can also be implemented to potentially
 * improve performance and mitigate worst-case scenarios, but are not included
 * in this basic version to maintain simplicity.
 *
 * <h3>Performance Optimization Notes:</h3>
 * <ul>
 *   <li><b>Pivot Selection:</b> The choice of pivot is crucial. A good pivot (one that splits the array into roughly equal halves)
 *       leads to O(n log n) performance. Poor pivot choices (e.g., always smallest/largest in a sorted/reverse-sorted array
 *       with a fixed pivot strategy) can degrade performance to O(n<sup>2</sup>).
 *       Randomized pivots or median-of-three can help mitigate this.</li>
 *   <li><b>Cutoff for Small Arrays:</b> For very small sub-arrays, the overhead of recursion in Quick Sort can make it less
 *       efficient than simpler algorithms like Insertion Sort. Many optimized Quick Sort implementations switch to
 *       Insertion Sort for sub-arrays smaller than a certain threshold (e.g., 10-20 elements).</li>
 *   <li><b>Duplicate Elements:</b> Handling of arrays with many duplicate elements can sometimes be optimized.
 *       For example, a three-way partition scheme (partitioning into less than, equal to, and greater than the pivot)
 *       can be more efficient in such cases, though it adds complexity to the partition logic. This implementation uses
 *       a standard two-way partition.</li>
 * </ul>
 *
 * @author Jules (AI Assistant)
 * @version 1.0
 */
public class QuickSort {

    /**
     * Partitions the array segment arr[low...high] around a pivot.
     * This implementation uses the Lomuto partition scheme, where the pivot
     * is chosen as the last element of the segment (arr[high]).
     * Elements smaller than or equal to the pivot are moved to its left,
     * and elements greater than the pivot are moved to its right.
     *
     * @param arr The array containing the segment to be partitioned.
     * @param low The starting index of the segment.
     * @param high The ending index of the segment (the pivot is arr[high]).
     * @return The final index of the pivot element after partitioning.
     */
    private int partition(int[] arr, int low, int high) {
        int pivot = arr[high]; // Pivot is the last element
        int i = (low - 1); // Index of smaller element, tracks the boundary

        for (int j = low; j < high; j++) {
            // If current element is smaller than or equal to pivot
            if (arr[j] <= pivot) {
                i++;
                // Swap arr[i] and arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        // Swap arr[i+1] and arr[high] (the pivot)
        // This places the pivot in its correct sorted position
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1; // Return the pivot's final resting place
    }

    /**
     * Sorts a segment of an array of integers using the Quick Sort algorithm.
     * This method sorts the array in place recursively.
     *
     * @param arr The array to be sorted.
     * @param low The starting index of the segment to sort.
     * @param high The ending index of the segment to sort.
     */
    public void sort(int[] arr, int low, int high) {
        if (arr == null || arr.length == 0) {
            return; // Handle empty or null arrays early
        }
        if (low < 0 || high >= arr.length || low > high) {
            // Optional: Add error handling or return for invalid range,
            // or trust the caller (internal method). For now, we proceed.
            // This check is more critical if it were a public API for segments.
        }

        if (low < high) {
            // pi is partitioning index, arr[pi] is now at the right place
            int pi = partition(arr, low, high);

            // Recursively sort elements before partition and after partition
            sort(arr, low, pi - 1);
            sort(arr, pi + 1, high);
        }
    }

    /**
     * Sorts an entire array of integers using the Quick Sort algorithm.
     * This is a convenience method that calls the recursive sort method
     * with the appropriate initial low and high indices.
     *
     * <h3>Time Complexity:</h3>
     * <ul>
     *   <li><b>Best Case:</b> O(n log n) - Occurs when the pivot element always divides the array into two nearly equal halves.</li>
     *   <li><b>Average Case:</b> O(n log n) - Achieved with random pivot selection or when input data is random.</li>
     *   <li><b>Worst Case:</b> O(n<sup>2</sup>) - Occurs when the pivot element is consistently the smallest or largest element
     *       (e.g., when sorting an already sorted or reverse-sorted array with a fixed pivot like the first or last element).</li>
     * </ul>
     *
     * <h3>Space Complexity:</h3>
     * <ul>
     *   <li><b>Average Case:</b> O(log n) - Due to the depth of the recursion stack for balanced partitions.</li>
     *   <li><b>Worst Case:</b> O(n) - Due to the depth of the recursion stack if partitions are extremely unbalanced,
     *       leading to a skewed recursion tree (e.g., in the worst-case time complexity scenario).</li>
     * </ul>
     *
     * @param arr The array to be sorted. If null or empty, the method returns without action.
     */
    public void sort(int[] arr) {
        if (arr == null || arr.length == 0) {
            return;
        }
        sort(arr, 0, arr.length - 1);
    }

    // Main method for example usage and basic tests will be updated later.
    // TODO: Add test cases
    // TODO: Add Javadoc comments for time/space complexity and pivot strategies
    public static void main(String[] args) {
        QuickSort sorter = new QuickSort();
        
        int[] arr = {10, 7, 8, 9, 1, 5};
        System.out.println("Original array: " + Arrays.toString(arr));
        
        sorter.sort(arr); // Calls the public sort(int[] arr) method
        
        System.out.println("Sorted array: " + Arrays.toString(arr));

        // Additional examples can be added here or in a dedicated test section
        int[] emptyArr = {};
        System.out.println("Original empty array: " + Arrays.toString(emptyArr));
        sorter.sort(emptyArr);
        System.out.println("Sorted empty array: " + Arrays.toString(emptyArr));

        int[] singleElementArr = {42};
        System.out.println("Original single element array: " + Arrays.toString(singleElementArr));
        sorter.sort(singleElementArr);
        System.out.println("Sorted single element array: " + Arrays.toString(singleElementArr));
        
        int[] alreadySortedArr = {1, 2, 3, 4, 5};
        System.out.println("Original already sorted array: " + Arrays.toString(alreadySortedArr));
        sorter.sort(alreadySortedArr); // Test worst-case for this pivot strategy
        System.out.println("Sorted already sorted array: " + Arrays.toString(alreadySortedArr));
        
        int[] reverseSortedArr = {5, 4, 3, 2, 1};
        System.out.println("Original reverse sorted array: " + Arrays.toString(reverseSortedArr));
        sorter.sort(reverseSortedArr);
        System.out.println("Sorted reverse sorted array: " + Arrays.toString(reverseSortedArr));
    }
}
