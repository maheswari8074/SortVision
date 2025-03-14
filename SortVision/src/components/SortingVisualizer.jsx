import React, { useState, useEffect, useRef } from 'react';
import { bubbleSort, insertionSort, selectionSort, quickSort, mergeSort, radixSort } from '../algorithms';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal, RefreshCw, Play, Square } from 'lucide-react';

// Import the new modular components
import ConfigPanel from './ConfigPanel';
import MetricsPanel from './MetricsPanel';
import VisualizationPanel from './VisualizationPanel';

/**
 * SortingVisualizer Component
 * 
 * A comprehensive visualization tool for various sorting algorithms.
 * Allows users to:
 * - Select different sorting algorithms
 * - Adjust array size and animation speed
 * - Compare performance metrics between algorithms
 * - Visualize the sorting process in real-time
 */
const SortingVisualizer = () => {
  //=============================================================================
  // STATE MANAGEMENT
  //=============================================================================
  
  // Core state for array and algorithm selection
  const [array, setArray] = useState([]); // The array to be sorted
  const [algorithm, setAlgorithm] = useState('bubble'); // Currently selected algorithm
  const [arraySize, setArraySize] = useState(30); // Size of the array to sort
  
  // Sorting process state
  const [isSorting, setIsSorting] = useState(false); // Whether sorting is in progress
  const [isStopped, setIsStopped] = useState(false); // Whether sorting was manually stopped
  const [speed, setSpeed] = useState(50); // Animation delay in milliseconds
  const [currentBar, setCurrentBar] = useState({ compare: null, swap: null }); // Tracks bars being compared/swapped
  
  // Performance metrics state
  const [metrics, setMetrics] = useState({ swaps: 0, comparisons: 0, time: 0 }); // Metrics for current run
  const [sortedMetrics, setSortedMetrics] = useState([]); // Sorted list of algorithm metrics for comparison
  const [currentTestingAlgo, setCurrentTestingAlgo] = useState(null); // Currently testing algorithm in test_all mode
  // eslint-disable-next-line no-unused-vars
  const [compareMetrics, setCompareMetrics] = useState({}); // Raw metrics data from all algorithms
  
  // Reference to track if sorting should be cancelled
  const shouldStopRef = useRef(false);

  //=============================================================================
  // ARRAY GENERATION AND MANAGEMENT
  //=============================================================================
  
  /**
   * Generates a new random array of the specified size
   * and resets the visualization state
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
  // SORTING CONTROL FUNCTIONS
  //=============================================================================
  
  /**
   * Stops the current sorting process
   */
  const stopSorting = () => {
    shouldStopRef.current = true; // Signal algorithms to stop
    setIsStopped(true);
    setIsSorting(false);
  };

  /**
   * Starts the sorting process with the selected algorithm
   */
  const startSorting = async () => {
    // Reset state for new sorting run
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

    // Calculate and update performance metrics
    const endTime = performance.now();
    setMetrics({
      swaps: metrics.swaps || 0,
      comparisons: metrics.comparisons || 0,
      time: (endTime - startTime).toFixed(2),
    });

    setIsSorting(false);
  };

  /**
   * Tests all sorting algorithms on the same array and compares their performance
   */
  const testAllAlgorithms = async () => {
    setIsSorting(true);
    shouldStopRef.current = false;
    setIsStopped(false);
    
    const algorithms = ['bubble', 'insertion', 'selection', 'quick', 'merge', 'radix'];
    const results = {};
    
    // Save original array to use for all algorithms
    const originalArray = [...array];
    
    // Test each algorithm
    for (const algo of algorithms) {
      if (shouldStopRef.current) break; // Stop if user cancelled
      
      // Update UI to show current algorithm being tested
      setCurrentTestingAlgo(algo);
      setArray([...originalArray]);
      const startTime = performance.now();
      
      let metrics = { swaps: 0, comparisons: 0 };
      try {
        // Run the current algorithm
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
    
    // Reset and update UI with results
    setCurrentTestingAlgo(null);
    setCompareMetrics(results);
    
    // Sort algorithms by time (fastest first)
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
  // LIFECYCLE HOOKS
  //=============================================================================
  
  /**
   * Generate a new array when component mounts or array size changes
   * Clean up by stopping any ongoing sorting when component unmounts
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
   * Returns the time and space complexity information for the selected algorithm
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
  // RENDER UI
  //=============================================================================
  
  return (
    <Card className="w-full max-w-5xl mx-auto border-slate-800 bg-slate-950 text-slate-200 shadow-lg">
      {/* Add keyframes for animations */}
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
      
      {/* Header with terminal-like styling */}
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
      
      <CardContent className="p-6 space-y-6">
        {/* Tabbed interface for controls and metrics */}
        <Tabs defaultValue="controls" className="w-full">
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
          
          {/* Controls Tab - Algorithm selection, array size, speed */}
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
            />
            
            {/* Control Buttons */}
            <div className="grid grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                onClick={generateNewArray} 
                disabled={isSorting}
                className="bg-slate-800 border-slate-700 text-emerald-400 hover:bg-slate-700 hover:text-emerald-300 font-mono flex items-center justify-center"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                new_array()
              </Button>
              
              <Button 
                onClick={startSorting} 
                disabled={isSorting}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono flex items-center justify-center"
              >
                <Play className="mr-2 h-4 w-4" />
                {isSorting ? "sorting..." : "start()"}
              </Button>
              
              <Button 
                variant="destructive" 
                onClick={stopSorting} 
                disabled={!isSorting}
                className="font-mono flex items-center justify-center"
              >
                <Square className="mr-2 h-4 w-4" />
                stop()
              </Button>
            </div>
          </TabsContent>
          
          {/* Metrics Tab - Performance data and algorithm comparison */}
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
          
          {/* Details Tab - In-depth algorithm information */}
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