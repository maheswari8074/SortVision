/**
 * Quick Sort Algorithm
 * 
 * Time Complexity:
 * - Best Case: O(n log n)
 * - Average Case: O(n log n)
 * - Worst Case: O(n²) - when array is already sorted or reverse sorted
 * 
 * Space Complexity: O(log n) - due to recursion stack
 * 
 * Description:
 * Quick Sort is a divide-and-conquer algorithm that works by selecting a 'pivot'
 * element from the array and partitioning the other elements into two sub-arrays
 * according to whether they are less than or greater than the pivot. The sub-arrays
 * are then sorted recursively. This implementation uses the last element as the pivot.
 * 
 */
export const quickSort = async (array, visualizeArray, delay, setCurrentBar, shouldStopRef) => {
    const quickSortHelper = async (arr, left, right) => {
      if (left >= right) return;
      let pivotIndex = await partition(arr, left, right);
      await quickSortHelper(arr, left, pivotIndex - 1);
      await quickSortHelper(arr, pivotIndex + 1, right);
    };
  
    const partition = async (arr, left, right) => {
      let pivot = arr[right];
      let i = left - 1;
      for (let j = left; j < right; j++) {
        setCurrentBar({ compare: j, swap: null });
        visualizeArray(arr);
        await new Promise(resolve => setTimeout(resolve, delay));
  
        if (shouldStopRef.current) return i + 1;  // Stop if shouldStopRef is true
  
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];  // Swap
          setCurrentBar({ compare: null, swap: i });
          visualizeArray(arr);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
      [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];  // Swap pivot
      setCurrentBar({ compare: null, swap: i + 1 });
      visualizeArray(arr);
      return i + 1;
    };
  
    await quickSortHelper(array, 0, array.length - 1);
    return { swaps: 0, comparisons: 0 };  // Quick sort is hard to track comparisons/swaps easily
  };