// RadixSort.swift
// Implementation of Radix Sort in Swift

import Foundation

class RadixSort {
    // Public method to perform radix sort
    static func sort(_ arr: inout [Int]) {
        guard arr.count > 1 else { return } // Handle edge cases for empty or single-element arrays

        let maxElement = getMax(arr)
        var exp = 1 // Start with the least significant digit

        // Perform counting sort for each digit
        while maxElement / exp > 0 {
            countSort(&arr, exp: exp)
            exp *= 10
        }
    }

    // Helper function to find the maximum element
    private static func getMax(_ arr: [Int]) -> Int {
        return arr.max() ?? 0
    }

    // Counting sort for a specific digit represented by exp
    private static func countSort(_ arr: inout [Int], exp: Int) {
        let n = arr.count
        var output = [Int](repeating: 0, count: n)
        var count = [Int](repeating: 0, count: 10)

        // Count occurrences of each digit
        for num in arr {
            let digit = (num / exp) % 10
            count[digit] += 1
        }

        // Update count array to store cumulative positions
        for i in 1..<10 {
            count[i] += count[i - 1]
        }

        // Build the output array
        for i in stride(from: n - 1, through: 0, by: -1) {
            let digit = (arr[i] / exp) % 10
            output[count[digit] - 1] = arr[i]
            count[digit] -= 1
        }

        // Copy the output array back to the original array
        for i in 0..<n {
            arr[i] = output[i]
        }
    }
}

// Example usage
var numbers = [170, 45, 75, 90, 802, 24, 2, 66]
print("Before sorting: \(numbers)")
RadixSort.sort(&numbers)
print("After sorting: \(numbers)")

// Test cases
print("\nEdge Cases:")
var emptyArray: [Int] = []
RadixSort.sort(&emptyArray)
print("Empty array: \(emptyArray)")

var singleElement = [42]
RadixSort.sort(&singleElement)
print("Single element: \(singleElement)")

var negativeNumbers = [-5, -10, -1, -7]
RadixSort.sort(&negativeNumbers)
print("Negative numbers (not supported by radix sort): \(negativeNumbers)")
