import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Timer } from 'lucide-react';

const SpeedControl = ({ speed, setSpeed, isSorting }) => {
  return (
    <div className="bg-slate-900 p-4 rounded border border-slate-800 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-yellow-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <label className="font-mono text-sm text-slate-400 mb-2 block flex items-center">
        <Timer className="mr-2 h-4 w-4 text-emerald-400 animate-pulse" />
        // animation speed: <span className="text-emerald-400 ml-1">{speed}ms</span>
      </label>
      <div className="relative mt-6 mb-8">
        <div className="absolute -top-4 left-0 right-0 flex justify-between text-[10px] text-slate-500">
          <span className="text-emerald-400/70">Fast</span>
          <span className="text-emerald-400/70">Medium</span>
          <span className="text-emerald-400/70">Slow</span>
        </div>
        <div className="relative">
          {/* Track background with glow */}
          <div className="absolute inset-0 bg-emerald-400/5 rounded-full"></div>
          {/* Active track */}
          <div 
            className="absolute h-full bg-emerald-400/20 rounded-full transition-all duration-300"
            style={{ width: `${((speed - 1) / (1000 - 1)) * 100}%` }}
          ></div>
          <Slider
            value={[speed]}
            min={1}
            max={1000}
            step={1}
            onValueChange={(value) => setSpeed(value[0])}
            disabled={isSorting}
            className="relative z-10"
          />
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-emerald-400/10 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] text-slate-500">
          <span>1ms</span>
          <span>500ms</span>
          <span>1000ms</span>
        </div>
      </div>
      {/* Speed Control Status Bar */}
      <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-sm mr-1 animate-pulse ${
            speed < 100 ? "bg-emerald-400/30" : 
            speed < 500 ? "bg-yellow-400/30" : 
            "bg-red-400/30"
          }`}></div>
          <span className={
            speed < 100 ? "text-emerald-400" : 
            speed < 500 ? "text-yellow-400" : 
            "text-red-400"
          }>Delay: {speed}ms</span>
        </div>

        {/* Speed adjustment buttons - moved to status bar */}
        <div className="flex space-x-1">
          <button
            onClick={() => {
              if (!isSorting && speed < 1000) {
                const newSpeed = Math.min(1000, speed * 2);
                setSpeed(newSpeed);
              }
            }}
            disabled={isSorting || speed >= 1000}
            className="group relative w-6 h-6 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 flex items-center justify-center text-emerald-400 font-mono text-[10px]">2x</div>
            <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-400/50 w-0 group-hover:w-full transition-all duration-300"></div>
          </button>
          <button
            onClick={() => {
              if (!isSorting && speed > 1) {
                const newSpeed = Math.max(1, speed / 2);
                setSpeed(newSpeed);
              }
            }}
            disabled={isSorting || speed <= 1}
            className="group relative w-6 h-6 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 flex items-center justify-center text-emerald-400 font-mono text-[10px]">½x</div>
            <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-400/50 w-0 group-hover:w-full transition-all duration-300"></div>
          </button>
        </div>

        <div className="text-[10px] text-emerald-400/50">
          {speed < 100 ? "Visualize patterns" : speed < 500 ? "Follow the steps" : "Detailed analysis"}
        </div>
      </div>
      
      {/* Visual speed representation */}
      <div className="mt-4 h-8 bg-slate-800 rounded-lg border border-slate-700 overflow-hidden relative">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 transition-all duration-300"
          style={{ width: `${((speed - 1) / (1000 - 1)) * 100}%` }}
        >
          <div className="absolute inset-y-0 right-0 w-1 bg-emerald-400/30 animate-pulse"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-[10px] text-emerald-400/70 font-mono">
          {speed}ms delay
        </div>
      </div>
    </div>
  );
};

export default SpeedControl; 