import React from 'react';

/**
 * AlgorithmSelector Component
 * 
 * Provides a UI for selecting different sorting algorithms
 * Grouped by categories (Basic, Efficient, Special)
 */
const AlgorithmSelector = ({ algorithm, setAlgorithm }) => {
    return (
        <div className="mb-8 relative">
            {/* Animated background glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/30 via-blue-500/30 to-purple-500/30 rounded-xl blur-md opacity-70 animate-pulse-slow"></div>
            
            <div className="relative grid grid-cols-3 gap-4">
                {/* BASIC SORTS BOX */}
                <div 
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-500 overflow-hidden relative group
                        ${algorithm === "bubble" || algorithm === "insertion" || algorithm === "selection" 
                        ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-red-500/30 shadow-lg shadow-red-500/10" 
                        : "bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-slate-700/50 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/10"
                    }`}
                >
                    {/* Animated corner accent */}
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
                    
                    {/* Animated bottom line */}
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500/50 via-orange-500/50 to-yellow-500/50 rounded transition-all duration-700 ${
                        algorithm === "bubble" || algorithm === "insertion" || algorithm === "selection" 
                        ? "w-full" : "w-0 group-hover:w-full"
                    }`}></div>
                    
                    <div className="text-xs font-bold text-slate-300 mb-3 flex items-center justify-between">
                        <span className="tracking-widest relative">
                            BASIC SORTS
                            <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-red-400/0 via-red-400/70 to-red-400/0"></span>
                        </span>
                        <div className="flex space-x-2">
                            <div 
                                onClick={() => setAlgorithm("bubble")}
                                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 transform ${
                                    algorithm === "bubble" 
                                    ? "bg-red-400 scale-110 animate-pulse shadow-md shadow-red-500/50" 
                                    : "bg-slate-600 hover:bg-red-400/70 hover:scale-125 hover:rotate-12"
                                }`}
                            ></div>
                            <div 
                                onClick={() => setAlgorithm("insertion")}
                                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 transform ${
                                    algorithm === "insertion" 
                                    ? "bg-orange-400 scale-110 animate-pulse shadow-md shadow-orange-500/50" 
                                    : "bg-slate-600 hover:bg-orange-400/70 hover:scale-125 hover:rotate-12"
                                }`}
                            ></div>
                            <div 
                                onClick={() => setAlgorithm("selection")}
                                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 transform ${
                                    algorithm === "selection" 
                                    ? "bg-yellow-400 scale-110 animate-pulse shadow-md shadow-yellow-500/50" 
                                    : "bg-slate-600 hover:bg-yellow-400/70 hover:scale-125 hover:rotate-12"
                                }`}
                            ></div>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex space-x-3">
                            <button 
                                onClick={() => setAlgorithm("bubble")}
                                className={`relative text-xs px-3 py-1.5 rounded-md transition-all duration-500 overflow-hidden ${
                                    algorithm === "bubble" 
                                    ? "bg-red-500/20 text-red-300 border border-red-500/30 shadow-lg shadow-red-500/10" 
                                    : "text-slate-400 hover:text-red-300 hover:-translate-y-1 hover:shadow-md"
                                }`}
                            >
                                {algorithm === "bubble" && (
                                    <span className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 animate-shimmer"></span>
                                )}
                                <span className="relative">Bubble</span>
                            </button>
                            <button 
                                onClick={() => setAlgorithm("insertion")}
                                className={`relative text-xs px-3 py-1.5 rounded-md transition-all duration-500 overflow-hidden ${
                                    algorithm === "insertion" 
                                    ? "bg-orange-500/20 text-orange-300 border border-orange-500/30 shadow-lg shadow-orange-500/10" 
                                    : "text-slate-400 hover:text-orange-300 hover:-translate-y-1 hover:shadow-md"
                                }`}
                            >
                                {algorithm === "insertion" && (
                                    <span className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 animate-shimmer"></span>
                                )}
                                <span className="relative">Insertion</span>
                            </button>
                            <button 
                                onClick={() => setAlgorithm("selection")}
                                className={`relative text-xs px-3 py-1.5 rounded-md transition-all duration-500 overflow-hidden ${
                                    algorithm === "selection" 
                                    ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 shadow-lg shadow-yellow-500/10" 
                                    : "text-slate-400 hover:text-yellow-300 hover:-translate-y-1 hover:shadow-md"
                                }`}
                            >
                                {algorithm === "selection" && (
                                    <span className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 animate-shimmer"></span>
                                )}
                                <span className="relative">Selection</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* EFFICIENT SORTS BOX */}
                <div 
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-500 overflow-hidden relative group
                        ${algorithm === "quick" || algorithm === "merge"
                        ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-blue-500/30 shadow-lg shadow-blue-500/10" 
                        : "bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-slate-700/50 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10"
                    }`}
                >
                    {/* Animated corner accent */}
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
                    
                    {/* Animated bottom line */}
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500/50 via-teal-500/50 to-blue-500/50 rounded transition-all duration-700 ${
                        algorithm === "quick" || algorithm === "merge" 
                        ? "w-full" : "w-0 group-hover:w-full"
                    }`}></div>
                    
                    <div className="text-xs font-bold text-slate-300 mb-3 flex items-center justify-between">
                        <span className="tracking-widest relative">
                            EFFICIENT SORTS
                            <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-blue-400/0 via-blue-400/70 to-blue-400/0"></span>
                        </span>
                        <div className="flex space-x-2">
                            <div 
                                onClick={() => setAlgorithm("quick")}
                                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 transform ${
                                    algorithm === "quick" 
                                    ? "bg-green-400 scale-110 animate-pulse shadow-md shadow-green-500/50" 
                                    : "bg-slate-600 hover:bg-green-400/70 hover:scale-125 hover:rotate-12"
                                }`}
                            ></div>
                            <div 
                                onClick={() => setAlgorithm("merge")}
                                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 transform ${
                                    algorithm === "merge" 
                                    ? "bg-blue-400 scale-110 animate-pulse shadow-md shadow-blue-500/50" 
                                    : "bg-slate-600 hover:bg-blue-400/70 hover:scale-125 hover:rotate-12"
                                }`}
                            ></div>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex space-x-3">
                            <button 
                                onClick={() => setAlgorithm("quick")}
                                className={`relative text-xs px-3 py-1.5 rounded-md transition-all duration-500 overflow-hidden ${
                                    algorithm === "quick" 
                                    ? "bg-green-500/20 text-green-300 border border-green-500/30 shadow-lg shadow-green-500/10" 
                                    : "text-slate-400 hover:text-green-300 hover:-translate-y-1 hover:shadow-md"
                                }`}
                            >
                                {algorithm === "quick" && (
                                    <span className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 animate-shimmer"></span>
                                )}
                                <span className="relative">Quick</span>
                            </button>
                            <button 
                                onClick={() => setAlgorithm("merge")}
                                className={`relative text-xs px-3 py-1.5 rounded-md transition-all duration-500 overflow-hidden ${
                                    algorithm === "merge" 
                                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30 shadow-lg shadow-blue-500/10" 
                                    : "text-slate-400 hover:text-blue-300 hover:-translate-y-1 hover:shadow-md"
                                }`}
                            >
                                {algorithm === "merge" && (
                                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 animate-shimmer"></span>
                                )}
                                <span className="relative">Merge</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* SPECIAL SORTS BOX */}
                <div 
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-500 overflow-hidden relative group
                        ${algorithm === "radix"
                        ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/30 shadow-lg shadow-purple-500/10" 
                        : "bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-slate-700/50 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10"
                    }`}
                >
                    {/* Animated corner accent */}
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
                    
                    {/* Animated bottom line */}
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 rounded transition-all duration-700 ${
                        algorithm === "radix" 
                        ? "w-full" : "w-0 group-hover:w-full"
                    }`}></div>
                    
                    <div className="text-xs font-bold text-slate-300 mb-3 flex items-center justify-between">
                        <span className="tracking-widest relative">
                            SPECIAL SORTS
                            <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-purple-400/0 via-purple-400/70 to-purple-400/0"></span>
                        </span>
                        <div className="flex space-x-2">
                            <div 
                                onClick={() => setAlgorithm("radix")}
                                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 transform ${
                                    algorithm === "radix" 
                                    ? "bg-purple-400 scale-110 animate-pulse shadow-md shadow-purple-500/50" 
                                    : "bg-slate-600 hover:bg-purple-400/70 hover:scale-125 hover:rotate-12"
                                }`}
                            ></div>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex space-x-3">
                            <button 
                                onClick={() => setAlgorithm("radix")}
                                className={`relative text-xs px-3 py-1.5 rounded-md transition-all duration-500 overflow-hidden ${
                                    algorithm === "radix" 
                                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/10" 
                                    : "text-slate-400 hover:text-purple-300 hover:-translate-y-1 hover:shadow-md"
                                }`}
                            >
                                {algorithm === "radix" && (
                                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 animate-shimmer"></span>
                                )}
                                <span className="relative">Radix</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlgorithmSelector; 