// SortVision/src/lib/ParallelAlgorithmManager.js
class ParallelAlgorithmManager {
  constructor() {
    this.workers = new Map();
    // Default to 2 if navigator.hardwareConcurrency is not available or too low for meaningful parallelization.
    // Allow overriding via options in initializeWorkers if needed.
    this.threadCount = Math.max(navigator.hardwareConcurrency || 2, 2); 
    this.workerScript = 'algorithmWorker.js'; // Default worker script name
  }

  /**
   * Initializes the Web Workers.
   * @param {string} workerScript - The path to the worker script.
   * @param {number} numThreads - Optional number of threads to override default.
   */
  async initializeWorkers(workerScript = this.workerScript, numThreads) {
    if (this.workers.size > 0) {
      this.terminateWorkers(); // Terminate existing workers before re-initializing
    }

    const effectiveThreadCount = numThreads > 0 ? Math.min(numThreads, navigator.hardwareConcurrency || 4) : this.threadCount;
    this.threadCount = effectiveThreadCount; // Update internal thread count

    console.log(`Initializing ${this.threadCount} worker threads...`);

    for (let i = 0; i < this.threadCount; i++) {
      try {
        // Ensure the worker script is in the public folder or accessible via URL
        const worker = new Worker(workerScript); 
        this.workers.set(i, {
          id: i,
          worker,
          status: 'idle', // idle, busy, error
          progress: 0,
          startTime: null,
          endTime: null,
          result: null,
          error: null,
        });
        console.log(`Worker ${i} initialized.`);
      } catch (error) {
        console.error(`Error initializing worker ${i}:`, error);
        // Handle worker initialization error (e.g., update UI, throw error)
        throw new Error(`Failed to initialize worker ${i}: ${error.message}`);
      }
    }
  }

  /**
   * Terminates all active Web Workers.
   */
  terminateWorkers() {
    this.workers.forEach((workerData) => {
      workerData.worker.terminate();
      workerData.status = 'terminated';
    });
    this.workers.clear();
    console.log('All workers terminated.');
  }

  /**
   * Splits data into chunks for parallel processing.
   * @param {Array} data - The array to be split.
   * @param {number} numChunks - The number of chunks to split the data into.
   * @returns {Array<Array>} An array of data chunks.
   */
  splitData(data, numChunks) {
    if (!data || data.length === 0) return [];
    const chunkSize = Math.ceil(data.length / numChunks);
    const chunks = [];
    for (let i = 0; i < numChunks; i++) {
      const start = i * chunkSize;
      const end = start + chunkSize;
      chunks.push(data.slice(start, end));
    }
    return chunks.filter(chunk => chunk.length > 0); // Ensure no empty chunks if data < numChunks
  }

  /**
   * Executes a task on a specific worker.
   * @param {object} workerData - The worker data object from the this.workers map.
   * @param {string} algorithm - The name of the algorithm to execute.
   * @param {Array} dataChunk - The chunk of data for the worker to process.
   * @param {object} options - Additional options for the algorithm.
   * @param {function} onProgress - Callback function for progress updates. (id, progress) => {}
   * @param {function} onComplete - Callback function for completion. (id, result) => {}
   * @param {function} onError - Callback function for errors. (id, error) => {}
   * @returns {Promise} A promise that resolves or rejects based on worker execution.
   */
  executeTaskOnWorker(workerData, algorithm, dataChunk, options, onProgress, onComplete, onError) {
    return new Promise((resolve, reject) => {
      if (!workerData || workerData.status === 'busy') {
        // This shouldn't happen if workers are managed correctly
        return reject(new Error(`Worker ${workerData?.id} is busy or not available.`));
      }

      workerData.status = 'busy';
      workerData.progress = 0;
      workerData.startTime = Date.now();
      workerData.endTime = null;
      workerData.result = null;
      workerData.error = null;

      workerData.worker.postMessage({
        type: 'execute',
        algorithm,
        data: dataChunk,
        options, // e.g., speed, specific algorithm parameters
        workerId: workerData.id,
      });

      workerData.worker.onmessage = (event) => {
        const { type, progress, result, error, workerId } = event.data;
        
        if (workerId !== workerData.id) return; // Message not for this worker instance

        if (type === 'progress') {
          workerData.progress = progress;
          if (onProgress) onProgress(workerData.id, progress);
        } else if (type === 'complete') {
          workerData.status = 'idle';
          workerData.progress = 100;
          workerData.endTime = Date.now();
          workerData.result = result;
          if (onComplete) onComplete(workerData.id, result);
          resolve(result);
        } else if (type === 'error') {
          workerData.status = 'error';
          workerData.endTime = Date.now();
          workerData.error = error;
          if (onError) onError(workerData.id, error);
          reject(error);
        }
      };

      workerData.worker.onerror = (err) => {
        // This handles errors in the worker script itself (e.g., syntax errors)
        workerData.status = 'error';
        workerData.endTime = Date.now();
        workerData.error = err.message;
        if (onError) onError(workerData.id, err.message);
        reject(new Error(`Worker ${workerData.id} encountered an error: ${err.message}`));
      };
    });
  }

  /**
   * Executes an algorithm in parallel across all initialized workers.
   * Manages data splitting, task distribution, and result aggregation.
   * @param {string} algorithm - The algorithm to execute.
   * @param {Array} data - The entire dataset.
   * @param {object} options - Algorithm-specific options.
   * @param {function} onWorkerProgress - Callback for individual worker progress: (workerId, progress) => {}
   * @param {function} onWorkerComplete - Callback for individual worker completion: (workerId, result) => {}
   * @param {function} onWorkerError - Callback for individual worker error: (workerId, error) => {}
   * @param {function} onOverallProgress - Callback for overall progress estimate: (overallProgress) => {}
   * @returns {Promise<Array>} A promise that resolves with an array of results from each worker, or rejects if any worker fails critically.
   */
  async executeParallelAlgorithm(
    algorithm,
    data,
    options,
    onWorkerProgress,
    onWorkerComplete,
    onWorkerError,
    onOverallProgress
  ) {
    if (this.workers.size === 0) {
      console.warn('No workers initialized. Initializing with defaults.');
      await this.initializeWorkers();
    }

    const dataChunks = this.splitData(data, this.threadCount);
    if (dataChunks.length === 0 && data.length > 0) {
        // This might happen if threadCount is very high for small data
        // Fallback to a single chunk if splitting results in nothing but data exists
        dataChunks.push(data); 
    } else if (dataChunks.length === 0 && data.length === 0) {
        return Promise.resolve([]); // No data to process
    }


    const promises = [];
    const workerArray = Array.from(this.workers.values());
    let completedTasks = 0;
    let totalProgress = 0;

    // Use only as many workers as there are chunks
    const numTasks = Math.min(dataChunks.length, workerArray.length);

    for (let i = 0; i < numTasks; i++) {
      const workerData = workerArray[i];
      const chunk = dataChunks[i];

      if (!chunk || chunk.length === 0) continue; // Skip if a chunk is empty

      promises.push(
        this.executeTaskOnWorker(
          workerData,
          algorithm,
          chunk,
          options,
          (workerId, progress) => { // Individual worker progress
            if (onWorkerProgress) onWorkerProgress(workerId, progress);
            // Update overall progress
            let currentTotalProgress = 0;
            this.workers.forEach(wd => {
                currentTotalProgress += wd.progress || 0;
            });
            totalProgress = currentTotalProgress / (this.threadCount * 100); // Normalized to 0-1
            if (onOverallProgress) onOverallProgress(totalProgress * 100); // Send as percentage
          },
          (workerId, result) => { // Individual worker complete
            completedTasks++;
            if (onWorkerComplete) onWorkerComplete(workerId, result);
            if (completedTasks === numTasks) {
                 if (onOverallProgress) onOverallProgress(100); // Ensure 100% on final completion
            }
          },
          (workerId, error) => { // Individual worker error
            if (onWorkerError) onWorkerError(workerId, error);
            // Optionally, decide if one worker error should stop others (depends on requirements)
          }
        )
      );
    }

    // This will wait for all workers to complete or for the first critical error.
    // The individual worker results (or errors) are handled by the callbacks.
    try {
      const results = await Promise.all(promises);
      // After all promises resolve, a final merge step might be needed depending on the algorithm
      // For sorting, results from workers (sorted chunks) need to be merged.
      // This manager currently returns an array of these results.
      // The calling component will be responsible for the final merge.
      return results; 
    } catch (error) {
      console.error('Error during parallel execution:', error);
      // This catch block handles errors from executeTaskOnWorker if a promise is rejected,
      // or if Promise.all itself fails (though individual errors are caught by worker.onerror).
      // The onWorkerError callbacks should have already handled individual worker issues.
      throw error; // Re-throw to be caught by the caller
    }
  }

  /**
   * Gets the current status of all workers.
   * @returns {Array<object>} An array of worker status objects.
   */
  getWorkerStatuses() {
    return Array.from(this.workers.values()).map(w => ({
      id: w.id,
      status: w.status,
      progress: w.progress,
      startTime: w.startTime,
      endTime: w.endTime,
      error: w.error
    }));
  }
}

export default ParallelAlgorithmManager;
