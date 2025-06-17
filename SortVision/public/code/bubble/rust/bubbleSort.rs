/// Bubble Sort Implementation in Rust
///
/// # Overview
/// Sorts a mutable slice of elements using the Bubble Sort algorithm.
/// It repeatedly steps through the list, compares adjacent elements,
/// and swaps them if they are in the wrong order.
///
/// Includes an optimization to stop early if no swaps occur in a pass.
///
/// # Time Complexity
/// - Worst/Average: O(n²)
/// - Best: O(n) when the array is already sorted
///
/// # Space Complexity
/// - O(1): In-place sorting, no additional memory used
///
/// # Arguments
/// * `arr` - Mutable slice of elements that implement the `Ord` trait
///
/// # Constraints
/// * Elements must implement the `Ord` trait
///
/// # Example
/// ```
/// let mut data = vec![5, 1, 4, 2, 8];
/// bubble_sort(&mut data);
/// assert_eq!(data, vec![1, 2, 4, 5, 8]);
/// ```

pub fn bubble_sort<T: Ord>(arr: &mut [T]) {
    let n = arr.len();
    if n <= 1 {
        return; // Already sorted
    }

    for i in 0..n {
        let mut swapped = false;
        for j in 0..n - 1 - i {
            if arr[j] > arr[j + 1] {
                arr.swap(j, j + 1);
                swapped = true;
            }
        }
        if !swapped {
            break; // Optimization: array is already sorted
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_empty() {
        let mut arr: Vec<i32> = vec![];
        bubble_sort(&mut arr);
        assert_eq!(arr, vec![]);
    }

    #[test]
    fn test_single() {
        let mut arr = vec![42];
        bubble_sort(&mut arr);
        assert_eq!(arr, vec![42]);
    }

    #[test]
    fn test_sorted() {
        let mut arr = vec![1, 2, 3, 4, 5];
        bubble_sort(&mut arr);
        assert_eq!(arr, vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_reverse() {
        let mut arr = vec![5, 4, 3, 2, 1];
        bubble_sort(&mut arr);
        assert_eq!(arr, vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_duplicates() {
        let mut arr = vec![3, 1, 2, 3, 1];
        bubble_sort(&mut arr);
        assert_eq!(arr, vec![1, 1, 2, 3, 3]);
    }
}

/// Demonstrates usage of `bubble_sort` with printed output
fn main() {
    let mut data = vec![5, 1, 4, 2, 8];
    println!("Before sorting: {:?}", data);
    bubble_sort(&mut data);
    println!("After sorting:  {:?}", data);

    let mut test_cases = vec![
        vec![],
        vec![42],
        vec![5, 4, 3, 2, 1],
        vec![1, 3, 2, 4, 5],
        vec![2, 2, 2, 1, 1],
    ];

    for (i, case) in test_cases.iter_mut().enumerate() {
        bubble_sort(case);
        println!("Test {} → {:?}", i + 1, case);
    }
}
