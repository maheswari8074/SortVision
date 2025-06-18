// Bucket Sort Implementation in Dart
// Time Complexity: O(n + k) where n = number of elements, k = number of buckets
// Space Complexity: O(n + k)

class BucketSort {
  static void sort(List<int> arr, {int bucketFactor = 5}) {
    if (arr.length <= 1) return;

    int minValue = arr.reduce((a, b) => a < b ? a : b);
    int maxValue = arr.reduce((a, b) => a > b ? a : b);

    int bucketCount = ((maxValue - minValue + 1) / bucketFactor).ceil();
    List<List<int>> buckets = List.generate(bucketCount, (_) => []);

    double range = (maxValue - minValue + 1) / bucketCount;

    for (int num in arr) {
      int index = ((num - minValue) / range).floor();
      index = index.clamp(0, bucketCount - 1);
      buckets[index].add(num);
    }

    arr.clear();
    for (List<int> bucket in buckets) {
      bucket.sort(); // You could use a custom sort algorithm here
      arr.addAll(bucket);
    }
  }
}

// Example usage
void main() {
  List<int> arr1 = [29, 25, 3, 49, 9, 37, 21, 43];
  print("Original: $arr1");
  BucketSort.sort(arr1);
  print("Sorted:   $arr1");

  // Run tests
  runTests();
}

// ✅ Test Cases
void runTests() {
  List<int> test1 = [5, 1, 9, 3, 7];
  BucketSort.sort(test1);
  assert(test1.toString() == [1, 3, 5, 7, 9].toString());

  List<int> test2 = [];
  BucketSort.sort(test2);
  assert(test2.isEmpty);

  List<int> test3 = [10];
  BucketSort.sort(test3);
  assert(test3.toString() == [10].toString());

  List<int> test4 = [1, 2, 3, 4, 5];
  BucketSort.sort(test4);
  assert(test4.toString() == [1, 2, 3, 4, 5].toString());

  print("✅ All test cases passed!");
}
