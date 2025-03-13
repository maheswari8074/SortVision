export const selectionSort = async (array, visualizeArray, delay, setCurrentBar, shouldStopRef) => {
    let swaps = 0;
    let comparisons = 0;
    const length = array.length;
    for (let i = 0; i < length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < length; j++) {
        comparisons++;
        setCurrentBar({ compare: j, swap: null });
        visualizeArray(array);
        await new Promise(resolve => setTimeout(resolve, delay));
  
        if (shouldStopRef.current) return { swaps, comparisons };  // Stop if shouldStopRef is true
  
        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
      }
  
      if (minIdx !== i) {
        [array[i], array[minIdx]] = [array[minIdx], array[i]];  // Swap
        swaps++;
        setCurrentBar({ compare: null, swap: i });
        visualizeArray(array);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    return { swaps, comparisons };
  };