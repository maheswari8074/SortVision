/// Quick Sort Implementation in Rust
///
/// # Overview
/// This module implements the Quick Sort algorithm with a recursive approach
/// using the **last element** as the pivot.
///
/// # Time Complexity:
/// - Best & Average: O(n log n)
/// - Worst: O(n²)
///
/// # Space Complexity:
/// - O(log n) due to recursion stack

/// Partition function: places pivot at correct position
fn partition(arr: &mut Vec<i32>, low: usize, high: usize) -> usize {
    let pivot = arr[high];
    let mut i = low;

    for j in low..high {
        if arr[j] < pivot {
            arr.swap(i, j);
            i += 1;
        }
    }

    arr.swap(i, high);
    i
}

/// Recursive quick sort implementation
fn quick_sort(arr: &mut Vec<i32>, low: usize, high: usize) {
    if low < high {
        let pi = partition(arr, low, high);
        if pi > 0 {
            quick_sort(arr, low, pi - 1);
        }
        quick_sort(arr, pi + 1, high);
    }
}

/// Public wrapper function to sort a vector using Quick Sort
pub fn sort(arr: &mut Vec<i32>) {
    if !arr.is_empty() {
        quick_sort(arr, 0, arr.len() - 1);
    }
}

/// Unit tests to verify correctness
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_empty() {
        let mut arr: Vec<i32> = vec![];
        sort(&mut arr);
        assert_eq!(arr, vec![]);
    }

    #[test]
    fn test_single_element() {
        let mut arr = vec![42];
        sort(&mut arr);
        assert_eq!(arr, vec![42]);
    }

    #[test]
    fn test_already_sorted() {
        let mut arr = vec![1, 2, 3, 4, 5];
        sort(&mut arr);
        assert_eq!(arr, vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_reverse_sorted() {
        let mut arr = vec![5, 4, 3, 2, 1];
        sort(&mut arr);
        assert_eq!(arr, vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_duplicates() {
        let mut arr = vec![3, 1, 2, 3, 1];
        sort(&mut arr);
        assert_eq!(arr, vec![1, 1, 2, 3, 3]);
    }

    #[test]
    fn test_large_random() {
        let mut arr = vec![10, -5, 2, 0, 3, 7, -2, 8];
        sort(&mut arr);
        assert_eq!(arr, vec![-5, -2, 0, 2, 3, 7, 8, 10]);
    }
}

/// Demo function
fn main() {
    let mut demo = vec![10, 7, 8, 9, 1, 5];
    println!("Original: {:?}", demo);
    sort(&mut demo);
    println!("Sorted:   {:?}", demo);
}
