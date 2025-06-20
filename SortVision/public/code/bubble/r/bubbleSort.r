# Bubble Sort in R
# ----------------
# Bubble Sort is a simple sorting algorithm that repeatedly steps through the list,
# compares adjacent elements, and swaps them if they are in the wrong order.
# This process is repeated until the list is sorted.

bubble_sort <- function(arr) {
  # Get the length of the array
  n <- length(arr)
  # Outer loop for each pass
  for (i in 1:(n-1)) {
    # Inner loop for comparing adjacent elements
    for (j in 1:(n-i)) {
      # If the current element is greater than the next, swap them
      if (arr[j] > arr[j+1]) {
        temp <- arr[j]        # Store current element in temp
        arr[j] <- arr[j+1]    # Move next element to current position
        arr[j+1] <- temp      # Move temp to next position
      }
    }
  }
  # Return the sorted array
  return(arr)
}

# ----------------------
# Test Cases for Bubble Sort
# ----------------------

# Test 1: Unsorted array
arr1 <- c(5, 2, 9, 1, 5, 6)
cat('Test 1 - Input:', arr1, '\n')
cat('Test 1 - Sorted:', bubble_sort(arr1), '\n\n')

# Test 2: Already sorted array
arr2 <- c(1, 2, 3, 4, 5)
cat('Test 2 - Input:', arr2, '\n')
cat('Test 2 - Sorted:', bubble_sort(arr2), '\n\n')

# Test 3: Array with negative numbers
arr3 <- c(-3, 0, 2, -8, 1)
cat('Test 3 - Input:', arr3, '\n')
cat('Test 3 - Sorted:', bubble_sort(arr3), '\n\n')

# Test 4: Array with all equal elements
arr4 <- c(7, 7, 7, 7)
cat('Test 4 - Input:', arr4, '\n')
cat('Test 4 - Sorted:', bubble_sort(arr4), '\n\n')
