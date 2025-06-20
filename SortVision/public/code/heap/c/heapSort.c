#include <stdio.h>

// Utility function to swap two elements
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// Heapify a subtree rooted with node i in array of size n
void heapify(int arr[], int n, int i) {
    int largest = i;          // Initialize largest as root
    int left = 2 * i + 1;     // Left child index
    int right = 2 * i + 2;    // Right child index

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest])
        largest = left;

    // If right child is larger than current largest
    if (right < n && arr[right] > arr[largest])
        largest = right;

    // If largest is not root, swap and continue heapifying
    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);  // Recursively heapify the affected subtree
    }
}

// Build max heap from an unordered array
void buildMaxHeap(int arr[], int n) {
    // Start from last non-leaf node and heapify each node
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
}

// Main function to perform Heap Sort
void heapSort(int arr[], int n) {
    // Step 1: Build max heap
    buildMaxHeap(arr, n);

    // Step 2: One by one extract elements from heap
    for (int i = n - 1; i > 0; i--) {
        // Move current root to end
        swap(&arr[0], &arr[i]);

        // Call max heapify on reduced heap
        heapify(arr, i, 0);
    }
}

// Utility function to print an array
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\n");
}

int main() {
    // Test case 1: Normal array
    int arr1[] = {12, 11, 13, 5, 6, 7};
    int n1 = sizeof(arr1) / sizeof(arr1[0]);
    printf("Original array:\n");
    printArray(arr1, n1);
    heapSort(arr1, n1);
    printf("Sorted array:\n");
    printArray(arr1, n1);

    // Test case 2: Single element
    int arr2[] = {42};
    printf("\nSingle element array:\n");
    printArray(arr2, 1);
    heapSort(arr2, 1);
    printf("After sorting:\n");
    printArray(arr2, 1);

    // Test case 3: Empty array
    int arr3[] = {};
    printf("\nEmpty array:\n");
    printArray(arr3, 0);
    heapSort(arr3, 0);
    printf("After sorting:\n");
    printArray(arr3, 0);

    return 0;
}

/*
📌 Time Complexity:
- Building max heap: O(n)
- Heap sort: O(n log n)
  (Each of n elements is extracted with log n heapify steps)

📌 Space Complexity:
- O(1) auxiliary space (in-place sorting)

📌 Notes:
- Heap sort is **not stable**
- Efficient for large datasets
- Worst-case performance is better than Quick Sort

📌 Edge Cases Handled:
- Empty array
- Single-element array
- Already sorted array
*/
