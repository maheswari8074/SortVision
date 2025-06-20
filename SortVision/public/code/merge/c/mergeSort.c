#include <stdio.h>
#include <stdlib.h>

// Utility function to merge two sorted subarrays
// First subarray is arr[left..mid]
// Second subarray is arr[mid+1..right]
void merge(int arr[], int left, int mid, int right) {
    int i, j, k;
    int n1 = mid - left + 1;
    int n2 = right - mid;

    // Create temporary arrays
    int* L = (int*)malloc(n1 * sizeof(int));
    int* R = (int*)malloc(n2 * sizeof(int));

    if (L == NULL || R == NULL) {
        printf("Memory allocation failed.\n");
        return;
    }

    // Copy data to temp arrays L[] and R[]
    for (i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];

    // Merge the temporary arrays back into arr[left..right]
    i = 0; // Initial index of first subarray
    j = 0; // Initial index of second subarray
    k = left; // Initial index of merged subarray
    while (i < n1 && j < n2) {
        if (L[i] <= R[j])
            arr[k++] = L[i++];
        else
            arr[k++] = R[j++];
    }

    // Copy remaining elements of L[], if any
    while (i < n1)
        arr[k++] = L[i++];

    // Copy remaining elements of R[], if any
    while (j < n2)
        arr[k++] = R[j++];

    // Free dynamically allocated memory
    free(L);
    free(R);
}

// Recursive merge sort function
void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;

        // Sort first and second halves
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);

        // Merge sorted halves
        merge(arr, left, mid, right);
    }
}

// Utility function to print the array
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\n");
}

// Main function with test cases
int main() {
    // Test case 1: Normal array
    int arr1[] = {12, 11, 13, 5, 6, 7};
    int n1 = sizeof(arr1) / sizeof(arr1[0]);
    printf("Original array: ");
    printArray(arr1, n1);
    mergeSort(arr1, 0, n1 - 1);
    printf("Sorted array:   ");
    printArray(arr1, n1);

    // Test case 2: Single element
    int arr2[] = {42};
    int n2 = sizeof(arr2) / sizeof(arr2[0]);
    printf("\nSingle-element array: ");
    printArray(arr2, n2);
    mergeSort(arr2, 0, n2 - 1);
    printf("Sorted:               ");
    printArray(arr2, n2);

    // Test case 3: Empty array
    int arr3[] = {};
    int n3 = sizeof(arr3) / sizeof(arr3[0]);
    printf("\nEmpty array: ");
    printArray(arr3, n3);
    mergeSort(arr3, 0, n3 - 1);
    printf("Sorted:      ");
    printArray(arr3, n3);

    return 0;
}
