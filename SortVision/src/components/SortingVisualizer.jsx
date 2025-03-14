import React, { useState, useEffect, useRef } from 'react';
import { bubbleSort, insertionSort, selectionSort, quickSort, mergeSort, radixSort } from '../algorithms';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal, Crown, RefreshCw, Play, Square, BarChart2, Zap, StopCircle, Beaker, Clock, Hourglass, Database, Info, AlertTriangle, CheckCircle2, Timer, Rocket } from 'lucide-react';

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Algorithm Selection */}
              <div className="bg-slate-900 p-4 rounded border border-slate-800">
                <label className="font-mono text-sm text-slate-400 mb-2 block">// select algorithm</label>
                <Select value={algorithm} onValueChange={setAlgorithm} disabled={isSorting}>
                  <SelectTrigger className="w-full bg-slate-800 border-slate-700 text-emerald-400 font-mono">
                    <SelectValue placeholder="Algorithm" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-emerald-400 font-mono">
                    <SelectItem value="bubble">Bubble Sort</SelectItem>
                    <SelectItem value="insertion">Insertion Sort</SelectItem>
                    <SelectItem value="selection">Selection Sort</SelectItem>
                    <SelectItem value="quick">Quick Sort</SelectItem>
                    <SelectItem value="merge">Merge Sort</SelectItem>
                    <SelectItem value="radix">Radix Sort</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Algorithm Complexity Information */}
              <div className="bg-slate-900 p-4 rounded border border-slate-800">
                <label className="font-mono text-sm text-slate-400 mb-2 flex items-center">
                  <Info className="mr-2 h-4 w-4" />
                  // algorithm complexity
                </label>
                
                {/* Efficiency indicator */}
                <div className="mb-3 bg-slate-800 p-2 rounded border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">EFFICIENCY RATING</div>
                  <div className="flex items-center">
                    <div className={`font-bold text-sm flex items-center ${
                      getAlgorithmTimeComplexity().color === "red" ? "text-red-500" : 
                      getAlgorithmTimeComplexity().color === "orange" ? "text-orange-500" : 
                      getAlgorithmTimeComplexity().color === "yellow" ? "text-yellow-500" : 
                      getAlgorithmTimeComplexity().color === "blue" ? "text-blue-500" : 
                      "text-green-500"
                    }`}>
                      {getAlgorithmTimeComplexity().efficiency === "high" && <Rocket className="mr-1 h-4 w-4" />}
                      {getAlgorithmTimeComplexity().efficiency === "medium-high" && <CheckCircle2 className="mr-1 h-4 w-4" />}
                      {getAlgorithmTimeComplexity().efficiency === "medium" && <Clock className="mr-1 h-4 w-4" />}
                      {getAlgorithmTimeComplexity().efficiency === "medium-low" && <Hourglass className="mr-1 h-4 w-4" />}
                      {getAlgorithmTimeComplexity().efficiency === "low" && <AlertTriangle className="mr-1 h-4 w-4" />}
                      {getAlgorithmTimeComplexity().efficiency.charAt(0).toUpperCase() + getAlgorithmTimeComplexity().efficiency.slice(1)}
                    </div>
                    <div className="ml-auto">
                      <div className="flex space-x-1">
                        <div className={`h-2 w-2 rounded-full ${getAlgorithmTimeComplexity().efficiency === "low" || getAlgorithmTimeComplexity().efficiency === "medium-low" || getAlgorithmTimeComplexity().efficiency === "medium" || getAlgorithmTimeComplexity().efficiency === "medium-high" || getAlgorithmTimeComplexity().efficiency === "high" ? 'bg-red-500' : 'bg-slate-700'}`}></div>
                        <div className={`h-2 w-2 rounded-full ${getAlgorithmTimeComplexity().efficiency === "medium-low" || getAlgorithmTimeComplexity().efficiency === "medium" || getAlgorithmTimeComplexity().efficiency === "medium-high" || getAlgorithmTimeComplexity().efficiency === "high" ? 'bg-orange-500' : 'bg-slate-700'}`}></div>
                        <div className={`h-2 w-2 rounded-full ${getAlgorithmTimeComplexity().efficiency === "medium" || getAlgorithmTimeComplexity().efficiency === "medium-high" || getAlgorithmTimeComplexity().efficiency === "high" ? 'bg-yellow-500' : 'bg-slate-700'}`}></div>
                        <div className={`h-2 w-2 rounded-full ${getAlgorithmTimeComplexity().efficiency === "medium-high" || getAlgorithmTimeComplexity().efficiency === "high" ? 'bg-blue-500' : 'bg-slate-700'}`}></div>
                        <div className={`h-2 w-2 rounded-full ${getAlgorithmTimeComplexity().efficiency === "high" ? 'bg-green-500' : 'bg-slate-700'}`}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Time complexity */}
                <div className="mb-3">
                  <div className="text-xs text-slate-400 mb-1 flex items-center">
                    <Timer className="mr-1 h-3 w-3" /> TIME COMPLEXITY
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-800 p-2 rounded border border-slate-700">
                      <div className="text-[10px] text-slate-500 mb-1">BEST CASE</div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 text-green-500 mr-1" />
                        <span className="text-green-500 font-mono text-xs">{getAlgorithmTimeComplexity().best}</span>
                      </div>
                    </div>
                    <div className="bg-slate-800 p-2 rounded border border-slate-700">
                      <div className="text-[10px] text-slate-500 mb-1">AVERAGE</div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 text-yellow-500 mr-1" />
                        <span className="text-yellow-500 font-mono text-xs">{getAlgorithmTimeComplexity().average}</span>
                      </div>
                    </div>
                    <div className="bg-slate-800 p-2 rounded border border-slate-700">
                      <div className="text-[10px] text-slate-500 mb-1">WORST CASE</div>
                      <div className="flex items-center">
                        <Hourglass className="h-3 w-3 text-red-500 mr-1" />
                        <span className="text-red-500 font-mono text-xs">{getAlgorithmTimeComplexity().worst}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Space complexity */}
                <div className="mb-3">
                  <div className="text-xs text-slate-400 mb-1 flex items-center">
                    <Database className="mr-1 h-3 w-3" /> SPACE COMPLEXITY
                  </div>
                  <div className="bg-slate-800 p-2 rounded border border-slate-700 flex items-center">
                    <span className="text-blue-400 font-mono text-xs">{getAlgorithmTimeComplexity().space}</span>
                  </div>
                </div>
                
                {/* Description */}
                <div className="text-[10px] text-slate-400 italic border-t border-slate-800 pt-2 mt-2">
                  {getAlgorithmTimeComplexity().description}
                </div>
              </div>
              
              {/* Array Size Control */}
              <div className="bg-slate-900 p-4 rounded border border-slate-800">
                <label className="font-mono text-sm text-slate-400 mb-2 block">// array size: {arraySize}</label>
                <Slider
                  value={[arraySize]}
                  min={10}
                  max={200}
                  step={1}
                  onValueChange={(value) => setArraySize(value[0])}
                  disabled={isSorting}
                  className="mt-1"
                />
              </div>
              
              {/* Animation Speed Control */}
              <div className="bg-slate-900 p-4 rounded border border-slate-800">
                <label className="font-mono text-sm text-slate-400 mb-2 block">// animation speed: {speed}ms</label>
                <Slider
                  value={[speed]}
                  min={1}
                  max={1000}
                  step={1}
                  onValueChange={(value) => setSpeed(value[0])}
                  disabled={isSorting}
                  className="mt-1"
                />
              </div>
            </div>
            
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
            {/* Current Run Metrics */}
            <div className="bg-slate-900 p-4 rounded border border-slate-800">
              <div className="font-mono text-sm text-slate-400 mb-4">// current run metrics</div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-800 p-3 rounded border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1 flex items-center">
                    <RefreshCw className="mr-1 h-3 w-3" /> SWAPS
                  </div>
                  <div className="text-xl text-emerald-400 font-mono">{metrics.swaps}</div>
                </div>
                <div className="bg-slate-800 p-3 rounded border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1 flex items-center">
                    <BarChart2 className="mr-1 h-3 w-3" /> COMPARISONS
                  </div>
                  <div className="text-xl text-emerald-400 font-mono">{metrics.comparisons}</div>
                </div>
                <div className="bg-slate-800 p-3 rounded border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1 flex items-center">
                    <Zap className="mr-1 h-3 w-3" /> TIME (MS)
                  </div>
                  <div className="text-xl text-emerald-400 font-mono">{metrics.time}</div>
                </div>
              </div>
            </div>

            {/* Algorithm Comparison Section */}
            <div className="bg-slate-900 p-4 rounded border border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <div className="font-mono text-sm text-slate-400">// algorithm comparison</div>
                <div className="flex space-x-2">
                  <Button 
                    onClick={testAllAlgorithms} 
                    disabled={isSorting && !currentTestingAlgo}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-mono text-sm flex items-center"
                  >
                    <Beaker className="mr-2 h-4 w-4" />
                    test_all()
                  </Button>
                  
                  <Button 
                    variant="destructive" 
                    onClick={stopSorting} 
                    disabled={!currentTestingAlgo}
                    className="font-mono text-sm flex items-center"
                  >
                    <StopCircle className="mr-2 h-4 w-4" />
                    stop_test()
                  </Button>
                </div>
              </div>
              
              {/* Algorithm Ranking Cards */}
              <div className="space-y-2">
                {sortedMetrics.map(({ algo, metrics, rank }) => (
                  <div 
                    key={algo} 
                    className={`bg-slate-800 p-3 rounded border ${
                      rank === 1 ? 'border-yellow-500' : 'border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-emerald-400 font-mono mb-2">
                        {algo}_sort()
                        {/* Crown icon for the winner */}
                        {rank === 1 && (
                          <Crown 
                            className="inline-block ml-2 text-yellow-500"
                            style={{
                              animation: 'bounce 1s ease-in-out infinite',
                              height: '16px',
                              width: '16px'
                            }}
                          />
                        )}
                      </div>
                      {/* Rank badge */}
                      <Badge 
                        variant="outline" 
                        className={`
                          ${rank === 1 ? 'bg-yellow-500/10 text-yellow-500' : 
                            rank === 2 ? 'bg-slate-400/10 text-slate-400' :
                            rank === 3 ? 'bg-amber-700/10 text-amber-700' :
                            'bg-slate-700/10 text-slate-500'}
                        `}
                      >
                        #{rank}
                      </Badge>
                    </div>
                    {/* Algorithm metrics */}
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-slate-400 flex items-center">
                        <RefreshCw className="mr-1 h-3 w-3 text-amber-400" />
                        Swaps: <span className="text-amber-400 ml-1">{metrics.swaps}</span>
                      </div>
                      <div className="text-slate-400 flex items-center">
                        <BarChart2 className="mr-1 h-3 w-3 text-amber-400" />
                        Comparisons: <span className="text-amber-400 ml-1">{metrics.comparisons}</span>
                      </div>
                      <div className="text-slate-400 flex items-center">
                        <Zap className="mr-1 h-3 w-3 text-amber-400" />
                        Time: <span className="text-amber-400 ml-1">{metrics.time}ms</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Winner summary */}
              {sortedMetrics.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <div className="text-xs text-slate-400 font-mono flex items-center">
                    <Crown className="mr-1 h-4 w-4 text-yellow-500" />
                    // Winner: <span className="text-yellow-500">{sortedMetrics[0]?.algo}_sort()</span> 
                    <span className="text-slate-500">
                      ({sortedMetrics[0]?.metrics.time}ms)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Details Tab - In-depth algorithm information */}
          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="bg-slate-900 p-4 rounded border border-slate-800">
              <div className="font-mono text-sm text-slate-400 mb-4 flex items-center">
                <Info className="mr-2 h-4 w-4" />
                // {algorithm}_sort() details
              </div>
              
              {/* Algorithm visualization */}
              <div className="bg-slate-800 p-3 rounded border border-slate-700 mb-4">
                <div className="text-xs text-slate-400 mb-2">VISUALIZATION</div>
                <div className="flex justify-center p-2 bg-slate-900 rounded">
                  {algorithm === "bubble" && (
                    <pre className="text-xs text-emerald-400 font-mono">
                      <code>{`for i = 0 to n-1
  for j = 0 to n-i-1
    if arr[j] > arr[j+1]
      swap(arr[j], arr[j+1])`}</code>
                    </pre>
                  )}
                  {algorithm === "insertion" && (
                    <pre className="text-xs text-emerald-400 font-mono">
                      <code>{`for i = 1 to n-1
  key = arr[i]
  j = i-1
  while j >= 0 and arr[j] > key
    arr[j+1] = arr[j]
    j = j-1
  arr[j+1] = key`}</code>
                    </pre>
                  )}
                  {algorithm === "selection" && (
                    <pre className="text-xs text-emerald-400 font-mono">
                      <code>{`for i = 0 to n-1
  min_idx = i
  for j = i+1 to n
    if arr[j] < arr[min_idx]
      min_idx = j
  swap(arr[i], arr[min_idx])`}</code>
                    </pre>
                  )}
                  {algorithm === "quick" && (
                    <pre className="text-xs text-emerald-400 font-mono">
                      <code>{`function quickSort(arr, low, high)
  if low < high
    pi = partition(arr, low, high)
    quickSort(arr, low, pi-1)
    quickSort(arr, pi+1, high)

function partition(arr, low, high)
  pivot = arr[high]
  i = low - 1
  for j = low to high-1
    if arr[j] <= pivot
      i++
      swap(arr[i], arr[j])
  swap(arr[i+1], arr[high])
  return i+1`}</code>
                    </pre>
                  )}
                  {algorithm === "merge" && (
                    <pre className="text-xs text-emerald-400 font-mono">
                      <code>{`function mergeSort(arr, l, r)
  if l < r
    m = l + (r - l) / 2
    mergeSort(arr, l, m)
    mergeSort(arr, m+1, r)
    merge(arr, l, m, r)

function merge(arr, l, m, r)`}</code>
                    </pre>
                  )}
                  {algorithm === "radix" && (
                    <pre className="text-xs text-emerald-400 font-mono">
                      <code>{`function radixSort(arr)
  max = getMax(arr)
  for exp = 1 while max/exp > 0
    countSort(arr, exp)
    exp *= 10

function countSort(arr, exp)`}</code>
                    </pre>
                  )}
                </div>
              </div>
              
              {/* Characteristics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-800 p-3 rounded border border-slate-700">
                  <div className="text-xs text-slate-400 mb-2">CHARACTERISTICS</div>
                  <ul className="text-xs space-y-1">
                    {algorithm === "bubble" && (
                      <>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Simple implementation</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> In-place sorting</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Stable sort</li>
                        <li className="flex items-center"><AlertTriangle className="h-3 w-3 text-red-400 mr-1" /> Poor performance on large datasets</li>
                      </>
                    )}
                    {algorithm === "insertion" && (
                      <>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Simple implementation</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> In-place sorting</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Stable sort</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Efficient for small datasets</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Adaptive (efficient for nearly sorted data)</li>
                      </>
                    )}
                    {algorithm === "selection" && (
                      <>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Simple implementation</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> In-place sorting</li>
                        <li className="flex items-center"><AlertTriangle className="h-3 w-3 text-red-400 mr-1" /> Not stable</li>
                        <li className="flex items-center"><AlertTriangle className="h-3 w-3 text-red-400 mr-1" /> Poor performance regardless of input</li>
                      </>
                    )}
                    {algorithm === "quick" && (
                      <>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Efficient for large datasets</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> In-place sorting</li>
                        <li className="flex items-center"><AlertTriangle className="h-3 w-3 text-red-400 mr-1" /> Not stable</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Good cache locality</li>
                        <li className="flex items-center"><AlertTriangle className="h-3 w-3 text-red-400 mr-1" /> Worst case on already sorted data</li>
                      </>
                    )}
                    {algorithm === "merge" && (
                      <>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Consistent performance</li>
                        <li className="flex items-center"><AlertTriangle className="h-3 w-3 text-red-400 mr-1" /> Not in-place (requires extra space)</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Stable sort</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Parallelizable</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Good for linked lists</li>
                      </>
                    )}
                    {algorithm === "radix" && (
                      <>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Linear time complexity</li>
                        <li className="flex items-center"><AlertTriangle className="h-3 w-3 text-red-400 mr-1" /> Not in-place (requires extra space)</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Stable sort</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Works well with fixed-length integers</li>
                        <li className="flex items-center"><AlertTriangle className="h-3 w-3 text-red-400 mr-1" /> Limited to specific data types</li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div className="bg-slate-800 p-3 rounded border border-slate-700">
                  <div className="text-xs text-slate-400 mb-2">IDEAL USE CASES</div>
                  <ul className="text-xs space-y-1">
                    {algorithm === "bubble" && (
                      <>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Educational purposes</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Very small datasets</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> When simplicity is more important than efficiency</li>
                      </>
                    )}
                    {algorithm === "insertion" && (
                      <>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Small datasets</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Nearly sorted data</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Online sorting (sorting as data arrives)</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> When stability is required</li>
                      </>
                    )}
                    {algorithm === "selection" && (
                      <>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Educational purposes</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> When memory writes are expensive</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Small datasets where simplicity matters</li>
                      </>
                    )}
                    {algorithm === "quick" && (
                      <>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> General-purpose sorting</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Large datasets</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Systems with good cache locality</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> When average case performance matters more than worst case</li>
                      </>
                    )}
                    {algorithm === "merge" && (
                      <>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> When stable sorting is needed</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> External sorting (when data doesn't fit in memory)</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Linked list sorting</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> When worst-case performance is important</li>
                      </>
                    )}
                    {algorithm === "radix" && (
                      <>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Sorting integers or strings of fixed length</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> When elements have a bounded range</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Large datasets of fixed-length keys</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> When linear time sorting is needed</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              
              {/* Fun fact */}
              <div className="bg-slate-800 p-3 rounded border border-slate-700">
                <div className="text-xs text-slate-400 mb-2">FUN FACT</div>
                <div className="text-xs text-amber-400 italic">
                  {algorithm === "bubble" && "Bubble Sort is named for the way smaller elements 'bubble' to the top of the list through exchanges."}
                  {algorithm === "insertion" && "Insertion Sort is similar to how many people sort playing cards in their hands."}
                  {algorithm === "selection" && "Selection Sort makes the minimum number of swaps possible (n-1 in the worst case)."}
                  {algorithm === "quick" && "Quick Sort was developed by Tony Hoare in 1959 while he was an exchange student at Moscow State University."}
                  {algorithm === "merge" && "Merge Sort was invented by John von Neumann in 1945, one of the earliest divide-and-conquer algorithms described."}
                  {algorithm === "radix" && "Radix Sort predates modern computers and was used with punch card sorting machines in the early 20th century."}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Visualization Area - Array bars */}
        <div className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2 h-80">
          <div className="flex justify-evenly items-end h-full">
            {array.map((value, index) => {
              // Determine bar color based on current operation
              let barColor = "bg-blue-500";
              
              if (currentBar.compare === index) {
                barColor = "bg-amber-500"; // Comparison color
              }
              if (currentBar.swap === index) {
                barColor = "bg-red-500"; // Swap color
              }
              
              return (
                <div
                  key={index}
                  className={`w-2 rounded-t ${barColor}`}
                  style={{
                    height: `${Math.max(value * 2.5, 5)}px`,
                    transition: "height 0.2s ease-in-out",
                  }}
                />
              );
            })}
          </div>
        </div>
        
        {/* Status footer */}
        <div className="text-xs text-slate-500 font-mono border-t border-slate-800 pt-2">
          // visualization of {array.length} elements | {
            currentTestingAlgo 
              ? `${currentTestingAlgo.charAt(0).toUpperCase() + currentTestingAlgo.slice(1)} Sort (Testing All)`
              : `${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort`
          }
          {isStopped && <span className="text-red-400 ml-2">// process terminated</span>}
        </div>
      </CardContent>
    </Card>
  );
};

export default SortingVisualizer; 