export const bubbleSort = async (array, visualizeArray, delay, setCurrentBar, shouldStopRef) => {
    let swaps = 0;
    let comparisons = 0;
    const length = array.length;
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        comparisons++;
        setCurrentBar({ compare: j, swap: null });  // Highlight the bars being compared
        visualizeArray(array);
        await new Promise(resolve => setTimeout(resolve, delay));
  
        if (shouldStopRef.current) return { swaps, comparisons };  // Stop if shouldStopRef is true
  
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];  // Swap
          swaps++;
          setCurrentBar({ compare: null, swap: j });  // Highlight the bar being swapped
          visualizeArray(array);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    return { swaps, comparisons };
  };