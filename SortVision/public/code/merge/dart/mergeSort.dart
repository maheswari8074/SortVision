/// MergeSort implementation in Dart


class MergeSort {
  /// Entry point for sorting
  static void sort(List<int> arr) {
    if (arr.isEmpty || arr.length == 1) return; // Edge case: already sorted
    mergeSort(arr, 0, arr.length - 1);
  }

  /// Recursive merge sort implementation
  static void mergeSort(List<int> arr, int left, int right) {
    if (left < right) {
      int middle = left + ((right - left) ~/ 2);

      // Recursively sort both halves
      mergeSort(arr, left, middle);
      mergeSort(arr, middle + 1, right);

      // Merge the sorted halves
      merge(arr, left, middle, right);
    }
  }

  /// Merges two sorted subarrays of arr[]
  /// First subarray is arr[left..middle]
  /// Second subarray is arr[middle+1..right]
  static void merge(List<int> arr, int left, int middle, int right) {
    int n1 = middle - left + 1;
    int n2 = right - middle;

    List<int> leftArray = List.filled(n1, 0);
    List<int> rightArray = List.filled(n2, 0);

    for (int i = 0; i < n1; i++) {
      leftArray[i] = arr[left + i];
    }

    for (int j = 0; j < n2; j++) {
      rightArray[j] = arr[middle + 1 + j];
    }

    int i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
      if (leftArray[i] <= rightArray[j]) {
        arr[k++] = leftArray[i++];
      } else {
        arr[k++] = rightArray[j++];
      }
    }

    while (i < n1) {
      arr[k++] = leftArray[i++];
    }

    while (j < n2) {
      arr[k++] = rightArray[j++];
    }
  }
}

/// Example usage
void main() {
  List<int> input = [38, 27, 43, 3, 9, 82, 10];
  print("Original: $input");

  MergeSort.sort(input);

  print("Sorted: $input");
}
