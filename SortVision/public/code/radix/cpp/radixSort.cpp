
// ===============================================================================
// 📝 Radix Sort Implementation in C++


#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

/**
 * @brief Get the maximum absolute value in the array
 * Used to determine the number of digits to process
 * 
 * @param arr Input array
 * @return int Maximum absolute value
 */
int getMax(const vector<int>& arr) {
    int maxVal = abs(arr[0]);
    for (int i = 1; i < arr.size(); ++i) {
        maxVal = max(maxVal, abs(arr[i]));
    }
    return maxVal;
}

/**
 * @brief Performs counting sort on the array based on the digit represented by exp
 * 
 * @param arr Input/output array to sort
 * @param exp Current digit exponent (1 for units, 10 for tens, etc.)
 * @param base Number system base (default is 10)
 */
void countSort(vector<int>& arr, int exp, int base) {
    vector<int> output(arr.size());
    vector<int> count(base, 0);

    // Count occurrences based on current digit
    for (int num : arr) {
        int index = (abs(num) / exp) % base;
        count[index]++;
    }

    // Convert count to cumulative count
    for (int i = 1; i < base; ++i)
        count[i] += count[i - 1];

    // Build the output array (stable sort)
    for (int i = arr.size() - 1; i >= 0; --i) {
        int index = (abs(arr[i]) / exp) % base;
        output[--count[index]] = arr[i];
    }

    // Copy output back to arr
    arr = output;
}

/**
 * @brief Main Radix Sort function
 * Sorts the array using Radix Sort with optional base
 * Handles both negative and positive integers
 * 
 * @param arr Input/output array to be sorted
 * @param base Base for the number system (default is 10)
 */
void radixSort(vector<int>& arr, int base = 10) {
    // Separate negative and positive numbers
    vector<int> negs, poss;
    for (int num : arr) {
        (num < 0 ? negs : poss).push_back(num);
    }

    // Sort positive numbers
    if (!poss.empty()) {
        int maxPos = getMax(poss);
        for (int exp = 1; maxPos / exp > 0; exp *= base)
            countSort(poss, exp, base);
    }

    // Sort negative numbers
    if (!negs.empty()) {
        for (int& num : negs) num = -num;  // Convert to positive
        int maxNeg = getMax(negs);
        for (int exp = 1; maxNeg / exp > 0; exp *= base)
            countSort(negs, exp, base);
        for (int& num : negs) num = -num;  // Restore negative sign
        reverse(negs.begin(), negs.end()); // Reverse for correct order
    }

    // Merge negatives and positives
    arr = negs;
    arr.insert(arr.end(), poss.begin(), poss.end());
}

/*
===============================================================================
🕒 Time Complexity Analysis:

Let:
- n = number of elements
- b = base (e.g., 10 for decimal)
- d = number of digits in the maximum number (≈ log_b(maxElement))

Per digit counting sort: O(n + b)
Total digits: log_b(max)

Overall Time Complexity:
O((n + b) * log_b(max))

For base 10:
O(n * k), where k is the number of digits in the largest number

💾 Space Complexity Analysis:

- Output array: O(n)
- Count array: O(b)

Overall Space: O(n + b)
===============================================================================
*/

/**
 * @brief Example usage with test cases
 */
int main() {
    vector<int> arr = {170, -45, 75, -90, 802, 24, 2, 66};

    cout << "Original array:\n";
    for (int num : arr) cout << num << " ";
    cout << "\n";

    radixSort(arr);  // Default base = 10

    cout << "\nSorted array (base 10):\n";
    for (int num : arr) cout << num << " ";
    cout << "\n";

    return 0;
}
