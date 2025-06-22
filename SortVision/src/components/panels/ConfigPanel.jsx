import React from 'react';
import { ArrayVisualization } from '../visualizations';
import { AlgorithmSelector, ComplexityInfo, ArraySizeControl, SpeedControl, ControlButtons } from './config';

/**
 * ConfigPanel Component
 * 
 * Handles all configuration controls for the sorting visualizer including:
 * - Algorithm selection
 * - Complexity information
 * - Array size control
 * - Animation speed control
 * - Control buttons (new array, start/stop)
 * - Array visualization
 */
const ConfigPanel = ({ 
  algorithm, 
  setAlgorithm, 
  arraySize,
  setArraySize, 
  speed,
  setSpeed, 
  isSorting,
  getAlgorithmTimeComplexity,
  array,
  currentBar,
  currentTestingAlgo,
  isStopped,
  generateNewArray,
  startSorting,
  stopSorting,
  audio,
  // Props for Parallel Sorting
  startParallelSorting,
  isParallelSorting,
  numThreads,
  setNumThreads
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Algorithm Selection */}
        <AlgorithmSelector
          algorithm={algorithm} 
          setAlgorithm={setAlgorithm} 
          isSorting={isSorting}
          audio={audio}
        />
        
        {/* Algorithm Complexity Information */}
        <ComplexityInfo
          getAlgorithmTimeComplexity={getAlgorithmTimeComplexity}
        />
        
        {/* Array Size Control */}
        <ArraySizeControl
          arraySize={arraySize}
          setArraySize={setArraySize} 
          isSorting={isSorting}
        />
        
        {/* Animation Speed Control */}
        <SpeedControl
          speed={speed}
          setSpeed={setSpeed} 
          isSorting={isSorting || isParallelSorting}
          audio={audio}
        />

        {/* Thread Count Control for Parallel Sorting */}
        <div className="space-y-1">
          <label htmlFor="numThreads" className="text-xs font-medium text-slate-400">
            Thread Count (1-{navigator.hardwareConcurrency || 16})
          </label>
          <input
            type="number"
            id="numThreads"
            name="numThreads"
            value={numThreads}
            onChange={(e) => setNumThreads(e.target.value)}
            min="1"
            max={navigator.hardwareConcurrency || 16}
            disabled={isSorting || isParallelSorting}
            className="w-full p-2 bg-slate-800 border border-slate-700 rounded-md text-slate-200 focus:ring-emerald-500 focus:border-emerald-500"
            aria-describedby="numThreads-description"
          />
          <p id="numThreads-description" className="text-xs text-slate-500">
            Number of threads for parallel execution.
          </p>
        </div>
      </div>
      
      {/* Control Buttons */}
      <ControlButtons
        generateNewArray={generateNewArray}
        startSorting={startSorting}
        stopSorting={stopSorting}
        isSorting={isSorting}
        // Parallel props
        startParallelSorting={startParallelSorting}
        isParallelSorting={isParallelSorting}
      />
      
      {/* Add the array visualization */}
      {array && (
        <ArrayVisualization
          algorithm={algorithm}
          array={array}
          currentBar={currentBar}
          isSorting={isSorting || isParallelSorting}
          currentTestingAlgo={currentTestingAlgo}
          isStopped={isStopped}
          height="h-100"
        />
      )}
    </div>
  );
};

export default ConfigPanel; 