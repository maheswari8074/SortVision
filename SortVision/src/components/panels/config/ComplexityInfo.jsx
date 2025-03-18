import React from 'react';
import { Info, Database, Timer, Rocket, Clock, Hourglass, AlertTriangle, CheckCircle2 } from 'lucide-react';

const ComplexityInfo = ({ getAlgorithmTimeComplexity }) => {
  return (
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
  );
};

export default ComplexityInfo; 