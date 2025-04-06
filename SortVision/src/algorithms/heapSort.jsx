/**
 * Heap Sort Algorithm
 * 
 * Time Complexity:
 * - Best Case: O(n log n)
 * - Average Case: O(n log n)
 * - Worst Case: O(n log n)
 * 
 * Space Complexity: O(1) - in-place sorting
 * 
 * Description:
 * Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure.
 * It first builds a max heap from the input data, then repeatedly extracts the maximum element
 * from the heap and rebuilds the heap with the remaining elements.
 */
export const heapSort = async (array, visualizeArray, delay, setCurrentBar, shouldStopRef) => {
    let comparisons = 0;
    let swaps = 0;

    // Build max heap
    const buildMaxHeap = async (arr, n) => {
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await heapify(arr, n, i);
        }
    };

    // Heapify a subtree rooted with node i
    const heapify = async (arr, n, i) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (shouldStopRef.current) return;

        // Compare with left child
        if (left < n) {
            setCurrentBar({ compare: left, swap: largest });
            visualizeArray(arr);
            await new Promise(resolve => setTimeout(resolve, delay));
            comparisons++;
            if (arr[left] > arr[largest]) {
                largest = left;
            }
        }

        // Compare with right child
        if (right < n) {
            setCurrentBar({ compare: right, swap: largest });
            visualizeArray(arr);
            await new Promise(resolve => setTimeout(resolve, delay));
            comparisons++;
            if (arr[right] > arr[largest]) {
                largest = right;
            }
        }

        // If largest is not root
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap
            swaps++;
            setCurrentBar({ compare: null, swap: i });
            visualizeArray(arr);
            await new Promise(resolve => setTimeout(resolve, delay));

            // Recursively heapify the affected sub-tree
            await heapify(arr, n, largest);
        }
    };

    const n = array.length;

    // Build max heap
    await buildMaxHeap(array, n);

    // One by one extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        if (shouldStopRef.current) break;

        // Move current root to end
        [array[0], array[i]] = [array[i], array[0]];
        swaps++;
        setCurrentBar({ compare: null, swap: i });
        visualizeArray(array);
        await new Promise(resolve => setTimeout(resolve, delay));

        // Call max heapify on the reduced heap
        await heapify(array, i, 0);
    }

    return { swaps, comparisons };
}; 