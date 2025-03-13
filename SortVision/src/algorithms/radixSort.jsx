export const radixSort = async (array, visualizeArray, delay, setCurrentBar, shouldStopRef) => {
    let max = Math.max(...array);
    let exp = 1;
    let swaps = 0;
    let comparisons = 0;
  
    while (Math.floor(max / exp) > 0) {
      const { swaps: radixSwaps, comparisons: radixComparisons } = await countingSort(array, exp, visualizeArray, delay, setCurrentBar, shouldStopRef);
      swaps += radixSwaps;
      comparisons += radixComparisons;
      exp *= 10;
  
      if (shouldStopRef.current) break;  // Stop if shouldStopRef is true
    }
  
    return { swaps, comparisons };
  };
  
  async function countingSort(arr, exp, visualizeArray, delay, setCurrentBar, shouldStopRef) {
    let output = new Array(arr.length);
    let count = new Array(10).fill(0);
    let comparisons = 0;
    let swaps = 0;
  
    // Count occurrences
    for (let i = 0; i < arr.length; i++) {
      comparisons++;
      setCurrentBar({ compare: i, swap: null });
      count[Math.floor(arr[i] / exp) % 10]++;
      visualizeArray(arr);
      await new Promise(resolve => setTimeout(resolve, delay));
  
      if (shouldStopRef.current) return { swaps, comparisons };
    }
  
    // Calculate cumulative count
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
  
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
      const position = count[Math.floor(arr[i] / exp) % 10] - 1;
      output[position] = arr[i];
      count[Math.floor(arr[i] / exp) % 10]--;
      swaps++;
      setCurrentBar({ compare: null, swap: i });  // Show swap operation
      visualizeArray(output);  // Update the visualization
      await new Promise(resolve => setTimeout(resolve, delay));
  
      if (shouldStopRef.current) return { swaps, comparisons };
    }
  
    // Copy back to original array
    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
      setCurrentBar({ compare: null, swap: i });  // Show final placement
      visualizeArray(arr);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  
    return { swaps, comparisons };
  }