# Bucket Sort Algorithm in Ruby
#
# Bucket Sort is a sorting algorithm that distributes elements into several 'buckets'.
# Each bucket is then sorted individually, either using a different sorting algorithm or recursively applying the bucket sort.
# Finally, the sorted buckets are concatenated to form the final sorted array.
#
# This implementation uses insertion sort for sorting individual buckets.
#
# Time Complexity:
#   - Best/Average: O(n + k log k), where k is the number of elements per bucket
#   - Worst: O(n^2) if all elements land in one bucket
# Space Complexity: O(n + k)
#
# Suitable for uniformly distributed data.

# Sorts an array using the Bucket Sort algorithm.
def bucket_sort(arr, bucket_count = 10)
  return arr if arr.length <= 1

  # Find minimum and maximum values
  min_value = arr.min
  max_value = arr.max

  # Edge case: all elements are the same
  return arr.dup if min_value == max_value

  # Create buckets
  buckets = Array.new(bucket_count) { [] }

  # Distribute elements into buckets
  arr.each do |num|
    # Normalize the index to fit the bucket range
    idx = ((num - min_value) * (bucket_count - 1) / (max_value - min_value).to_f).floor
    buckets[idx] << num
  end

  # Sort each bucket and concatenate
  sorted_array = []
  buckets.each do |bucket|
    sorted_array.concat(insertion_sort(bucket))
  end
  sorted_array
end

# Helper function: Insertion Sort for sorting individual buckets
def insertion_sort(bucket)
  (1...bucket.length).each do |i|
    key = bucket[i]
    j = i - 1
    # Move elements greater than key to one position ahead
    while j >= 0 && bucket[j] > key
      bucket[j + 1] = bucket[j]
      j -= 1
    end
    bucket[j + 1] = key
  end
  bucket
end

# --- Test Cases ---
if __FILE__ == $0
  def test_bucket_sort(input, expected)
    result = bucket_sort(input)
    puts "Input:    #{input.inspect}"
    puts "Sorted:   #{result.inspect}"
    puts "Expected: #{expected.inspect}"
    puts result == expected ? '✅ Passed' : '❌ Failed'
    puts '-' * 40
  end

  # Test cases
  test_bucket_sort([], [])
  test_bucket_sort([1], [1])
  test_bucket_sort([2, 1], [1, 2])
  test_bucket_sort([5, 3, 8, 4, 2], [2, 3, 4, 5, 8])
  test_bucket_sort([10, 7, 8, 9, 1, 5], [1, 5, 7, 8, 9, 10])
  test_bucket_sort([3, 3, 3], [3, 3, 3])
  test_bucket_sort([0, -1, 5, -10, 8], [-10, -1, 0, 5, 8])
  test_bucket_sort([0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68], [0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94])
end
