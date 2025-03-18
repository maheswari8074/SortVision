import React from 'react';
import { ArrayVisualization } from '../visualizations';
import { AlgorithmSelector, ComplexityInfo, ArraySizeControl, SpeedControl, ControlButtons } from './config';

/**
 * ConfigPanel Component
 * 
 * Handles the configuration controls for the sorting visualizer:
 * - Algorithm selection
 * - Algorithm complexity information
 * - Array size control
 * - Animation speed control
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
  stopSorting
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Algorithm Selection */}
        <AlgorithmSelector 
          algorithm={algorithm} 
          setAlgorithm={setAlgorithm} 
          isSorting={isSorting}
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
          isSorting={isSorting}
        />
      </div>
      
      {/* Control Buttons */}
      <ControlButtons 
        generateNewArray={generateNewArray}
        startSorting={startSorting}
        stopSorting={stopSorting}
        isSorting={isSorting}
      />
      
      {/* Add the array visualization */}
      {array && (
        <ArrayVisualization
          algorithm={algorithm}
          array={array}
          currentBar={currentBar}
          isSorting={isSorting}
          currentTestingAlgo={currentTestingAlgo}
          isStopped={isStopped}
          height="h-100"
        />
      )}
    </div>
  );
};

export default ConfigPanel; 