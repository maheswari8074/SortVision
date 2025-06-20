/**
 * quickSort.cpp
 *
 * Implementation of the Quick Sort algorithm in C++.
 *
 * This file includes:
 *  - partition: Lomuto partition scheme (with comments on alternate strategies)
 *  - quickSort: recursive sorting function with tail-call optimization
 *  - Input validation and edge-case handling
 *  - Time and space complexity analysis
 *  - Example usage and test cases in main()
 *  - Performance optimization notes
 */

#include <iostream>
#include <algorithm>
#include <cassert>
#include <vector>
#include <random>

/**
 * Partition the array using Lomuto's scheme.
 * Places pivot at correct sorted position and ensures
 * elements < pivot are left, > pivot are right.
 *
 * @param arr  Array to partition
 * @param low  Starting index
 * @param high Ending index (pivot index)
 * @return Index of pivot after partition
 */
int partition(int arr[], int low, int high) {
    if (low >= high) return low; // or throw, but safe default
    // Median-of-three pivot selection to avoid worst-case O(n^2)
    int mid = low + (high - low) / 2;
    if (arr[low] > arr[mid]) std::swap(arr[low], arr[mid]);
    if (arr[low] > arr[high]) std::swap(arr[low], arr[high]);
    if (arr[mid] > arr[high]) std::swap(arr[mid], arr[high]);
    std::swap(arr[mid], arr[high]); // Place median at end as pivot
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; ++j) {
        if (arr[j] <= pivot) {
            ++i;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

/**
 * Recursively sorts the array using Quick Sort.
 * Implements tail-call optimization by sorting smaller partition first.
 *
 * @param arr  Array to sort
 * @param low  Starting index
 * @param high Ending index
 */
void quickSort(int arr[], int low, int high) {
    while (low < high) {
        int pivotIndex = partition(arr, low, high);
        // Recurse into smaller partition first to limit stack depth
        if (pivotIndex - low < high - pivotIndex) {
            quickSort(arr, low, pivotIndex - 1);
            low = pivotIndex + 1;
        } else {
            quickSort(arr, pivotIndex + 1, high);
            high = pivotIndex - 1;
        }
    }
}

/**
 * Wrapper for quickSort with validation.
 *
 * @param arr Vector of integers to sort
 */
void quickSort(std::vector<int>& vec) {
    if (vec.empty()) return; // handle empty array
    quickSort(vec.data(), 0, static_cast<int>(vec.size()) - 1);
}

/**
 * Prints an array or vector to stdout.
 */
void printArray(const int arr[], int n) {
    std::cout << '[';
    for (int i = 0; i < n; ++i) {
        std::cout << arr[i] << (i + 1 < n ? ", " : "");
    }
    std::cout << "]\n";
}

void printVector(const std::vector<int>& vec) {
    printArray(vec.data(), static_cast<int>(vec.size()));
}

int main() {
    // Example usage and test cases
    std::vector<std::vector<int>> testCases = {
        {},                    // empty
        {1},                   // single
        {1,2,3,4,5},           // sorted
        {5,4,3,2,1},           // reverse
        {3,3,3,3},             // duplicates
        {2,5,1,9,6,7,3,8,4,0}  // random
    };

    for (auto& tc : testCases) {
        std::vector<int> vc = tc;
        std::cout << "Original: "; printVector(vc);
        quickSort(vc);
        std::cout << "Sorted:   "; printVector(vc);
        // Verify sorted
        for (size_t i = 1; i < vc.size(); ++i) {
            assert(vc[i-1] <= vc[i]);
        }
        std::cout << std::string(30, '-') << '\n';
    }

    std::cout << "All test cases passed!" << std::endl;
    return 0;
}

/**
 * Time Complexity:
 *  - Average: O(n log n)
 *  - Worst: O(n^2) (already sorted or all equal, mitigated by pivot strategies)
 * Space Complexity:
 *  - O(log n) average stack depth (tail recursion optimization)
 *  - O(n) worst-case stack depth without optimization
 *
 * Performance Notes:
 *  - Use random or median-of-three pivot to minimize worst-case
 *  - Tail recursion elimination reduces stack usage
 *  - In-place sorting gives O(1) extra space
 */
