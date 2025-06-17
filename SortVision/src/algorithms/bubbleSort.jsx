export const bubbleSort = async (
  array,
  visualizeArray,
  delay,
  setCurrentBar,
  shouldStopRef,
  audio,
  updateMetrics
) => {
  let swaps = 0;
  let comparisons = 0;
  let steps = 0;
  const length = array.length;
  const startTime = performance.now(); // ⏱️ Start timing

  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      comparisons++;
      steps++;

      setCurrentBar({ compare: j, swap: null });
      visualizeArray([...array]);
      audio.playCompareSound(array[j]);
      await new Promise(resolve => setTimeout(resolve, delay));

      if (shouldStopRef.current) {
        const time = (performance.now() - startTime).toFixed(2); // ⏱️ Capture time
        updateMetrics?.({ swaps, comparisons, steps, time });
        return { swaps, comparisons };
      }

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swaps++;
        steps++;

        setCurrentBar({ compare: null, swap: j });
        visualizeArray([...array]);
        audio.playSwapSound(array[j]);
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      const time = (performance.now() - startTime).toFixed(2);
      updateMetrics?.({ swaps, comparisons, steps, time }); // ⏱️ Update continuously
    }
  }

  audio.playCompleteSound();
  const time = (performance.now() - startTime).toFixed(2); // ⏱️ Final timing
  updateMetrics?.({ swaps, comparisons, steps, time });

  return { swaps, comparisons };
};

