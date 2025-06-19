import React from 'react';

/**
 * PerformanceMetrics Component
 * 
 * Provides utility functions for algorithm performance metrics:
 * - Time complexity information
 * - Space complexity data
 * - Performance characteristics
 * - Execution time estimation
 * - Memory usage estimation
 */
const PerformanceMetrics = () => {
  // Machine-specific calibration factors (can be adjusted based on actual measurements)
  const CALIBRATION_FACTORS = {
    baseTime: 0.1, // Base time in milliseconds
    memoryFactor: 0.1, // Memory usage factor in MB
    cacheFactor: 0.8, // Cache efficiency factor (0-1)
    cpuFactor: 1.0, // CPU efficiency factor
  };

  /**
   * Estimates execution time based on array size, algorithm, and case scenario
   * 
   * @param {string} algorithm - The algorithm to estimate time for
   * @param {number} arraySize - Size of the array to sort
   * @param {string} [scenario='average'] - The scenario to estimate for ('best', 'average', 'worst')
   * @param {Object} [inputCharacteristics] - Characteristics of the input data
   * @returns {Object} Estimated execution time and performance metrics
   */
  const estimateExecutionTime = (algorithm, arraySize, scenario = 'average', inputCharacteristics = {}) => {
    const { baseTime, cacheFactor, cpuFactor } = CALIBRATION_FACTORS;
    const { isSorted = false, isReverseSorted = false, hasDuplicates = false } = inputCharacteristics;

    // Time complexity factors for different scenarios
    const timeFactors = {
      bubble: {
        best: arraySize * baseTime,
        average: arraySize * arraySize * baseTime,
        worst: arraySize * arraySize * baseTime
      },
      insertion: {
        best: arraySize * baseTime,
        average: arraySize * arraySize * baseTime,
        worst: arraySize * arraySize * baseTime
      },
      selection: {
        best: arraySize * arraySize * baseTime,
        average: arraySize * arraySize * baseTime,
        worst: arraySize * arraySize * baseTime
      },
      quick: {
        best: arraySize * Math.log2(arraySize) * baseTime,
        average: arraySize * Math.log2(arraySize) * baseTime,
        worst: arraySize * arraySize * baseTime
      },
      merge: {
        best: arraySize * Math.log2(arraySize) * baseTime,
        average: arraySize * Math.log2(arraySize) * baseTime,
        worst: arraySize * Math.log2(arraySize) * baseTime
      },
      heap: {
        best: arraySize * Math.log2(arraySize) * baseTime,
        average: arraySize * Math.log2(arraySize) * baseTime,
        worst: arraySize * Math.log2(arraySize) * baseTime
      },
      radix: {
        best: arraySize * Math.log10(arraySize) * baseTime,
        average: arraySize * Math.log10(arraySize) * baseTime,
        worst: arraySize * Math.log10(arraySize) * baseTime
      },
      bucket: {
        best: arraySize * baseTime,
        average: arraySize * baseTime,
        worst: arraySize * arraySize * baseTime
      }
    };

    // Adjust estimates based on input characteristics
    let adjustmentFactor = 1.0;
    if (isSorted) {
      adjustmentFactor *= 0.5; // Much faster for sorted input
    } else if (isReverseSorted) {
      adjustmentFactor *= 1.5; // Slower for reverse sorted input
    }
    if (hasDuplicates) {
      adjustmentFactor *= 1.2; // Slightly slower with duplicates
    }

    // Calculate estimated time
    const timeFactor = timeFactors[algorithm]?.[scenario] || 0;
    const estimatedTime = timeFactor * adjustmentFactor * cacheFactor * cpuFactor;

    // Calculate memory usage
    const memoryUsage = estimateMemoryUsage(algorithm, arraySize);

    return {
      time: estimatedTime.toFixed(2),
      memory: memoryUsage.toFixed(2),
      complexity: getAlgorithmTimeComplexity(algorithm),
      scenario,
      inputCharacteristics
    };
  };

  /**
   * Estimates memory usage for an algorithm
   * 
   * @param {string} algorithm - The algorithm to estimate memory for
   * @param {number} arraySize - Size of the array to sort
   * @returns {number} Estimated memory usage in MB
   */
  const estimateMemoryUsage = (algorithm, arraySize) => {
    const { memoryFactor } = CALIBRATION_FACTORS;
    const baseMemory = arraySize * 4; // 4 bytes per integer

    const memoryFactors = {
      bubble: 1,
      insertion: 1,
      selection: 1,
      quick: Math.log2(arraySize),
      merge: arraySize,
      heap: 1,
      radix: arraySize,
      bucket: arraySize
    };

    return (baseMemory * memoryFactors[algorithm] * memoryFactor) / (1024 * 1024); // Convert to MB
  };

  /**
   * Provides algorithm complexity and performance characteristics
   * 
   * @param {string} algorithm - The algorithm to get metrics for
   * @returns {Object} Complexity data for the algorithm
   */
  const getAlgorithmTimeComplexity = (algorithm) => {
    const complexities = {
      bubble: { 
        best: "O(n)", 
        average: "O(n²)", 
        worst: "O(n²)", 
        space: "O(1)",
        description: "Simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
        efficiency: "low",
        color: "red",
        stability: "stable",
        inPlace: true,
        adaptive: true
      },
      insertion: { 
        best: "O(n)", 
        average: "O(n²)", 
        worst: "O(n²)", 
        space: "O(1)",
        description: "Builds the sorted array one item at a time by comparing each new element with the already sorted elements and inserting it into the correct position.",
        efficiency: "medium-low",
        color: "orange",
        stability: "stable",
        inPlace: true,
        adaptive: true
      },
      selection: { 
        best: "O(n²)", 
        average: "O(n²)", 
        worst: "O(n²)", 
        space: "O(1)",
        description: "Repeatedly finds the minimum element from the unsorted part and puts it at the beginning of the unsorted part.",
        efficiency: "low",
        color: "red",
        stability: "unstable",
        inPlace: true,
        adaptive: false
      },
      quick: { 
        best: "O(n log n)", 
        average: "O(n log n)", 
        worst: "O(n²)", 
        space: "O(log n)",
        description: "Divide-and-conquer algorithm that picks a 'pivot' element and partitions the array around the pivot, recursively sorting the sub-arrays.",
        efficiency: "high",
        color: "green",
        stability: "unstable",
        inPlace: true,
        adaptive: true
      },
      merge: { 
        best: "O(n log n)", 
        average: "O(n log n)", 
        worst: "O(n log n)", 
        space: "O(n)",
        description: "Divide-and-conquer algorithm that divides the array into two halves, sorts them separately, and then merges the sorted halves.",
        efficiency: "high",
        color: "green",
        stability: "stable",
        inPlace: false,
        adaptive: false
      },
      radix: { 
        best: "O(nk)", 
        average: "O(nk)", 
        worst: "O(nk)", 
        space: "O(n+k)",
        description: "Non-comparative sorting algorithm that sorts data with integer keys by grouping keys by individual digits which share the same position and value.",
        efficiency: "high",
        color: "green",
        stability: "stable",
        inPlace: false,
        adaptive: false
      },
      heap: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
        space: "O(1)",
        description: "Comparison-based sorting algorithm that uses a binary heap data structure to sort elements. It builds a max heap and repeatedly extracts the maximum element.",
        efficiency: "high",
        color: "indigo",
        stability: "unstable",
        inPlace: true,
        adaptive: false
      },
      bucket: {
        best: "O(n+k)",
        average: "O(n+k)",
        worst: "O(n²)",
        space: "O(n+k)",
        description: "Distribution sort that works by distributing elements into a number of buckets, sorting each bucket individually, and then concatenating the buckets.",
        efficiency: "medium-high",
        color: "pink",
        stability: "stable",
        inPlace: false,
        adaptive: false
      }
    };
    return complexities[algorithm];
  };

  /**
   * Estimates performance based on input characteristics
   * 
   * @param {string} algorithm - The algorithm to analyze
   * @param {Object} inputCharacteristics - Characteristics of the input data
   * @returns {Object} Performance recommendations and analysis
   */
  const estimatePerformance = (algorithm, inputCharacteristics) => {
    const { isSorted, isReverseSorted, hasDuplicates, arraySize } = inputCharacteristics;
    const complexity = getAlgorithmTimeComplexity(algorithm);
    
    let recommendation = "This algorithm is suitable for your use case.";
    let performanceNotes = [];

    // Analyze based on input characteristics
    if (isSorted && complexity.adaptive) {
      performanceNotes.push("Input is already sorted - this algorithm will perform efficiently.");
    } else if (isReverseSorted && algorithm === 'quick') {
      performanceNotes.push("Input is reverse sorted - Quick Sort may perform poorly.");
      recommendation = "Consider using Merge Sort or Heap Sort instead.";
    }

    if (hasDuplicates && algorithm === 'quick') {
      performanceNotes.push("Input contains duplicates - Quick Sort may not be optimal.");
      recommendation = "Consider using Merge Sort or Radix Sort for better performance with duplicates.";
    }

    if (arraySize < 10 && (algorithm === 'merge' || algorithm === 'quick')) {
      performanceNotes.push("Small input size - simpler algorithms may be more efficient.");
      recommendation = "Consider using Insertion Sort for small arrays.";
    }

    return {
      recommendation,
      performanceNotes,
      complexity,
      isOptimal: performanceNotes.length === 0
    };
  };

  // Export the utility functions
  return {
    getAlgorithmTimeComplexity,
    estimateExecutionTime,
    estimateMemoryUsage,
    estimatePerformance
  };
};

export default PerformanceMetrics; 