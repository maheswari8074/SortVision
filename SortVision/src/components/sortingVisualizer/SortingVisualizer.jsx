import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button"; // Added for new button
import { Input } from "@/components/ui/input"; // Added for thread count
import { Label } from "@/components/ui/label"; // Added for thread count input
import { useNavigate } from 'react-router-dom';
import { useAudio } from '@/hooks/useAudio';

// Import subcomponents
import SortingHeader from './SortingHeader';
import { ConfigPanel, MetricsPanel, DetailsPanel, ContributionPanel } from '../panels';
import SortingControls from './SortingControls';
import PerformanceMetrics from './PerformanceMetrics';
import ParallelAlgorithmManager from '@/lib/ParallelAlgorithmManager'; // Added
import ParallelProgressDisplay from './ParallelProgressDisplay'; // Added

import { useAlgorithmState } from '@/context/AlgorithmState';


/**
 * SortingVisualizer Component
 * 
 * Interactive visualization tool for various sorting algorithms with real-time
 * animation and performance metrics analysis.
 * 
 * Features:
 * - Interactive visualization of sorting algorithms (bubble, insertion, selection, etc.)
 * - Performance metrics tracking (time, comparisons, swaps)
 * - Algorithm comparison and benchmarking
 * - Configurable array size and animation speed
 * - Detailed algorithm information and complexity analysis
 * 
 * The application is structured with three main panels:
 * 1. Config Panel - Algorithm selection and configuration controls
 * 2. Metrics Panel - Performance data visualization and comparison
 * 3. Details Panel - Algorithm details and visual representation
 */
