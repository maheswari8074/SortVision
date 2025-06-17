/// Heap Sort Implementation in Rust
///
/// # Overview
/// Sorts a mutable slice in-place using the Heap Sort algorithm.
/// It builds a max-heap and repeatedly extracts the maximum element.
///
/// # Time Complexity
/// - Worst/Average/Best: O(n log n)
///
/// # Space Complexity
/// - O(1): In-place sorting
///
/// # Arguments
/// * `arr` - A mutable slice of elements that implement the `Ord` trait
///
/// # Constraints
/// * Elements must implement the `Ord` trait
///
/// # Example
/// ```
/// let mut arr = vec![4, 10, 3, 5, 1];
/// heap_sort(&mut arr);
/// assert_eq!(arr, vec![1, 3, 4, 5, 10]);
/// ```
pub fn heap_sort<T: Ord>(arr: &mut [T]) {
    let n = arr.len();

    // Step 1: Build a max heap
    for i in (0..n / 2).rev() {
        heapify(arr, n, i);
    }

    // Step 2: Extract elements from heap
    for i in (1..n).rev() {
        arr.swap(0, i);           // Move current root to end
        heapify(arr, i, 0);       // Heapify reduced heap
    }
}

/// Converts a subtree rooted at index `i` into a max heap.
///
/// # Arguments
/// * `arr` - The array to be heapified
/// * `n` - Size of the heap
/// * `i` - Index of the root of the subtree
///
/// # Notes
/// - This function assumes the binary trees rooted at the left and right child of `i` are already heaps.

pub fn heapify<T: Ord>(arr: &mut [T], n: usize, i: usize) {
    let mut largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if left < n && arr[left] > arr[largest] {
        largest = left;
    }

    if right < n && arr[right] > arr[largest] {
        largest = right;
    }

    if largest != i {
        arr.swap(i, largest);
        heapify(arr, n, largest);
    }
}

/// Demonstrates example usage of heap_sort
fn main() {
    let mut data = vec![4, 10, 3, 5, 1];
    println!("Before sorting: {:?}", data);
    heap_sort(&mut data);
    println!("After sorting:  {:?}", data);

    let mut test_cases = vec![
        vec![],
        vec![42],
        vec![9, 8, 7],
        vec![2, 1, 3, 5, 4],
        vec![5, 5, 5, 2, 2],
    ];

    for (i, case) in test_cases.iter_mut().enumerate() {
        heap_sort(case);
        println!("Test {} → {:?}", i + 1, case);
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_empty() {
        let mut arr: Vec<i32> = vec![];
        heap_sort(&mut arr);
        assert_eq!(arr, vec![]);
    }

    #[test]
    fn test_single() {
        let mut arr = vec![1];
        heap_sort(&mut arr);
        assert_eq!(arr, vec![1]);
    }

    #[test]
    fn test_sorted() {
        let mut arr = vec![1, 2, 3, 4, 5];
        heap_sort(&mut arr);
        assert_eq!(arr, vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_reverse() {
        let mut arr = vec![5, 4, 3, 2, 1];
        heap_sort(&mut arr);
        assert_eq!(arr, vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_duplicates() {
        let mut arr = vec![4, 1, 3, 1, 4];
        heap_sort(&mut arr);
        assert_eq!(arr, vec![1, 1, 3, 4, 4]);
    }
}
