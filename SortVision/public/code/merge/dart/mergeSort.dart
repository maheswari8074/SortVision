/// MergeSort implementation in Dart
/// This class provides static methods to perform merge sort on a list of integers.

class MergeSort {
  /// Entry function to sort a list using merge sort
  static void sort(List<int> arr) {
    if (arr.isEmpty || arr.length == 1) return; // Already sorted
    mergeSort(arr, 0, arr.length - 1);
  }

  /// Recursive merge sort function
  static void mergeSort(List<int> arr, int left, int right) {
    if (left < right) {
      int middle = left + ((right - left) ~/ 2); // Avoids overflow

      // Recursively sort left and right halves
      mergeSort(arr, left, middle);
      mergeSort(arr, middle + 1, right);

      // Merge the sorted halves
      merge(arr, left, middle, right);
    }
  }

  /// Merges two sorted halves of the list
  static void merge(List<int> arr, int left, int middle, int right) {
    int n1 = middle - left + 1;
    int n2 = right - middle;

    // Create temporary arrays
    List<int> leftArray = List.filled(n1, 0);
    List<int> rightArray = List.filled(n2, 0);

    // Copy data to temp arrays
    for (int i = 0; i < n1; i++) {
      leftArray[i] = arr[left + i];
    }
    for (int j = 0; j < n2; j++) {
      rightArray[j] = arr[middle + 1 + j];
    }

    int i = 0, j = 0, k = left;

    // Merge the temp arrays back into the original list
    while (i < n1 && j < n2) {
      if (leftArray[i] <= rightArray[j]) {
        arr[k++] = leftArray[i++];
      } else {
        arr[k++] = rightArray[j++];
      }
    }

    // Copy any remaining elements
    while (i < n1) {
      arr[k++] = leftArray[i++];
    }

    while (j < n2) {
      arr[k++] = rightArray[j++];
    }
  }
}
