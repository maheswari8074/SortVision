export const insertionSort = async (array, visualizeArray, delay, setCurrentBar, shouldStopRef) => {
    let swaps = 0;
    let comparisons = 0;
    const length = array.length;
    for (let i = 1; i < length; i++) {
      let current = array[i];
      let j = i - 1;
  
      setCurrentBar({ compare: i, swap: null });
      visualizeArray(array);
      await new Promise(resolve => setTimeout(resolve, delay));
  
      while (j >= 0 && array[j] > current) {
        comparisons++;
        setCurrentBar({ compare: j, swap: null });
        visualizeArray(array);
        await new Promise(resolve => setTimeout(resolve, delay));
  
        array[j + 1] = array[j];
        j--;
      }
      swaps++;
      array[j + 1] = current;
      setCurrentBar({ compare: null, swap: j + 1 });
      visualizeArray(array);
      await new Promise(resolve => setTimeout(resolve, delay));
  
      if (shouldStopRef.current) return { swaps, comparisons };  // Stop if shouldStopRef is true
    }
    return { swaps, comparisons };
  };