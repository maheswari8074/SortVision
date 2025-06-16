def bubble_sort(arr):
    n = len(arr)
    # Traverse through all elements in the array
    for i in range(n):
        # Last i elements are already in place, no need to compare them again
        for j in range(0, n - i - 1):
            # Swap if the element found is greater than the next one
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

# Example usage
data = [64, 34, 25, 12, 22, 11, 90]
print("Unsorted array:", data)

bubble_sort(data)

print("Sorted array:  ", data)