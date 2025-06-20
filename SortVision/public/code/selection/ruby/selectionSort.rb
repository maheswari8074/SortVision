# selectionSort.rb
# 📚 Selection Sort Implementation in Ruby
# Time Complexity: O(n^2)
# Space Complexity: O(1)

# Function to find the index of the minimum element in a subarray
#
# @param arr [Array<Integer>] the array to search
# @param start_idx [Integer] the starting index of the subarray
# @param end_idx [Integer] the ending index of the subarray
# @return [Integer] the index of the minimum element
def find_min_index(arr, start_idx, end_idx)
  min_idx = start_idx
  (start_idx + 1).upto(end_idx) do |i|
    min_idx = i if arr[i] < arr[min_idx]
  end
  min_idx
end

# Function to perform selection sort on an array
#
# @param arr [Array<Integer>] the array to sort
# @return [Array<Integer>] the sorted array
def selection_sort(arr)
  n = arr.length
  (0...n).each do |i|
    min_idx = find_min_index(arr, i, n - 1)
    arr[i], arr[min_idx] = arr[min_idx], arr[i] unless i == min_idx
  end
  arr
end

# 🔍 Example usage:
if __FILE__ == $0
  # Example arrays
  test_cases = {
    "Empty array" => [],
    "Single element" => [5],
    "Already sorted" => [1, 2, 3, 4, 5],
    "Reverse sorted" => [5, 4, 3, 2, 1],
    "Unsorted" => [64, 25, 12, 22, 11]
  }

  test_cases.each do |description, arr|
    puts "🔸 #{description}:"
    sorted = selection_sort(arr.dup)
    puts "   Original: #{arr}"
    puts "   Sorted:   #{sorted}"
    puts
  end
end

=begin
📝 Notes:
- This is a simple and intuitive algorithm ideal for learning.
- Not suitable for large datasets due to O(n²) complexity.
- Stable sort: ❌ No (can be made stable with extra space)
- In-place sort: ✅ Yes
=end
