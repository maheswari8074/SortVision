import React, { useState, useEffect, useRef } from 'react';
import { bubbleSort, insertionSort, selectionSort, quickSort, mergeSort, radixSort } from '../algorithms';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal, RefreshCw, Play, Square } from 'lucide-react';

// Import panel components using the index file
import { ConfigPanel, MetricsPanel, VisualizationPanel } from './panels';

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
 * 3. Visualization Panel - Algorithm details and visual representation
 */
const SortingVisualizer = () => {
  //=============================================================================
  // STATE MANAGEMENT
  //=============================================================================
  
  // Core state variables for array data and algorithm selection
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [arraySize, setArraySize] = useState(30);
  
  // Sorting process control state
  const [isSorting, setIsSorting] = useState(false);
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

  //=============================================================================
  // ARRAY GENERATION
  //=============================================================================
  
  /**
   * Generates a new random array for visualization and resets current comparisons
   * 
   * @returns {void}
   */
  const generateNewArray = () => {
    const newArray = Array.from(
      { length: arraySize }, 
      () => Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setCurrentBar({ compare: null, swap: null });
  };

  //=============================================================================
  // SORTING OPERATIONS
  //=============================================================================
  
  /**
   * Stops the current sorting process
   * 
   * Sets the stop flag to true and updates UI state to reflect the stopped status
   * 
   * @returns {void}
   */
  const stopSorting = () => {
    shouldStopRef.current = true;
    setIsStopped(true);
    setIsSorting(false);
  };

  /**
   * Initiates the sorting process with the selected algorithm
   * 
   * Executes the chosen sorting algorithm on the current array and
   * measures performance metrics (time, swaps, comparisons)
   * 
   * @returns {Promise<void>}
   */
  const startSorting = async () => {
    // Reset sorting state
    shouldStopRef.current = false;
    setIsStopped(false);
    setIsSorting(true);
    const startTime = performance.now();
    
    let metrics = { swaps: 0, comparisons: 0 };
    try {
      // Execute the selected sorting algorithm
      switch (algorithm) {
        case 'bubble':
          metrics = await bubbleSort(array, setArray, speed, setCurrentBar, shouldStopRef);
          break;
        case 'insertion':
          metrics = await insertionSort(array, setArray, speed, setCurrentBar, shouldStopRef);
          break;
        case 'selection':
          metrics = await selectionSort(array, setArray, speed, setCurrentBar, shouldStopRef);
          break;
        case 'quick':
          metrics = await quickSort(array, setArray, speed, setCurrentBar, shouldStopRef);
          break;
        case 'merge':
          metrics = await mergeSort(array, setArray, speed, setCurrentBar, shouldStopRef);
          break;
        case 'radix':
          metrics = await radixSort(array, setArray, speed, setCurrentBar, shouldStopRef);
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

    // Calculate and record performance metrics
    const endTime = performance.now();
    setMetrics({
      swaps: metrics.swaps || 0,
      comparisons: metrics.comparisons || 0,
      time: (endTime - startTime).toFixed(2),
    });

    setIsSorting(false);
  };

  /**
   * Benchmarks all sorting algorithms on the same array for comparison
   * 
   * Runs each algorithm sequentially on the same input data, collects
   * performance metrics, and ranks them by execution time
   * 
   * @returns {Promise<void>}
   */
  const testAllAlgorithms = async () => {
    setIsSorting(true);
    shouldStopRef.current = false;
    setIsStopped(false);
    
    const algorithms = ['bubble', 'insertion', 'selection', 'quick', 'merge', 'radix'];
    const results = {};
    
    // Clone the original array for consistent testing
    const originalArray = [...array];
    
    // Test each algorithm sequentially
    for (const algo of algorithms) {
      if (shouldStopRef.current) break; // Stop if user cancelled
      
      // Update UI to show current algorithm being tested
      setCurrentTestingAlgo(algo);
      setArray([...originalArray]);
      const startTime = performance.now();
      
      let metrics = { swaps: 0, comparisons: 0 };
      try {
        // Execute the current algorithm
        switch (algo) {
          case 'bubble':
            metrics = await bubbleSort([...originalArray], setArray, speed, setCurrentBar, shouldStopRef);
            break;
          case 'insertion':
            metrics = await insertionSort([...originalArray], setArray, speed, setCurrentBar, shouldStopRef);
            break;
          case 'selection':
            metrics = await selectionSort([...originalArray], setArray, speed, setCurrentBar, shouldStopRef);
            break;
          case 'quick':
            metrics = await quickSort([...originalArray], setArray, speed, setCurrentBar, shouldStopRef);
            break;
          case 'merge':
            metrics = await mergeSort([...originalArray], setArray, speed, setCurrentBar, shouldStopRef);
            break;
          case 'radix':
            metrics = await radixSort([...originalArray], setArray, speed, setCurrentBar, shouldStopRef);
            break;
          default:
            break;
        }
        
        // Record metrics for this algorithm
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
    
    // Reset testing state and update results
    setCurrentTestingAlgo(null);
    setCompareMetrics(results);
    
    // Sort algorithms by execution time (fastest first)
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

  //=============================================================================
  // UTILITY FUNCTIONS
  //=============================================================================
  
  /**
   * Provides algorithm complexity and performance characteristics
   * 
   * Returns time/space complexity and descriptive information for
   * the currently selected sorting algorithm
   * 
   * @returns {Object} Complexity data for the current algorithm
   */
  const getAlgorithmTimeComplexity = () => {
    const complexities = {
      bubble: { 
        best: "O(n)", 
        average: "O(n²)", 
        worst: "O(n²)", 
        space: "O(1)",
        description: "Simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
        efficiency: "low",
        color: "red"
      },
      insertion: { 
        best: "O(n)", 
        average: "O(n²)", 
        worst: "O(n²)", 
        space: "O(1)",
        description: "Builds the sorted array one item at a time by comparing each new element with the already sorted elements and inserting it into the correct position.",
        efficiency: "medium-low",
        color: "orange"
      },
      selection: { 
        best: "O(n²)", 
        average: "O(n²)", 
        worst: "O(n²)", 
        space: "O(1)",
        description: "Repeatedly finds the minimum element from the unsorted part and puts it at the beginning of the unsorted part.",
        efficiency: "low",
        color: "red"
      },
      quick: { 
        best: "O(n log n)", 
        average: "O(n log n)", 
        worst: "O(n²)", 
        space: "O(log n)",
        description: "Divide-and-conquer algorithm that picks a 'pivot' element and partitions the array around the pivot, recursively sorting the sub-arrays.",
        efficiency: "high",
        color: "green"
      },
      merge: { 
        best: "O(n log n)", 
        average: "O(n log n)", 
        worst: "O(n log n)", 
        space: "O(n)",
        description: "Divide-and-conquer algorithm that divides the array into two halves, sorts them separately, and then merges the sorted halves.",
        efficiency: "high",
        color: "green"
      },
      radix: { 
        best: "O(nk)", 
        average: "O(nk)", 
        worst: "O(nk)", 
        space: "O(n+k)",
        description: "Non-comparative sorting algorithm that sorts data with integer keys by grouping keys by individual digits which share the same position and value.",
        efficiency: "high",
        color: "green"
      }
    };
    return complexities[algorithm];
  };

  //=============================================================================
  // COMPONENT RENDERING
  //=============================================================================
  
  return (
    <Card className="w-full max-w-5xl mx-auto border-slate-800 bg-slate-950 text-slate-200 shadow-lg">
      {/* Animation keyframes */}
      <style jsx>{`
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
      `}</style>
      
      {/* Application header */}
      <CardHeader className="border-b border-slate-800 bg-slate-900">
        <div className="flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <CardTitle className="font-mono flex items-center">
            <Terminal className="mr-2 h-5 w-5" />
            <span className="text-emerald-400">sort</span>
            <span className="text-purple-400">()</span>
            <span className="text-slate-400 text-sm ml-2">// algorithm visualizer</span>
          </CardTitle>
        </div>
      </CardHeader>
      
      {/* Main content area */}
      <CardContent className="p-6 space-y-6">
        <Tabs defaultValue="controls" className="w-full">
          {/* Tab navigation */}
          <TabsList className="grid w-full grid-cols-3 bg-slate-900">
            <TabsTrigger value="controls" className="font-mono">
              <span className="text-emerald-400">config</span>
              <span className="text-slate-400">.js</span>
            </TabsTrigger>
            <TabsTrigger value="metrics" className="font-mono">
              <span className="text-emerald-400">metrics</span>
              <span className="text-slate-400">.js</span>
            </TabsTrigger>
            <TabsTrigger value="details" className="font-mono">
              <span className="text-emerald-400">details</span>
              <span className="text-slate-400">.js</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Configuration panel */}
          <TabsContent value="controls" className="space-y-4 mt-4">
            <ConfigPanel 
              algorithm={algorithm}
              setAlgorithm={setAlgorithm}
              arraySize={arraySize}
              setArraySize={setArraySize}
              speed={speed}
              setSpeed={setSpeed}
              isSorting={isSorting}
              getAlgorithmTimeComplexity={getAlgorithmTimeComplexity}
              array={array}
              currentBar={currentBar}
              currentTestingAlgo={currentTestingAlgo}
              isStopped={isStopped}
              generateNewArray={generateNewArray}
              startSorting={startSorting}
              stopSorting={stopSorting}
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
          
          {/* Algorithm visualization panel */}
          <TabsContent value="details" className="space-y-4 mt-4">
            <VisualizationPanel 
              algorithm={algorithm}
              array={array}
              currentBar={currentBar}
              isSorting={isSorting}
              currentTestingAlgo={currentTestingAlgo}
              isStopped={isStopped}
              setAlgorithm={setAlgorithm}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SortingVisualizer; 