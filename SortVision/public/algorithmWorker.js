// SortVision/public/algorithmWorker.js

/**
 * A generic Bubble Sort implementation for the Web Worker.
 * This version will include progress reporting.
 *
 * @param {Array<number|object>} arr - The array to sort. If objects, 'value' key is used.
 * @param {string} workerId - The ID of the worker for logging/messaging.
 * @param {function} postProgress - Function to post progress updates.
 * @returns {Array<number|object>} The sorted array.
 */
function bubbleSort(arr, workerId, postProgress) {
  const n = arr.length;
  if (n <= 1) {
    postProgress(100);
    return arr;
  }

  let comparisons = 0;
  const totalPossibleComparisons = (n * (n - 1)) / 2; // Rough estimate for progress

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      // Determine values to compare (handles both numbers and objects with 'value' key)
      const val1 = typeof arr[j] === 'object' ? arr[j].value : arr[j];
      const val2 = typeof arr[j+1] === 'object' ? arr[j+1].value : arr[j+1];

      if (val1 > val2) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
      comparisons++;
      
      // Post progress: a bit simplified, could be more granular
      if (totalPossibleComparisons > 0) {
        const progress = Math.min(99, Math.floor((comparisons / totalPossibleComparisons) * 100));
        // Post progress infrequently to avoid flooding the main thread
        if (comparisons % Math.ceil(n/10) === 0 || comparisons === totalPossibleComparisons) {
             postProgress(progress);
        }
      }
    }
    if (!swapped) {
      // If no swaps in an inner loop pass, array is sorted
      break;
    }
  }
  postProgress(100); // Ensure 100% is sent on completion
  return arr;
}

// More sorting algorithms can be added here:
// function mergeSort(arr, workerId, postProgress) { /* ... */ }
// function quickSort(arr, workerId, postProgress) { /* ... */ }


// Main message handler for the worker
self.onmessage = function(event) {
  const { type, algorithm, data, options, workerId } = event.data;

  if (type === 'execute') {
    console.log(`Worker ${workerId}: Received task to execute ${algorithm}`);
    
    const postProgress = (progress) => {
      self.postMessage({
        type: 'progress',
        workerId: workerId,
        progress: progress,
      });
    };

    try {
      let result;
      switch (algorithm) {
        case 'bubbleSort': // Assuming 'bubbleSort' will be a recognized name
          result = bubbleSort(data, workerId, postProgress);
          break;
        // Add cases for other algorithms as they are implemented
        // case 'mergeSort':
        //   result = mergeSort(data, workerId, postProgress);
        //   break;
        default:
          throw new Error(`Algorithm ${algorithm} not implemented in worker.`);
      }

      console.log(`Worker ${workerId}: Execution complete for ${algorithm}.`);
      self.postMessage({
        type: 'complete',
        workerId: workerId,
        result: result,
      });
    } catch (error) {
      console.error(`Worker ${workerId}: Error executing ${algorithm}:`, error);
      self.postMessage({
        type: 'error',
        workerId: workerId,
        error: error.message || 'Unknown worker error',
      });
    }
  } else {
    console.warn(`Worker ${workerId}: Unknown message type received: ${type}`);
  }
};

// Optional: Handle unhandled errors within the worker
self.onerror = function(error) {
  console.error(`Worker: Unhandled error:`, error);
  // It might be useful to try and inform the main thread if possible,
  // though this usually indicates a more fundamental script error.
  self.postMessage({
    type: 'error',
    // workerId might not be available here if error is before onmessage
    error: `Unhandled worker error: ${error.message}`,
  });
};

console.log('algorithmWorker.js loaded and ready.');
