import React, { useState, useEffect, useRef } from 'react';
import { bubbleSort, insertionSort, selectionSort, quickSort, mergeSort, radixSort } from '../algorithms';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal, Crown } from 'lucide-react';

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
      bubble: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
      insertion: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
      selection: { best: "O(n²)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
      quick: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)", space: "O(log n)" },
      merge: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
      radix: { best: "O(nk)", average: "O(nk)", worst: "O(nk)", space: "O(n+k)" }
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
          <TabsList className="grid w-full grid-cols-2 bg-slate-900">
            <TabsTrigger value="controls" className="font-mono">
              <span className="text-emerald-400">config</span>
              <span className="text-slate-400">.js</span>
            </TabsTrigger>
            <TabsTrigger value="metrics" className="font-mono">
              <span className="text-emerald-400">metrics</span>
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
                <label className="font-mono text-sm text-slate-400 mb-2 block">// complexity</label>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <Badge variant="outline" className="bg-slate-800 text-amber-400">Best: {getAlgorithmTimeComplexity().best}</Badge>
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-slate-800 text-amber-400">Avg: {getAlgorithmTimeComplexity().average}</Badge>
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-slate-800 text-amber-400">Worst: {getAlgorithmTimeComplexity().worst}</Badge>
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-slate-800 text-amber-400">Space: {getAlgorithmTimeComplexity().space}</Badge>
                  </div>
                </div>
              </div>
              
              {/* Array Size Control */}
              <div className="bg-slate-900 p-4 rounded border border-slate-800">
                <label className="font-mono text-sm text-slate-400 mb-2 block">// array size: {arraySize}</label>
                <Slider
                  value={[arraySize]}
                  min={10}
                  max={100}
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
                  max={100}
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
                className="bg-slate-800 border-slate-700 text-emerald-400 hover:bg-slate-700 hover:text-emerald-300 font-mono"
              >
                new_array()
              </Button>
              
              <Button 
                onClick={startSorting} 
                disabled={isSorting}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono"
              >
                {isSorting ? "sorting..." : "start()"}
              </Button>
              
              <Button 
                variant="destructive" 
                onClick={stopSorting} 
                disabled={!isSorting}
                className="font-mono"
              >
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
                  <div className="text-xs text-slate-400 mb-1">SWAPS</div>
                  <div className="text-xl text-emerald-400 font-mono">{metrics.swaps}</div>
                </div>
                <div className="bg-slate-800 p-3 rounded border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">COMPARISONS</div>
                  <div className="text-xl text-emerald-400 font-mono">{metrics.comparisons}</div>
                </div>
                <div className="bg-slate-800 p-3 rounded border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">TIME (MS)</div>
                  <div className="text-xl text-emerald-400 font-mono">{metrics.time}</div>
                </div>
              </div>
            </div>

            {/* Algorithm Comparison Section */}
            <div className="bg-slate-900 p-4 rounded border border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <div className="font-mono text-sm text-slate-400">// algorithm comparison</div>
                <Button 
                  onClick={testAllAlgorithms} 
                  disabled={isSorting}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-mono text-sm"
                >
                  test_all()
                </Button>
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
                      <div className="text-slate-400">
                        Swaps: <span className="text-amber-400">{metrics.swaps}</span>
                      </div>
                      <div className="text-slate-400">
                        Comparisons: <span className="text-amber-400">{metrics.comparisons}</span>
                      </div>
                      <div className="text-slate-400">
                        Time: <span className="text-amber-400">{metrics.time}ms</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Winner summary */}
              {sortedMetrics.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <div className="text-xs text-slate-400 font-mono">
                    // Winner: <span className="text-yellow-500">{sortedMetrics[0]?.algo}_sort()</span> 
                    <span className="text-slate-500">
                      ({sortedMetrics[0]?.metrics.time}ms)
                    </span>
                  </div>
                </div>
              )}
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