# Merge Sort Implementation in Ruby
# This code implements the Merge Sort algorithm, which is a stable,
# comparison-based sorting algorithm. It is particularly efficient for
# large datasets and is often used in practice due to its predictable
# O(n log n) time complexity.

# Note: This implementation uses recursion and temporary arrays for merging.
# It is not an in-place sort, meaning it requires additional space proportional
# to the size of the input array.
# Merge Sort is a divide-and-conquer algorithm that recursively divides
# an array into two halves, sorts them independently, and then merges
# the sorted halves back together.
#
# Time Complexity: O(n log n) in all cases (best, average, worst)
# Space Complexity: O(n) due to the temporary arrays created during merging.
def merge_sort(array)
  # Base case: If the array has 0 or 1 element, it's already sorted.
  return array if array.length <= 1

  # Divide the array into two halves.
  mid = array.length / 2
  left_half = array[0...mid] # Elements from index 0 up to (but not including) mid
  right_half = array[mid...array.length] # Elements from mid up to the end

  # Recursively sort the two halves.
  sorted_left = merge_sort(left_half)
  sorted_right = merge_sort(right_half)

  # Merge the sorted halves.
  merge(sorted_left, sorted_right)
end

# Merges two sorted arrays into a single sorted array.
# This is the core operation of Merge Sort.
def merge(left, right)
  result = [] # Initialize an empty array to store the merged result
  left_index = 0
  right_index = 0

  # Compare elements from both arrays and add the smaller one to the result.
  while left_index < left.length && right_index < right.length
    if left[left_index] <= right[right_index]
      result << left[left_index]
      left_index += 1
    else
      result << right[right_index]
      right_index += 1
    end
  end

  # Add any remaining elements from the left array (if any).
  while left_index < left.length
    result << left[left_index]
    left_index += 1
  end

  # Add any remaining elements from the right array (if any).
  while right_index < right.length
    result << right[right_index]
    right_index += 1
  end

  # Return the merged and sorted array.
  result
end

# --- Example Usage ---

unsorted_array1 = [38, 27, 43, 3, 9, 82, 10]
puts "Original array: #{unsorted_array1}"
sorted_array1 = merge_sort(unsorted_array1.dup) # Use .dup to avoid modifying the original array
puts "Sorted array: #{sorted_array1}"

puts "--------------------"

unsorted_array2 = [5, 2, 8, 1, 9, 4]
puts "Original array: #{unsorted_array2}"
sorted_array2 = merge_sort(unsorted_array2.dup)
puts "Sorted array: #{sorted_array2}"

puts "--------------------"

unsorted_array3 = []
puts "Original array: #{unsorted_array3}"
sorted_array3 = merge_sort(unsorted_array3.dup)
puts "Sorted array: #{sorted_array3}"

puts "--------------------"

unsorted_array4 = [7]
puts "Original array: #{unsorted_array4}"
sorted_array4 = merge_sort(unsorted_array4.dup)
puts "Sorted array: #{sorted_array4}"

puts "--------------------"

unsorted_array5 = [1, 2, 3, 4, 5] # Already sorted
puts "Original array: #{unsorted_array5}"
sorted_array5 = merge_sort(unsorted_array5.dup)
puts "Sorted array: #{sorted_array5}"

puts "--------------------"

unsorted_array6 = [5, 4, 3, 2, 1] # Reverse sorted
puts "Original array: #{unsorted_array6}"
sorted_array6 = merge_sort(unsorted_array6.dup)
puts "Sorted array: #{sorted_array6}"