<?php
// Selection Sort Algorithm in PHP
//
// Selection Sort is a simple comparison-based sorting algorithm.
// It divides the array into a sorted and an unsorted region, and repeatedly selects
// the smallest (or largest) element from the unsorted region and moves it to the end of the sorted region.
// Time Complexity: O(n^2)
// Space Complexity: O(1) (in-place)

// Finds the index of the minimum element in the subarray from $start to $end
function findMinIndex($arr, $start, $end) {
    $minIndex = $start; // Assume the first element is the minimum
    for ($i = $start + 1; $i <= $end; $i++) {
        // Compare current element with current minimum
        if ($arr[$i] < $arr[$minIndex]) {
            $minIndex = $i; // Update minIndex if a smaller element is found
        }
    }
    return $minIndex; // Return the index of the minimum element
}

// Sorts the array in place using selection sort
function selectionSort(&$arr) {
    $n = count($arr); // Get the number of elements in the array
    for ($i = 0; $i < $n - 1; $i++) {
        // Find the index of the minimum element in the unsorted part
        $minIndex = findMinIndex($arr, $i, $n - 1);
        // Swap the found minimum element with the first element of the unsorted part
        if ($minIndex != $i) {
            $temp = $arr[$i];
            $arr[$i] = $arr[$minIndex];
            $arr[$minIndex] = $temp;
        }
    }
}

// -------------------
// Test Cases
// -------------------

// Test 1: Basic integer array
$arr1 = [64, 25, 12, 22, 11];
selectionSort($arr1);
echo "Sorted array 1: ";
print_r($arr1);

// Test 2: Array with negative numbers
$arr2 = [3, -1, 0, -7, 5, 2];
selectionSort($arr2);
echo "Sorted array 2: ";
print_r($arr2);

// Test 3: Already sorted array
$arr3 = [1, 2, 3, 4, 5];
selectionSort($arr3);
echo "Sorted array 3: ";
print_r($arr3);

// Test 4: Array with duplicates
$arr4 = [4, 2, 2, 8, 3, 3, 1];
selectionSort($arr4);
echo "Sorted array 4: ";
print_r($arr4);

// Test 5: Single element array
$arr5 = [42];
selectionSort($arr5);
echo "Sorted array 5: ";
print_r($arr5);

// Test 6: Empty array
$arr6 = [];
selectionSort($arr6);
echo "Sorted array 6: ";
print_r($arr6);
?>
