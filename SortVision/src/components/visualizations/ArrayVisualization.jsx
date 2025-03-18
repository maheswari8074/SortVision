import React, { useState } from 'react';

/**
 * ArrayVisualization Component
 * 
 * A reusable component for visualizing the array as bars.
 * Can be used in multiple tabs to show the current state of the array.
 */
const ArrayVisualization = ({ 
  algorithm, 
  array, 
  currentBar, 
  isSorting,
  currentTestingAlgo,
  isStopped,
  height = "h-96" // Increased default height to match the images
}) => {
  // State to track which bar is being hovered
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
  
  return (
    <div className="relative group">
      {/* Animated background glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/viz overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Animated grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>
            
            {/* Floating particles */}
            <div className="absolute h-2 w-2 rounded-full bg-blue-500/50 top-[10%] left-[20%] animate-pulse" style={{ animationDuration: '3s' }}></div>
            <div className="absolute h-1 w-1 rounded-full bg-indigo-500/50 top-[30%] left-[70%] animate-pulse" style={{ animationDuration: '2.3s' }}></div>
            <div className="absolute h-1.5 w-1.5 rounded-full bg-purple-500/50 top-[70%] left-[30%] animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute h-1 w-1 rounded-full bg-cyan-500/50 top-[60%] left-[80%] animate-pulse" style={{ animationDuration: '3.5s' }}></div>
            
            {/* Animated code lines */}
            <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
            <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
            <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
          </div>
        </div>
        
        {/* Animated corner accent */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-md group-hover/viz:scale-150 transition-transform duration-700"></div>
        
        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/viz:w-full bg-gradient-to-r from-blue-500/50 via-indigo-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

        {/* Chart rendering */}
        <div className={`w-full ${height || 'h-64'} relative z-10`}>
          {/* Algorithm-specific background effect */}
          <div className={`absolute inset-0 opacity-10 transition-opacity duration-500 ${isSorting ? 'opacity-20' : ''}`}>
            {algorithm === 'bubble' && <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent"></div>}
            {algorithm === 'insertion' && <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent"></div>}
            {algorithm === 'selection' && <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent"></div>}
            {algorithm === 'quick' && <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent"></div>}
            {algorithm === 'merge' && <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent"></div>}
            {algorithm === 'radix' && <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent"></div>}
          </div>
          
          {/* Algorithm name watermark - moved up to avoid overlap */}
          <div className="absolute top-2 right-2 font-mono text-xs opacity-20 text-slate-400 font-bold">
            {algorithm}_sort()
          </div>
          
          {/* Array bars - with bottom padding to avoid overlap with status footer */}
          <div className="flex justify-evenly items-end h-[calc(100%-24px)] relative z-10 pb-2">
            {array.map((value, index) => {
              // Determine bar color based on current operation and algorithm
              let barColor = "bg-gradient-to-t from-blue-600 via-cyan-500 to-indigo-400";
              let barGlow = "shadow-[0_0_10px_rgba(59,130,246,0.5)]";
              
              if (currentBar.compare === index) {
                barColor = "bg-gradient-to-t from-amber-600 to-amber-400"; // Comparison color
                barGlow = "shadow-[0_0_12px_rgba(245,158,11,0.6)]"; // Amber glow
              }
              if (currentBar.swap === index) {
                barColor = "bg-gradient-to-t from-red-600 to-red-400"; // Swap color
                barGlow = "shadow-[0_0_12px_rgba(239,68,68,0.6)]"; // Red glow
              }
              
              // Algorithm-specific default colors - futuristic bluish theme
              if (currentBar.compare !== index && currentBar.swap !== index) {
                if (algorithm === 'bubble') barColor = "bg-gradient-to-t from-blue-600 via-cyan-500 to-indigo-400";
                if (algorithm === 'insertion') barColor = "bg-gradient-to-t from-indigo-600 via-blue-500 to-cyan-400";
                if (algorithm === 'selection') barColor = "bg-gradient-to-t from-cyan-600 via-blue-500 to-indigo-400";
                if (algorithm === 'quick') barColor = "bg-gradient-to-t from-blue-600 via-indigo-500 to-violet-400";
                if (algorithm === 'merge') barColor = "bg-gradient-to-t from-violet-600 via-indigo-500 to-blue-400";
                if (algorithm === 'radix') barColor = "bg-gradient-to-t from-cyan-600 via-blue-500 to-teal-400";
              }
              
              // Add extra glow for hovered bar
              if (hoveredBarIndex === index) {
                barGlow = "shadow-[0_0_15px_rgba(255,255,255,0.7)]";
              }
              
              return (
                <div
                  key={index}
                  className={`rounded-t ${barColor} ${barGlow} transition-all duration-200 relative hover:z-20 group/bar`}
                  style={{
                    width: `${Math.max(100 / array.length - 1, 2)}%`,
                    height: `${Math.max(value * 2.5, 5)}px`,
                    transition: "height 0.2s ease-in-out, background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  }}
                  onMouseEnter={() => setHoveredBarIndex(index)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                >
                  {/* Value tooltip - only visible when hovering this specific bar */}
                  {hoveredBarIndex === index && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-300 shadow-md z-30 whitespace-nowrap pointer-events-none border border-slate-700 animate-fadeIn">
                      {value}
                    </div>
                  )}
                  
                  {/* Bar highlight effect */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-white/30 rounded-t"></div>
                  
                  {/* Hover highlight effect */}
                  <div className={`absolute inset-0 bg-white/10 ${hoveredBarIndex === index ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200 rounded-t`}></div>
                  
                  {/* Bar shimmer effect on hover */}
                  <div className="absolute inset-0 w-0 group-hover/bar:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t"></div>
                </div>
              );
            })}
          </div>
          
          {/* Sorting status indicator with improved styling */}
          {isSorting && (
            <div className="absolute top-2 left-2 flex items-center bg-slate-800/80 rounded px-2 py-1 text-xs text-slate-300 backdrop-blur-sm border border-slate-700/50 shadow-md transition-all duration-300">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
              <span className="font-mono">Sorting...</span>
            </div>
          )}
          
          {/* Status footer - Fixed at the bottom with a background */}
          <div className="absolute bottom-0 left-0 right-0 py-1 px-2 bg-slate-900/90 backdrop-blur-sm text-xs text-slate-500 font-mono border-t border-slate-800/50 z-20 transition-all duration-300 group-hover/viz:bg-slate-800/90">
            <div className="flex justify-between items-center">
              <div>
                // {array.length} elements | {
                  currentTestingAlgo 
                    ? <span className="text-indigo-400">{`${currentTestingAlgo.charAt(0).toUpperCase() + currentTestingAlgo.slice(1)} Sort (Testing)`}</span>
                    : <span className="text-blue-400">{`${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort`}</span>
                }
                {isStopped && <span className="text-red-400 ml-2">// terminated</span>}
              </div>
              
              {/* Added execution status indicator */}
              <div className="flex items-center">
                {isSorting ? (
                  <span className="text-emerald-400 flex items-center">
                    <span className="inline-block w-1 h-1 bg-emerald-400 rounded-full mr-1 animate-ping"></span>
                    executing
                  </span>
                ) : (
                  <span className="text-amber-400">ready</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualization;