import CurrentRunMetrics from './components/CurrentRunMetrics';
import React,{useState} from 'react';
import { 
  bubbleSort, 
  insertionSort, 
  selectionSort, 
  quickSort, 
  mergeSort, 
  radixSort,
  heapSort,
  bucketSort 
} from '../../algorithms';

/**
 * SortingControls Component
 * 
 * Provides utility functions for controlling sorting operations:
 * - Generating new arrays
 * - Starting and stopping sorting
 * - Testing all algorithms
 */
const SortingControls = () => {
  const [metrics, setMetrics] = useState({
    swaps: 0,
    comparisons: 0,
    steps: 0,
    time: 0
  });

  const generateNewArray = (arraySize, setArray, setCurrentBar) => {
    const newArray = Array.from(
      { length: arraySize }, 
      () => Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setCurrentBar({ compare: null, swap: null });
  };

  const stopSorting = (shouldStopRef, setIsStopped, setIsSorting) => {
    shouldStopRef.current = true;
    setIsStopped(true);
    setIsSorting(false);
  };

  const startSorting = async (
    algorithm, 
    array, 
    setArray, 
    speed, 
    setCurrentBar, 
    shouldStopRef, 
    setIsStopped, 
    setIsSorting, 
    setMetrics,
    audio
  ) => {
    shouldStopRef.current = false;
    setIsStopped(false);
    setIsSorting(true);

    const updateMetrics = (newMetrics) => {
      setMetrics(prev => ({ ...prev, ...newMetrics }));
    };

    try {
      switch (algorithm) {
        case 'bubble':
          await bubbleSort(array, setArray, speed, setCurrentBar, shouldStopRef, audio, updateMetrics);
          break;
        case 'insertion':
          await insertionSort(array, setArray, speed, setCurrentBar, shouldStopRef, audio);
          break;
        case 'selection':
          await selectionSort(array, setArray, speed, setCurrentBar, shouldStopRef, audio);
          break;
        case 'quick':
          await quickSort(array, setArray, speed, setCurrentBar, shouldStopRef, audio);
          break;
        case 'merge':
          await mergeSort(array, setArray, speed, setCurrentBar, shouldStopRef, audio);
          break;
        case 'radix':
          await radixSort(array, setArray, speed, setCurrentBar, shouldStopRef, audio);
          break;
        case 'heap':
          await heapSort(array, setArray, speed, setCurrentBar, shouldStopRef, audio);
          break;
        case 'bucket':
          await bucketSort(array, setArray, speed, setCurrentBar, shouldStopRef, audio);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log('Sorting was stopped:', error);
      setIsSorting(false);
      setIsStopped(true);
      return;
    }

    setIsSorting(false);
  };

  const testAllAlgorithms = async (
    array,
    setArray,
    speed,
    setCurrentBar,
    shouldStopRef,
    setIsStopped,
    setIsSorting,
    setCurrentTestingAlgo,
    setCompareMetrics,
    setSortedMetrics,
    audio
  ) => {
    setIsSorting(true);
    shouldStopRef.current = false;
    setIsStopped(false);

    const algorithms = ['bubble', 'insertion', 'selection', 'bucket', 'radix', 'heap', 'merge', 'quick'];
    const results = {};
    const originalArray = [...array];

    for (const algo of algorithms) {
      if (shouldStopRef.current) break;

      setCurrentTestingAlgo(algo);
      setArray([...originalArray]);
      const startTime = performance.now();
      let metrics = { swaps: 0, comparisons: 0 };

      try {
        switch (algo) {
          case 'bubble':
            metrics = await bubbleSort([...originalArray], setArray, speed, setCurrentBar, shouldStopRef, audio);
            break;
          case 'insertion':
            metrics = await insertionSort([...originalArray], setArray, speed, setCurrentBar, shouldStopRef, audio);
            break;
          case 'selection':
            metrics = await selectionSort([...originalArray], setArray, speed, setCurrentBar, shouldStopRef, audio);
            break;
          case 'quick':
            metrics = await quickSort([...originalArray], setArray, speed, setCurrentBar, shouldStopRef, audio);
            break;
          case 'merge':
            metrics = await mergeSort([...originalArray], setArray, speed, setCurrentBar, shouldStopRef, audio);
            break;
          case 'radix':
            metrics = await radixSort([...originalArray], setArray, speed, setCurrentBar, shouldStopRef, audio);
            break;
          case 'heap':
            metrics = await heapSort([...originalArray], setArray, speed, setCurrentBar, shouldStopRef, audio);
            break;
          case 'bucket':
            metrics = await bucketSort([...originalArray], setArray, speed, setCurrentBar, shouldStopRef, audio);
            break;
          default:
            break;
        }

        const endTime = performance.now();
        results[algo] = {
          swaps: metrics.swaps || 0,
          comparisons: metrics.comparisons || 0,
          time: (endTime - startTime).toFixed(2)
        };
      } catch (error) {
        console.log(`Error testing ${algo}:`, error);
      }
    }

    setCurrentTestingAlgo(null);
    setCompareMetrics(results);

    const sortedResults = Object.entries(results)
      .sort(([, a], [, b]) => parseFloat(a.time) - parseFloat(b.time))
      .map(([algo, metrics], index) => ({
        algo,
        metrics,
        rank: index + 1
      }));

    setSortedMetrics(sortedResults);
    setIsSorting(false);
  };

  return {
    generateNewArray,
    stopSorting,
    startSorting,
    testAllAlgorithms
  };
};

export default SortingControls;
