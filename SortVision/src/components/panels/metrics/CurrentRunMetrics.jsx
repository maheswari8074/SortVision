import React from "react";

const CurrentRunMetrics = ({ metrics }) => {
  const { swaps = 0, comparisons = 0, steps = 0, time = "0.00" } = metrics || {};

  return (
    <div className="bg-slate-900 p-4 rounded border border-slate-800 relative overflow-hidden group">
      {/* Animated gradient background */}

      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-[gradient_8s_ease_infinite] opacity-20 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-white text-sm font-medium">
        <div className="metric-item">
          <span className="label block text-slate-400">🔁 Swaps</span>
 
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-[gradient_8s_ease_infinite] bg-[length:200%_100%]"></div>
      
      {/* Animated corner accent */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
      
      {/* Animated bottom line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>
      
      <div className="font-mono text-sm text-slate-400 mb-4 flex items-center justify-between relative z-10">
        <div className="flex items-center group cursor-pointer hover:text-emerald-400 transition-colors">
          <Terminal className="mr-2 h-4 w-4 text-emerald-400 group-hover:animate-spin" />
          // current run metrics
        </div>
        <Badge variant="outline" className="bg-slate-800/50 text-emerald-400 font-mono border-emerald-500/30 group-hover:bg-slate-800 transition-all duration-300">
          {algorithm}_sort()
        </Badge>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-slate-800 p-3 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-emerald-500/10 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Animated corner accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
          
          {/* Animated bottom line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-emerald-500/50 via-teal-500/50 to-emerald-500/50 rounded transition-all duration-700"></div>
          
          <div className="text-xs text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
            <ArrowUpDown className="mr-1 h-3 w-3 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" /> SWAPS
          </div>
          <div className="text-xl text-emerald-400 font-mono group-hover:text-emerald-300 transition-colors duration-300 relative z-10">{metrics.swaps}</div>
          <div className="text-[10px] text-slate-500 mt-1 group-hover:text-slate-400 transition-colors duration-300 relative z-10">Memory operations</div>
        </div>
        
        <div className="bg-slate-800 p-3 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Animated corner accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
          
          {/* Animated bottom line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-blue-500/50 rounded transition-all duration-700"></div>
          
          <div className="text-xs text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
            <BarChart2 className="mr-1 h-3 w-3 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" /> COMPARISONS
          </div>
          <div className="text-xl text-blue-400 font-mono group-hover:text-blue-300 transition-colors duration-300 relative z-10">{metrics.comparisons}</div>
          <div className="text-[10px] text-slate-500 mt-1 group-hover:text-slate-400 transition-colors duration-300 relative z-10">CPU operations</div>
        </div>
        
        <div className="bg-slate-800 p-3 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-purple-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Animated corner accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
          
          {/* Animated bottom line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-purple-500/50 rounded transition-all duration-700"></div>
          
          <div className="text-xs text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
            <Zap className="mr-1 h-3 w-3 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" /> TIME (MS)
          </div>
          <div className="text-xl text-purple-400 font-mono group-hover:text-purple-300 transition-colors duration-300 relative z-10">{metrics.time}</div>
          <div className="text-[10px] text-slate-500 mt-1 group-hover:text-slate-400 transition-colors duration-300 relative z-10">Execution duration</div>
        </div>
      </div>
      
      {/* Advanced Metrics */}
      <div className="flex flex-wrap sm:grid sm:grid-cols-4 gap-3">
        <div className="flex-1 min-w-[120px] bg-slate-800 p-2 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Animated corner accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
          
          {/* Animated bottom line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-amber-500/50 rounded transition-all duration-700"></div>
          
          <div className="text-[10px] text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
            <Percent className="mr-1 h-3 w-3 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" /> SWAP RATIO
          </div>
          <div className="text-sm text-amber-400 font-mono flex items-center group-hover:text-amber-300 transition-colors duration-300 relative z-10">
            {swapRatio}
            <span className="text-[10px] text-slate-500 ml-1 group-hover:text-slate-400 transition-colors duration-300">swaps/comp</span>
          </div>

        </div>
        <div className="metric-item">
          <span className="label block text-slate-400">🔍 Comparisons</span>
          <span className="value text-lg font-semibold">{comparisons}</span>
        </div>
        <div className="metric-item">
          <span className="label block text-slate-400">🚶 Steps</span>
          <span className="value text-lg font-semibold">{steps}</span>
        </div>
        <div className="metric-item">
          <span className="label block text-slate-400">⏱️ Time</span>
          <span className="value text-lg font-semibold">{time} ms</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentRunMetrics;
