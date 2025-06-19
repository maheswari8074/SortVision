// 📚 Selection Sort Algorithm in Dart
// Sorts an integer list in ascending order using selection sort.

class SelectionSort {
  /// Sorts [arr] in-place using the selection sort algorithm.
  /// Throws [ArgumentError] if the list is null.
  static void sort(List<int> arr) {
    if (arr == null) throw ArgumentError("Input list cannot be null");

    int n = arr.length;

    for (int i = 0; i < n - 1; i++) {
      // Assume the current index has the minimum element
      int minIndex = i;

      for (int j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }

      // Swap only if needed
      if (minIndex != i) {
        int temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
      }
    }
  }
}
//Example Usage
void main() {
  List<int> values = [64, 25, 12, 22, 11];
  print("Before sort: $values");

  SelectionSort.sort(values);

  print("After sort: $values");
}
