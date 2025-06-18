/**
 * Utility function to measure execution time of sorting algorithms
 * @param {Function} algorithm - The sorting algorithm function to measure
 * @param {Array} array - The array to sort
 * @returns {Object} - Object containing sorted array and execution time in milliseconds
 */
export const measureExecutionTime = (algorithm, array) => {
  const startTime = performance.now();
  const sortedArray = algorithm([...array]);
  const endTime = performance.now();
  const executionTime = endTime - startTime;

  return {
    sortedArray,
    executionTime: executionTime.toFixed(2)
  };
}; 