import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Terminal, Info, Database, Timer, Rocket, Clock, Hourglass, AlertTriangle, CheckCircle2, RefreshCw, Play, Square } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ArrayVisualization from './ArrayVisualization';

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
        <div className="bg-slate-900 p-4 rounded border border-slate-800 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <label className="font-mono text-sm text-slate-400 mb-2 block flex items-center">
            <Terminal className="mr-2 h-4 w-4 text-emerald-400" />
            // select algorithm
          </label>
          <Select value={algorithm} onValueChange={setAlgorithm} disabled={isSorting}>
            <SelectTrigger className="w-full bg-slate-800 border-slate-700 text-emerald-400 font-mono relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <SelectValue placeholder="Algorithm" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-emerald-400 font-mono">
              <SelectItem value="bubble" className="hover:bg-slate-700 transition-colors duration-200 flex items-center">
                <div className="flex items-center">
                  <div className="w-4 h-4 mr-2 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1 h-1 bg-red-400 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                  Bubble Sort
                </div>
              </SelectItem>
              <SelectItem value="insertion" className="hover:bg-slate-700 transition-colors duration-200 flex items-center">
                <div className="flex items-center">
                  <div className="w-4 h-4 mr-2 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-1 bg-orange-500 rounded-sm"></div>
                    </div>
                  </div>
                  Insertion Sort
                </div>
              </SelectItem>
              <SelectItem value="selection" className="hover:bg-slate-700 transition-colors duration-200 flex items-center">
                <div className="flex items-center">
                  <div className="w-4 h-4 mr-2 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 border border-amber-500 rounded-sm"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-sm"></div>
                    </div>
                  </div>
                  Selection Sort
                </div>
              </SelectItem>
              <SelectItem value="quick" className="hover:bg-slate-700 transition-colors duration-200 flex items-center">
                <div className="flex items-center">
                  <div className="w-4 h-4 mr-2 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 border-r-2 border-t-2 border-green-500 rounded-tr-md animate-spin" style={{ animationDuration: '3s' }}></div>
                    </div>
                  </div>
                  Quick Sort
                </div>
              </SelectItem>
              <SelectItem value="merge" className="hover:bg-slate-700 transition-colors duration-200 flex items-center">
                <div className="flex items-center">
                  <div className="w-4 h-4 mr-2 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1.5 h-3 bg-blue-500 rounded-sm"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center pl-2">
                      <div className="w-1.5 h-3 bg-purple-500 rounded-sm"></div>
                    </div>
                  </div>
                  Merge Sort
                </div>
              </SelectItem>
              <SelectItem value="radix" className="hover:bg-slate-700 transition-colors duration-200 flex items-center">
                <div className="flex items-center">
                  <div className="w-4 h-4 mr-2 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-sm animate-pulse"></div>
                    </div>
                  </div>
                  Radix Sort
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          
          {/* Algorithm Badge */}
          <div className="mt-3 flex justify-center">
            <div className={`
              px-3 py-1.5 rounded-full font-mono text-xs
              ${algorithm === 'bubble' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                algorithm === 'insertion' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 
                algorithm === 'selection' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                algorithm === 'quick' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                algorithm === 'merge' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'}
              flex items-center gap-2 transform hover:scale-105 transition-transform duration-200
            `}>
              {algorithm === 'bubble' && <div className="w-2 h-2 bg-red-400 rounded-full animate-ping opacity-75 inline-block"></div>}
              {algorithm === 'insertion' && <div className="w-2 h-2 bg-orange-400 rounded-sm inline-block"></div>}
              {algorithm === 'selection' && <div className="w-2 h-2 border border-amber-400 rounded-sm inline-block"></div>}
              {algorithm === 'quick' && <div className="w-2 h-2 border-r border-t border-green-400 rounded-tr-sm animate-spin inline-block" style={{ animationDuration: '3s' }}></div>}
              {algorithm === 'merge' && <div className="w-2 h-2 bg-blue-400 rounded-sm inline-block"></div>}
              {algorithm === 'radix' && <div className="w-2 h-2 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-sm animate-pulse inline-block"></div>}
              <span>{algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort</span>
            </div>
          </div>
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
        <div className="bg-slate-900 p-4 rounded border border-slate-800 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <label className="font-mono text-sm text-slate-400 mb-2 block flex items-center">
            <Database className="mr-2 h-4 w-4 text-blue-400" />
            // array size: <span className="text-blue-400">{arraySize}</span>
          </label>
          <div className="relative mt-6 mb-8">
            <div className="absolute -top-4 left-0 right-0 flex justify-between text-[10px] text-slate-500">
              <span>Small</span>
              <span>Medium</span>
              <span>Large</span>
            </div>
            <Slider
              value={[arraySize]}
              min={10}
              max={200}
              step={1}
              onValueChange={(value) => setArraySize(value[0])}
              disabled={isSorting}
              className="mt-1"
            />
            <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] text-slate-500">
              <span>10</span>
              <span>100</span>
              <span>200</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></div>
              <span>Elements: {arraySize}</span>
            </div>
          </div>
        </div>
        
        {/* Animation Speed Control */}
        <div className="bg-slate-900 p-4 rounded border border-slate-800 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-yellow-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <label className="font-mono text-sm text-slate-400 mb-2 block flex items-center">
            <Timer className="mr-2 h-4 w-4 text-green-400" />
            // animation speed: <span className="text-green-400">{speed}ms</span>
          </label>
          <div className="relative mt-6 mb-8">
            <div className="absolute -top-4 left-0 right-0 flex justify-between text-[10px] text-slate-500">
              <span>Fast</span>
              <span>Medium</span>
              <span>Slow</span>
            </div>
            <Slider
              value={[speed]}
              min={1}
              max={1000}
              step={1}
              onValueChange={(value) => setSpeed(value[0])}
              disabled={isSorting}
              className="mt-1"
            />
            <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] text-slate-500">
              <span>1ms</span>
              <span>500ms</span>
              <span>1000ms</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-sm mr-1 ${
                speed < 100 ? "bg-green-500" : 
                speed < 500 ? "bg-yellow-500" : 
                "bg-red-500"
              }`}></div>
              <span>Delay: {speed}ms</span>
            </div>
          </div>
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
      
      {/* Add the array visualization */}
      {array && (
        <ArrayVisualization
          algorithm={algorithm}
          array={array}
          currentBar={currentBar}
          isSorting={isSorting}
          currentTestingAlgo={currentTestingAlgo}
          isStopped={isStopped}
          height="h-100" // Corrected height value
        />
      )}
    </div>
  );
};

export default ConfigPanel; 