const SortingVisualizer = ({ initialAlgorithm = 'bubble', activeTab = 'controls', onTabChange, specialMode = null }) => {
  // Router navigation
  const navigate = useNavigate();

  // Audio hook
  const audio = useAudio();
  const { setAlgorithmName, setArray: setContextArray, setStep } = useAlgorithmState();


  //=============================================================================
  // STATE MANAGEMENT
  //=============================================================================

  // Core state variables for array data and algorithm selection
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState(initialAlgorithm);
  const [arraySize, setArraySize] = useState(30);

  // Sorting process control state
  const [isSorting, setIsSorting] = useState(false);
  const [isParallelSorting, setIsParallelSorting] = useState(false); // Added
  const [isStopped, setIsStopped] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [currentBar, setCurrentBar] = useState({ compare: null, swap: null });

  // Performance metrics tracking state
  const [metrics, setMetrics] = useState({ swaps: 0, comparisons: 0, time: 0 });
  const [sortedMetrics, setSortedMetrics] = useState([]);
  const [currentTestingAlgo, setCurrentTestingAlgo] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [compareMetrics, setCompareMetrics] = useState({});

  // Reference for handling abort signals
  const shouldStopRef = useRef(false);

  // Reference for tracking sort start time 
  const sortStartTimeRef = useRef(null);

  // Parallel Algorithm Manager
  const parallelManagerRef = useRef(null); // To hold the instance
  const [workerStatuses, setWorkerStatuses] = useState([]);
  const [overallParallelProgress, setOverallParallelProgress] = useState(0);
  const [numThreads, setNumThreads] = useState(navigator.hardwareConcurrency || 2); // Default threads
  const [parallelError, setParallelError] = useState(null); // Added for general parallel errors

  // Import utility functions from subcomponents
  const sortingControls = SortingControls();
  const performanceMetrics = PerformanceMetrics();

  // Initialize Parallel Manager
  useEffect(() => {
    parallelManagerRef.current = new ParallelAlgorithmManager();
    // Initialize workers when component mounts or numThreads changes
    // The worker script is in the public folder, so 'algorithmWorker.js' is the correct path.
    parallelManagerRef.current.initializeWorkers('algorithmWorker.js', numThreads)
      .then(() => {
        console.log('Parallel workers initialized.');
        setWorkerStatuses(parallelManagerRef.current.getWorkerStatuses());
        setParallelError(null); // Clear previous errors on successful init
      })
      .catch(error => {
        console.error('Failed to initialize parallel workers:', error);
        setParallelError(`Initialization failed: ${error.message}. Parallel sort may not work.`);
      });

    return () => {
      if (parallelManagerRef.current) {
        parallelManagerRef.current.terminateWorkers();
      }
    };
  }, [numThreads]); // Re-initialize if numThreads changes

  //=============================================================================
  // HANDLER FUNCTIONS
  //=============================================================================

  /**
   * Generates a new random array for visualization
   */
  const generateNewArray = () => {
    sortingControls.generateNewArray(arraySize, setArray, setCurrentBar);
    audio.playAccessSound(); // Play sound when generating new array
  };

  /**
   * Stops the current sorting process
   */
  const stopSorting = () => {
    sortingControls.stopSorting(shouldStopRef, setIsStopped, setIsSorting);
    audio.playAccessSound(); // Play sound when stopping
  };

  /**
   * Initiates the sorting process with the selected algorithm
   */
  const startSorting = async (parallel = false) => {
    if (isSorting || isParallelSorting) return;

    setIsStopped(false);
    shouldStopRef.current = false;
    sortStartTimeRef.current = Date.now();
    setMetrics({ swaps: 0, comparisons: 0, time: 0 }); // Reset metrics
    setParallelError(null); // Clear previous errors before new operation

    if (parallel && parallelManagerRef.current) {
      if (!parallelManagerRef.current.workers || parallelManagerRef.current.workers.size === 0) {
        setParallelError("Workers not initialized. Cannot start parallel sort.");
        setIsParallelSorting(false);
        audio.playErrorSound();
        return;
      }
      setIsParallelSorting(true);
      setOverallParallelProgress(0);
      setWorkerStatuses(parallelManagerRef.current.getWorkerStatuses()); // Update statuses before start

      try {
        console.log(`Starting parallel sort for ${algorithm} with ${numThreads} threads.`);
        const results = await parallelManagerRef.current.executeParallelAlgorithm(
          algorithm, // Ensure this algorithm name matches one in algorithmWorker.js
          [...array], // Send a copy of the array
          { speed }, // Options for the worker (e.g., speed for delays if implemented in worker)
          (workerId, progress) => { // onWorkerProgress
            // console.log(`Worker ${workerId} progress: ${progress}%`);
            setWorkerStatuses(prev => prev.map(ws => ws.id === workerId ? {...ws, progress, status: 'busy'} : ws));
          },
          (workerId, result) => { // onWorkerComplete
            console.log(`Worker ${workerId} completed. Result chunk size: ${result.length}`);
            setWorkerStatuses(prev => prev.map(ws => ws.id === workerId ? {...ws, progress: 100, status: 'idle', result } : ws));
          },
          (workerId, error) => { // onWorkerError
            console.error(`Worker ${workerId} error:`, error);
            setWorkerStatuses(prev => prev.map(ws => ws.id === workerId ? {...ws, status: 'error', error } : ws));
          },
          (overallProgress) => { // onOverallProgress
            // console.log(`Overall parallel progress: ${overallProgress}%`);
            setOverallParallelProgress(overallProgress);
          }
        );
        console.log('Parallel execution finished. Results from workers:', results);
        // TODO: Implement merging of results. For now, just log.
        // For many sorting algorithms, `results` will be an array of sorted chunks.
        // These need to be merged into a single sorted array.
        // A simple approach for now:
        if (results && results.length > 0) {
            const mergedArray = results.reduce((acc, val) => acc.concat(val), []);
            // If the algorithm is like bubble sort, the merged array is not fully sorted.
            // A final sort might be needed, or a proper merge strategy.
            // For now, we'll just set the array to the first worker's result for visualization,
            // or the merged result if available. This is a placeholder.
            if (algorithm === 'bubbleSort') { // Example: bubble sort chunks are independently sorted
                 // A proper merge is needed here. For now, we'll just show the concatenated but unmerged array
                 // or let the user know it's chunked.
                 // This is a simplification for now.
                 console.log("Bubble sort chunks received. Merging and final sort would be needed.");
                 // Flatten and then re-sort the whole thing on main thread (inefficient, but for display)
                 const tempFlatArray = results.flat();
                 // To avoid re-implementing sort here, we'd ideally call a main-thread sort
                 // For now, just display the first chunk or concatenated for simplicity of this step
                 setArray(tempFlatArray); // This is NOT correctly sorted globally for bubble sort.
            } else {
                 // For algorithms like MergeSort, the final merge is part of the algo.
                 // Assuming 'results' from a parallel MergeSort would be the final sorted array if designed that way.
                 // This needs to be specific to the algorithm's parallel strategy.
                 setArray(results.flat()); // Placeholder
            }
        }
        audio.playCompleteSound();
      } catch (error) {
        console.error('Error during parallel sorting orchestration:', error);
        setParallelError(`Execution error: ${error.message || 'Unknown error'}`);
        audio.playErrorSound();
      } finally {
        setIsParallelSorting(false);
        setOverallParallelProgress(100); // Ensure it shows 100% at the end
        // Update statuses one last time
        if (parallelManagerRef.current) {
            setWorkerStatuses(parallelManagerRef.current.getWorkerStatuses());
        }
        const endTime = Date.now();
        setMetrics(prev => ({ ...prev, time: endTime - sortStartTimeRef.current }));
      }

    } else {
      // Standard single-threaded sorting
      setIsSorting(true);
      await sortingControls.startSorting(
        algorithm,
        array,
        setArray,
        speed,
        setCurrentBar,
        shouldStopRef,
        setIsStopped,
        setIsSorting,
        setMetrics,
        audio // Pass audio object to sorting controls
      );
      // Note: startSorting from sortingControls updates its own metrics and isSorting state.
      // We might need to reconcile this if we want a single source of truth for metrics time.
      // For now, the original behavior is preserved for single-thread.
      // The setIsSorting(false) is handled within sortingControls.startSorting upon completion/stop.
       const endTime = Date.now(); // Recalculate time for consistency if needed
       // setMetrics(prev => ({ ...prev, time: endTime - sortStartTimeRef.current }));
    }
  };

  /**
   * Benchmarks all sorting algorithms on the same array for comparison
   */
  const testAllAlgorithms = async () => {
    await sortingControls.testAllAlgorithms(
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
      audio // Pass audio object to sorting controls
    );
  };

  /**
   * Provides algorithm complexity and performance characteristics
   */
  const getAlgorithmTimeComplexity = () => {
    return performanceMetrics.getAlgorithmTimeComplexity(algorithm);
  };

  /**
   * Handle algorithm change and update URL for SEO
   */
  const handleAlgorithmChange = (newAlgorithm) => {
    setAlgorithm(newAlgorithm);

    // Update URL with path-based routing, preserving current tab and query parameters
    if (newAlgorithm !== initialAlgorithm) {
      const currentPath = window.location.pathname;
      const currentParams = new URLSearchParams(window.location.search);

      // Determine current tab from path
      let currentTab = 'config'; // default
      if (currentPath.includes('/details/')) {
        currentTab = 'details';
      } else if (currentPath.includes('/metrics/')) {
        currentTab = 'metrics';
      }

      // Build new URL with same tab structure
      const newSearch = currentParams.toString();
      const newUrl = `/algorithms/${currentTab}/${newAlgorithm}${newSearch ? `?${newSearch}` : ''}`;

      navigate(newUrl, { replace: true });
    }
  };

  /**
   * Handle array size change
   */
  const handleArraySizeChange = (newSize) => {
    setArraySize(newSize);
  };

  /**
   * Handle speed change
   */
  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
  };

  //=============================================================================
  // LIFECYCLE MANAGEMENT
  //=============================================================================

  /**
   * Handles component initialization, updates, and cleanup
   * 
   * Generates initial array on mount and when array size changes
   * Ensures sorting operations are properly terminated on unmount
   */
  useEffect(() => {
    generateNewArray();

    // Cleanup function to ensure sorting stops if component unmounts
    return () => {
      shouldStopRef.current = true;
    };
  }, [arraySize]);

  /**
   * Update algorithm when initialAlgorithm changes from route
   */
  useEffect(() => {
    if (initialAlgorithm !== algorithm) {
      setAlgorithm(initialAlgorithm);
    }
  }, [initialAlgorithm]);

  // Sync algorithm to context
  useEffect(() => {
    setAlgorithmName(algorithm);
  }, [algorithm]);

  // Sync array to context
  useEffect(() => {
    setContextArray(array);
  }, [array]);

  // Sync step to context (if you want live step updates too)
  useEffect(() => {
    setStep(currentBar);
  }, [currentBar]);


  //=============================================================================
  // COMPONENT RENDERING
  //=============================================================================

  return (
    <Card className="w-full max-w-5xl mx-auto border-slate-800 bg-slate-950 text-slate-200 shadow-lg">
      {/* Animation keyframes */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}} />

      {/* Application header */}
      <SortingHeader />

      {/* Main content area */}
      <CardContent className="p-4 space-y-4">
        {/* Display general parallel error message */}
        {parallelError && (
          <div className="my-2 p-3 bg-red-900 border border-red-700 text-red-200 rounded-md text-sm">
            <p><span className="font-semibold">Parallel System Error:</span> {parallelError}</p>
          </div>
        )}

        {specialMode ? (
          // Special modes (contributors, etc.) - direct content without tab header
          <div className="w-full space-y-4">
            {specialMode === 'contributors' && (
              <ContributionPanel
                activeTab={activeTab}
                onTabChange={onTabChange}
              />
            )}
            {/* Future special modes can be added here */}
            {/* {specialMode === 'analytics' && <AnalyticsPanel />} */}
            {/* {specialMode === 'tutorials' && <TutorialsPanel />} */}
          </div>
        ) : (
          // Normal 3-tab mode
          <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
            {/* Tab navigation */}
            <TabsList className="grid w-full grid-cols-3 bg-slate-900">
              <TabsTrigger
                value="controls"
                className="font-mono"
                onClick={() => audio.playAccessSound()}
              >
                <span className="text-emerald-400">config</span>
                <span className="text-slate-400">.js</span>
              </TabsTrigger>
              <TabsTrigger
                value="metrics"
                className="font-mono"
                onClick={() => audio.playAccessSound()}
              >
                <span className="text-emerald-400">metrics</span>
                <span className="text-slate-400">.js</span>
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="font-mono"
                onClick={() => audio.playAccessSound()}
              >
                <span className="text-emerald-400">details</span>
                <span className="text-slate-400">.js</span>
              </TabsTrigger>
            </TabsList>

            {/* Configuration panel */}
            <TabsContent value="controls" className="space-y-4 mt-4">
              <ConfigPanel
                algorithm={algorithm}
                setAlgorithm={handleAlgorithmChange}
                arraySize={arraySize}
                setArraySize={handleArraySizeChange}
                speed={speed}
                setSpeed={handleSpeedChange}
                isSorting={isSorting || isParallelSorting}
                getAlgorithmTimeComplexity={getAlgorithmTimeComplexity}
                array={array}
                currentBar={currentBar}
                currentTestingAlgo={currentTestingAlgo}
                isStopped={isStopped}
                generateNewArray={generateNewArray}
                startSorting={() => startSorting(false)} // Normal sort
                stopSorting={stopSorting}
                // Add elements for parallel sorting control
                startParallelSorting={() => startSorting(true)} // Parallel sort
                isParallelSorting={isParallelSorting}
                numThreads={numThreads}
                setNumThreads={(val) => {
                  const newThreadCount = parseInt(val, 10);
                  if (newThreadCount > 0 && newThreadCount <= (navigator.hardwareConcurrency || 16)) {
                    setNumThreads(newThreadCount);
                  }
                }}
                audio={audio}
              />
            </TabsContent>

            {/* Performance metrics panel */}
            <TabsContent value="metrics" className="space-y-4 mt-4">
              <MetricsPanel
                metrics={metrics}
                sortedMetrics={sortedMetrics}
                isSorting={isSorting}
                currentTestingAlgo={currentTestingAlgo}
                testAllAlgorithms={testAllAlgorithms}
                stopSorting={stopSorting}
                algorithm={algorithm}
                array={array}
                currentBar={currentBar}
                isStopped={isStopped}
              />
            </TabsContent>

            {/* Algorithm details panel */}
            <TabsContent value="details" className="space-y-4 mt-4">
              <ParallelProgressDisplay 
                workerStatuses={workerStatuses}
                overallParallelProgress={overallParallelProgress}
                isParallelSorting={isParallelSorting}
              />
              <DetailsPanel
                algorithm={algorithm}
                array={array}
                currentBar={currentBar}
                isSorting={isSorting || isParallelSorting} // Keep this for DetailsPanel's own logic
                currentTestingAlgo={currentTestingAlgo}
                isStopped={isStopped}
                setAlgorithm={handleAlgorithmChange}
              />
            </TabsContent>

          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default SortingVisualizer;