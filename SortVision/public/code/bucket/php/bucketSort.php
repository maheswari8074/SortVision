<?php
/**
 * Bucket Sort Implementation in PHP
 *
 * Bucket Sort is a sorting algorithm that distributes elements into several buckets.
 * Each bucket is then sorted individually, either using a different sorting algorithm or recursively applying the bucket sort.
 * Finally, the sorted buckets are concatenated to form the final sorted array.
 *
 * This implementation uses insertion sort to sort individual buckets.
 *
 * Time Complexity: O(n + k), where n is the number of elements and k is the number of buckets (best/average case).
 * Space Complexity: O(n + k)
 *
 * Suitable for uniformly distributed data.
 */

function bucketSort(&$arr, $bucketCount = 10) {
    $n = count($arr);
    if ($n <= 1) return;

    // Find minimum and maximum values in the array
    $min = min($arr);
    $max = max($arr);

    // Edge case: all elements are the same
    if ($min === $max) return;

    // Calculate the interval for each bucket
    $interval = ($max - $min + 1) / $bucketCount;

    // Create empty buckets
    $buckets = array_fill(0, $bucketCount, []);

    // Distribute array elements into buckets
    foreach ($arr as $value) {
        $index = (int)(($value - $min) / $interval);
        if ($index === $bucketCount) $index--; // Edge case for max value
        $buckets[$index][] = $value;
    }

    // Sort individual buckets and concatenate
    $arr = [];
    foreach ($buckets as $bucket) {
        if (!empty($bucket)) {
            insertionSort($bucket);
            $arr = array_merge($arr, $bucket);
        }
    }
}

function insertionSort(&$bucket) {
    $n = count($bucket);
    for ($i = 1; $i < $n; $i++) {
        $key = $bucket[$i];
        $j = $i - 1;
        // Move elements of bucket[0..i-1] that are greater than key
        while ($j >= 0 && $bucket[$j] > $key) {
            $bucket[$j + 1] = $bucket[$j];
            $j--;
        }
        $bucket[$j + 1] = $key;
    }
}

// ----------------------
// Test Cases for Bucket Sort
// ----------------------

function printArray($arr) {
    echo '[' . implode(', ', $arr) . "]\n";
}

// Test 1: Basic test
$arr1 = [0.42, 4.21, 3.14, 2.71, 1.61, 0.99, 2.18, 3.33, 4.99, 1.01];
bucketSort($arr1, 5);
echo "Sorted array 1: ";
printArray($arr1);

// Test 2: Integers
$arr2 = [29, 25, 3, 49, 9, 37, 21, 43];
bucketSort($arr2, 4);
echo "Sorted array 2: ";
printArray($arr2);

// Test 3: Already sorted
$arr3 = [1, 2, 3, 4, 5];
bucketSort($arr3);
echo "Sorted array 3: ";
printArray($arr3);

// Test 4: All elements the same
$arr4 = [7, 7, 7, 7, 7];
bucketSort($arr4);
echo "Sorted array 4: ";
printArray($arr4);

// Test 5: Negative numbers
$arr5 = [-5, -10, 0, 5, 10];
bucketSort($arr5, 5);
echo "Sorted array 5: ";
printArray($arr5);

/*
Explanation:
- The bucketSort function distributes elements into buckets based on their value range.
- Each bucket is sorted using insertionSort, which is efficient for small arrays.
- The sorted buckets are merged to form the final sorted array.
- Test cases cover floats, integers, already sorted arrays, identical elements, and negative numbers.
*/
?>
