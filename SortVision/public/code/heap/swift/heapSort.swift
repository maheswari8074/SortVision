/*
Heap Sort Algorithm in Swift

Time Complexity:
- Worst Case: O(n log n)
- Average Case: O(n log n)
- Best Case: O(n log n)

Space Complexity: O(1) (in-place)

Features:
- Builds a max-heap from the array
- Repeatedly swaps max to end, shrinks heap
- Handles edge cases (empty array, single element, duplicates)
*/

import Foundation

class HeapSort {
    // Public method to sort an array using heap sort
    static func sort(_ arr: inout [Int]) {
        let n = arr.count
        buildMaxHeap(&arr, n)

        for i in stride(from: n - 1, through: 1, by: -1) {
            arr.swapAt(0, i)
            heapify(&arr, i, 0)
        }
    }

    // Builds a max heap from the array
    private static func buildMaxHeap(_ arr: inout [Int], _ n: Int) {
        for i in stride(from: n / 2 - 1, through: 0, by: -1) {
            heapify(&arr, n, i)
        }
    }

    // Ensures the subtree rooted at index `i` is a max heap
    private static func heapify(_ arr: inout [Int], _ n: Int, _ i: Int) {
        var largest = i
        let left = 2 * i + 1
        let right = 2 * i + 2

        if left < n && arr[left] > arr[largest] {
            largest = left
        }

        if right < n && arr[right] > arr[largest] {
            largest = right
        }

        if largest != i {
            arr.swapAt(i, largest)
            heapify(&arr, n, largest)
        }
    }
}


func testHeapSort() {
    var test1: [Int] = []
    var test2: [Int] = [42]
    var test3: [Int] = [5, 3, 8, 4, 1]
    var test4: [Int] = [7, 2, 2, 9, 5]

    HeapSort.sort(&test1)
    HeapSort.sort(&test2)
    HeapSort.sort(&test3)
    HeapSort.sort(&test4)

    assert(test1 == [])
    assert(test2 == [42])
    assert(test3 == [1, 3, 4, 5, 8])
    assert(test4 == [2, 2, 5, 7, 9])

    print("All tests passed!")
}

testHeapSort()
