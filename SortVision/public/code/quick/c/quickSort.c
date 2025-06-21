#include <stdio.h>

// Function to swap two integers
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// Lomuto partition function: selects the last element as pivot
int partition(int arr[], int low, int high) {
    int pivot = arr[high]; // Pivot element
    int i = low - 1;        // Index of smaller element

    for (int j = low; j < high; j++) {
        // If current element is smaller than or equal to pivot
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }

    // Place pivot at correct position
    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}

// Recursive Quick Sort function using divide and conquer
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        // pi is partitioning index
        int pi = partition(arr, low, high);

        // Recursively sort elements before and after partition
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// Utility function to print an array
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\n");
}

// Main function to test the Quick Sort implementation
int main() {
    // Test Case 1: General array
    int arr1[] = {10, 7, 8, 9, 1, 5};
    int n1 = sizeof(arr1) / sizeof(arr1[0]);
    printf("Original array: ");
    printArray(arr1, n1);
    quickSort(arr1, 0, n1 - 1);
    printf("Sorted array: ");
    printArray(arr1, n1);
    printf("\n");

    // Test Case 2: Already sorted array
    int arr2[] = {1, 2, 3, 4, 5};
    int n2 = sizeof(arr2) / sizeof(arr2[0]);
    quickSort(arr2, 0, n2 - 1);
    printf("Sorted already sorted array: ");
    printArray(arr2, n2);
    printf("\n");

    // Test Case 3: Single element
    int arr3[] = {42};
    quickSort(arr3, 0, 0);
    printf("Single element array: ");
    printArray(arr3, 1);
    printf("\n");

    // Test Case 4: Empty array
    int arr4[] = {};
    quickSort(arr4, 0, -1);
    printf("Empty array: ");
    printArray(arr4, 0);
    printf("\n");

    return 0;
}

/*
🧠 Time Complexity:
- Best Case: O(n log n)
- Average Case: O(n log n)
- Worst Case: O(n^2) — when pivot is the smallest/largest every time

💾 Space Complexity:
- O(log n) auxiliary space for recursion stack (in-place sorting)

📌 Pivot Strategy Used:
- Lomuto scheme (last element as pivot)

🚀 Performance Optimization Notes:
- Can use Median-of-Three or Random Pivot to improve worst-case performance.
- Tail call elimination can reduce recursion stack height.

✅ Edge Cases Handled:
- Empty array
- Single-element array
- Already sorted array
- Repeated elements
*/
