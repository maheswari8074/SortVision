#include <stdio.h>

// Function to find the index of the minimum element in the array from start to end
int findMinIndex(int arr[], int start, int end) {
    int minIndex = start;
    for (int i = start + 1; i <= end; i++) {
        if (arr[i] < arr[minIndex]) {
            minIndex = i;
        }
    }
    return minIndex;
}

// Function to perform Selection Sort
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        // Find the index of the minimum element in the unsorted part
        int minIndex = findMinIndex(arr, i, n - 1);

        // Swap the found minimum element with the current element
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}

// Function to print the array
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\n");
}

int main() {
    // Example usage with test cases
    int arr1[] = {64, 25, 12, 22, 11};
    int n1 = sizeof(arr1) / sizeof(arr1[0]);

    printf("Original array: ");
    printArray(arr1, n1);

    selectionSort(arr1, n1);

    printf("Sorted array: ");
    printArray(arr1, n1);

    // Test case: Single element
    int arr2[] = {42};
    printf("\nSingle element array before: ");
    printArray(arr2, 1);
    selectionSort(arr2, 1);
    printf("After sorting: ");
    printArray(arr2, 1);

    // Test case: Empty array
    int arr3[] = {};
    printf("\nEmpty array before: ");
    printArray(arr3, 0);
    selectionSort(arr3, 0);
    printf("After sorting: ");
    printArray(arr3, 0);

    return 0;
}

/*
📌 Time Complexity:
- Worst Case: O(n^2)
- Average Case: O(n^2)
- Best Case: O(n^2) (even if already sorted)

📌 Space Complexity:
- O(1) auxiliary space (in-place sort)

📌 Notes:
- Not stable by default
- Good for small datasets
- Minimizes number of swaps compared to Bubble Sort

📌 Edge Cases Handled:
- Empty array
- Single element array
*/
