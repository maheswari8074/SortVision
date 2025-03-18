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
    <div className={`w-full rounded-lg border border-slate-800 bg-slate-900 p-4 ${height} relative overflow-hidden group`}>
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] opacity-20 [background-size:8px_8px]"></div>
      
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
      <div className="absolute top-2 right-2 font-mono text-xs opacity-20 text-slate-400">
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
              className={`rounded-t ${barColor} ${barGlow} transition-all duration-200 relative hover:z-20`}
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
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-300 shadow-md z-30 whitespace-nowrap pointer-events-none border border-slate-700">
                  {value}
                </div>
              )}
              
              {/* Bar highlight effect */}
              <div className="absolute inset-x-0 top-0 h-1 bg-white/30 rounded-t"></div>
              
              {/* Hover highlight effect */}
              <div className={`absolute inset-0 bg-white/10 ${hoveredBarIndex === index ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200 rounded-t`}></div>
            </div>
          );
        })}
      </div>
      
      {/* Sorting status indicator */}
      {isSorting && (
        <div className="absolute top-2 left-2 flex items-center bg-slate-800/80 rounded px-2 py-1 text-xs text-slate-300 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
          Sorting...
        </div>
      )}
      
      {/* Status footer - Fixed at the bottom with a background */}
      <div className="absolute bottom-0 left-0 right-0 py-1 px-2 bg-slate-900/90 backdrop-blur-sm text-xs text-slate-500 font-mono border-t border-slate-800/50 z-20">
        // {array.length} elements | {
          currentTestingAlgo 
            ? `${currentTestingAlgo.charAt(0).toUpperCase() + currentTestingAlgo.slice(1)} Sort (Testing)`
            : `${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort`
        }
        {isStopped && <span className="text-red-400 ml-2">// terminated</span>}
      </div>
    </div>
  );
};

export default ArrayVisualization;