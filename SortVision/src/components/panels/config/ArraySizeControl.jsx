import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Database } from 'lucide-react';

const ArraySizeControl = ({ arraySize, setArraySize, isSorting }) => {
  return (
    <div className="bg-slate-900 p-4 rounded border border-slate-800 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <label className="font-mono text-sm text-slate-400 mb-2 block flex items-center">
        <Database className="mr-2 h-4 w-4 text-blue-400 animate-pulse" />
        // array size: <span className="text-blue-400 ml-1">{arraySize}</span>
      </label>
      <div className="relative mt-6 mb-8">
        <div className="absolute -top-4 left-0 right-0 flex justify-between text-[10px] text-slate-500">
          <span className="text-blue-400/70">Small</span>
          <span className="text-blue-400/70">Medium</span>
          <span className="text-blue-400/70">Large</span>
        </div>
        <div className="relative">
          {/* Track background with glow */}
          <div className="absolute inset-0 bg-blue-400/5 rounded-full"></div>
          {/* Active track */}
          <div 
            className="absolute h-full bg-blue-400/20 rounded-full transition-all duration-300"
            style={{ width: `${((arraySize - 10) / (200 - 10)) * 100}%` }}
          ></div>
          <Slider
            value={[arraySize]}
            min={10}
            max={200}
            step={1}
            onValueChange={(value) => setArraySize(value[0])}
            disabled={isSorting}
            className="relative z-10"
          />
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-blue-400/10 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] text-slate-500">
          <span>10</span>
          <span>100</span>
          <span>200</span>
        </div>
      </div>
      {/* Array Size Control Status Bar */}
      <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-400/30 rounded-sm mr-1 animate-pulse"></div>
          <span className="text-blue-400">Elements: {arraySize}</span>
        </div>
        
        {/* Size adjustment buttons */}
        <div className="flex space-x-1">
          <button
            onClick={() => !isSorting && arraySize > 10 && setArraySize(arraySize - 10)}
            disabled={isSorting || arraySize <= 10}
            className="group relative w-6 h-6 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 flex items-center justify-center text-blue-400 font-mono text-[10px]">-10</div>
            <div className="absolute bottom-0 left-0 h-0.5 bg-blue-400/50 w-0 group-hover:w-full transition-all duration-300"></div>
          </button>
          <button
            onClick={() => {
              if (!isSorting && arraySize < 200) {
                const newSize = Math.min(200, arraySize + 10);
                setArraySize(newSize);
              }
            }}
            disabled={isSorting || arraySize >= 200}
            className="group relative w-6 h-6 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 flex items-center justify-center text-blue-400 font-mono text-[10px]">+10</div>
            <div className="absolute bottom-0 left-0 h-0.5 bg-blue-400/50 w-0 group-hover:w-full transition-all duration-300"></div>
          </button>
        </div>

        <div className="text-[10px] text-blue-400/50">
          {arraySize < 50 ? "Good for learning" : arraySize < 100 ? "Balanced" : "Performance test"}
        </div>
      </div>
      
      {/* Visual bar representation */}
      <div className="mt-4 h-8 bg-slate-800 rounded-lg border border-slate-700 overflow-hidden relative">
        <div 
          className="h-full bg-gradient-to-r from-blue-500/20 to-blue-400/20 transition-all duration-300"
          style={{ width: `${((arraySize - 10) / (200 - 10)) * 100}%` }}
        >
          <div className="absolute inset-y-0 right-0 w-1 bg-blue-400/30 animate-pulse"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-[10px] text-blue-400/70 font-mono">
          {arraySize} elements
        </div>
      </div>
    </div>
  );
};

export default ArraySizeControl; 