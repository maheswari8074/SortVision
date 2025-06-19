// SelectionSort.swift
// Implementation of Selection Sort in Swift

import Foundation

class SelectionSort {
    // Public method to perform selection sort
    static func sort(_ arr: inout [Int]) {
        let n = arr.count
        guard n > 1 else { return } // Handle edge cases for empty or single-element arrays

        for i in 0..<n - 1 {
            // Find the minimum element in the unsorted part
            var minIndex = i
            for j in i + 1..<n {
                if arr[j] < arr[minIndex] {
                    minIndex = j
                }
            }

            // Swap the minimum element with the first element of the unsorted part
            if i != minIndex {
                arr.swapAt(i, minIndex)
            }
        }
    }
}

// Example usage
var numbers = [64, 25, 12, 22, 11]
print("Before sorting: \(numbers)")
SelectionSort.sort(&numbers)
print("After sorting: \(numbers)")

// Test cases
print("\nEdge Cases:")
var emptyArray: [Int] = []
SelectionSort.sort(&emptyArray)
print("Empty array: \(emptyArray)")

var singleElement = [42]
SelectionSort.sort(&singleElement)
print("Single element: \(singleElement)")

var alreadySorted = [1, 2, 3, 4, 5]
SelectionSort.sort(&alreadySorted)
print("Already sorted: \(alreadySorted)")

var reverseSorted = [5, 4, 3, 2, 1]
SelectionSort.sort(&reverseSorted)
print("Reverse sorted: \(reverseSorted)")

var duplicates = [3, 3, 1, 2, 1]
SelectionSort.sort(&duplicates)
print("Duplicates: \(duplicates)")
