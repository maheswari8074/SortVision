/// Bucket Sort Implementation in Rust
///
/// # Overview
/// This program implements Bucket Sort using floating point numbers (f64).
/// It assumes input is in a reasonably bounded range (e.g., [0, 1] or similar).
///
/// # Time Complexity
/// - Average: O(n + k)
/// - Worst: O(n^2) [if all values go into one bucket]
///
/// # Space Complexity
/// - O(n + k): for buckets and input array

/// Sorts the input array using bucket sort.
///
/// # Arguments
/// * `arr` - Mutable slice of f64 values
fn bucket_sort(arr: &mut [f64]) {
    let n = arr.len();
    if n <= 1 {
        return;
    }

    // Step 1: Find min and max values
    let min = arr.iter().cloned().fold(std::f64::INFINITY, f64::min);
    let max = arr.iter().cloned().fold(std::f64::NEG_INFINITY, f64::max);

    if (max - min).abs() < std::f64::EPSILON {
        return; // All values are the same
    }

    // Step 2: Create empty buckets
    let mut buckets: Vec<Vec<f64>> = vec![Vec::new(); n];

    // Step 3: Distribute elements into buckets
    for &value in arr.iter() {
        let index = ((value - min) / (max - min) * ((n - 1) as f64)).floor() as usize;
        buckets[index].push(value);
    }

    // Step 4: Sort individual buckets and concatenate
    let mut i = 0;
    for bucket in buckets.iter_mut() {
        bucket.sort_by(|a, b| a.partial_cmp(b).unwrap());
        for &val in bucket.iter() {
            arr[i] = val;
            i += 1;
        }
    }
}

/// Example usage and test cases
fn main() {
    let mut data = vec![0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51];
    println!("Before sorting: {:?}", data);
    bucket_sort(&mut data);
    println!("After sorting:  {:?}", data);

    let mut test_cases = vec![
        vec![],
        vec![0.5],
        vec![0.9, 0.8, 0.7],
        vec![0.1, 0.3, 0.2, 0.4, 0.5],
        vec![0.5, 0.5, 0.5],
    ];

    for (i, case) in test_cases.iter_mut().enumerate() {
        bucket_sort(case);
        println!("Test {} → {:?}", i + 1, case);
    }
}
