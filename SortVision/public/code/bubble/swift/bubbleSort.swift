// BubbleSort.swift
// Implementation of Bubble Sort in Swift

import Foundation

class BubbleSort {
    // Public method to perform bubble sort
    static func sort(_ arr: inout [Int]) {
        let n = arr.count
        guard n > 1 else { return } // Handle edge cases for empty or single-element arrays

        for i in 0..<n - 1 {
            var swapped = false
            for j in 0..<n - i - 1 {
                if arr[j] > arr[j + 1] {
                    arr.swapAt(j, j + 1)
                    swapped = true
                }
            }

            // If no elements were swapped in the inner loop, the array is sorted
            if !swapped { break }
        }
    }
}

// Example usage
var numbers = [64, 34, 25, 12, 22, 11, 90]
print("Before sorting: \(numbers)")
BubbleSort.sort(&numbers)
print("After sorting: \(numbers)")

// Test cases
print("\nEdge Cases:")
var emptyArray: [Int] = []
BubbleSort.sort(&emptyArray)
print("Empty array: \(emptyArray)")

var singleElement = [42]
BubbleSort.sort(&singleElement)
print("Single element: \(singleElement)")

var alreadySorted = [1, 2, 3, 4, 5]
BubbleSort.sort(&alreadySorted)
print("Already sorted: \(alreadySorted)")

var reverseSorted = [5, 4, 3, 2, 1]
BubbleSort.sort(&reverseSorted)
print("Reverse sorted: \(reverseSorted)")

var duplicates = [3, 3, 1, 2, 1]
BubbleSort.sort(&duplicates)
print("Duplicates: \(duplicates)")
