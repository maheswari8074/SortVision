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
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              {/* Animated grid pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>
              
              {/* Floating particles */}
              <div className="absolute h-2 w-2 rounded-full bg-emerald-500/50 top-[10%] left-[20%] animate-pulse" style={{ animationDuration: '3s' }}></div>
              <div className="absolute h-1 w-1 rounded-full bg-blue-500/50 top-[30%] left-[70%] animate-pulse" style={{ animationDuration: '2.3s' }}></div>
              <div className="absolute h-1.5 w-1.5 rounded-full bg-purple-500/50 top-[70%] left-[30%] animate-pulse" style={{ animationDuration: '4s' }}></div>
              <div className="absolute h-1 w-1 rounded-full bg-cyan-500/50 top-[60%] left-[80%] animate-pulse" style={{ animationDuration: '3.5s' }}></div>
              
              {/* Animated code lines */}
              <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
              <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
              <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
            </div>
          </div>
          
          <label className="font-mono text-sm text-slate-400 mb-2 block flex items-center relative z-10">
            <Terminal className="mr-2 h-4 w-4 text-emerald-400 animate-pulse" style={{ animationDuration: '4s' }} />
            // select algorithm
          </label>
          <Select value={algorithm} onValueChange={setAlgorithm} disabled={isSorting}>
            <SelectTrigger className="w-full bg-slate-800 border-slate-700 text-emerald-400 font-mono relative overflow-hidden group shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/10 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <SelectValue placeholder="Algorithm" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-emerald-400 font-mono shadow-xl shadow-purple-500/10">
              <SelectItem value="bubble" className="hover:bg-slate-700 transition-colors duration-200 flex items-center hover:scale-[1.02] transition-transform">
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
          
          {/* Enhanced Algorithm Badge with animations and effects */}
          <div className="mt-6 flex justify-center">
            <div className={`
              px-4 py-2 rounded-lg font-mono text-sm
              ${algorithm === 'bubble' ? 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-lg shadow-red-500/10' : 
                algorithm === 'insertion' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-lg shadow-orange-500/10' : 
                algorithm === 'selection' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-lg shadow-amber-500/10' : 
                algorithm === 'quick' ? 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-lg shadow-green-500/10' : 
                algorithm === 'merge' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/10' : 
                'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/10'}
              flex items-center gap-3 transform hover:scale-105 transition-all duration-300 relative overflow-hidden
            `}>
              {/* Animated background effect based on algorithm */}
              <div className={`absolute inset-0 opacity-20 ${
                algorithm === 'bubble' ? 'bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0' : 
                algorithm === 'insertion' ? 'bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0' : 
                algorithm === 'selection' ? 'bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0' : 
                algorithm === 'quick' ? 'bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0' : 
                algorithm === 'merge' ? 'bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0' : 
                'bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0'
              } animate-pulse`} style={{ animationDuration: '3s' }}></div>
              
              {/* Enhanced algorithm icons with more animation */}
              <div className="relative h-6 w-6 flex items-center justify-center">
                {algorithm === 'bubble' && (
                  <>
                    <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping opacity-30" style={{ animationDuration: '2s' }}></div>
                    <div className="absolute inset-0 bg-red-500/10 rounded-full animate-ping opacity-20" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDuration: '1.5s' }}></div>
                    <div className="absolute w-1 h-1 bg-red-300 rounded-full top-0 right-0 animate-ping" style={{ animationDuration: '1s' }}></div>
                  </>
                )}
                {algorithm === 'insertion' && (
                  <>
                    <div className="w-4 h-1.5 bg-orange-400 rounded-sm"></div>
                    <div className="absolute w-1.5 h-4 bg-orange-400/30 rounded-sm right-1 animate-bounce" style={{ animationDuration: '2s' }}></div>
                  </>
                )}
                {algorithm === 'selection' && (
                  <>
                    <div className="w-4 h-4 border border-amber-400 rounded-sm relative overflow-hidden">
                      <div className="absolute inset-0 bg-amber-400/10"></div>
                      <div className="absolute h-full w-1 bg-amber-400/30 animate-[selectionScan_2s_ease-in-out_infinite]"></div>
                    </div>
                    <div className="absolute inset-0 m-auto w-2 h-2 bg-amber-400 rounded-sm animate-pulse" style={{ animationDuration: '1.5s' }}></div>
                  </>
                )}
                {algorithm === 'quick' && (
                  <>
                    <div className="w-4 h-4 border-r-2 border-t-2 border-green-400 rounded-tr-md animate-spin" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute inset-0 w-2 h-2 bg-green-400/20 rounded-full m-auto animate-ping" style={{ animationDuration: '1.5s' }}></div>
                  </>
                )}
                {algorithm === 'merge' && (
                  <div className="relative w-5 h-4">
                    <div className="absolute left-0 w-2 h-4 bg-blue-400 rounded-sm"></div>
                    <div className="absolute right-0 w-2 h-4 bg-purple-400 rounded-sm"></div>
                    <div className="absolute inset-x-0 bottom-0 h-1.5 bg-indigo-400/50 rounded-sm animate-pulse"></div>
                  </div>
                )}
                {algorithm === 'radix' && (
                  <>
                    <div className="w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-sm animate-pulse"></div>
                    <div className="absolute inset-0 bg-cyan-500/20 rounded-sm animate-ping opacity-30" style={{ animationDuration: '3s' }}></div>
                  </>
                )}
              </div>
              
              <div className="flex flex-col">
                <span className="font-bold">{algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort</span>
                <span className="text-xs opacity-70 mt-0.5">
                  {algorithm === 'bubble' && "O(n²) - Simple exchange sort"}
                  {algorithm === 'insertion' && "O(n²) - Builds sorted array"}
                  {algorithm === 'selection' && "O(n²) - Finds minimum element"}
                  {algorithm === 'quick' && "O(n log n) - Divide & conquer"}
                  {algorithm === 'merge' && "O(n log n) - Divide & merge"}
                  {algorithm === 'radix' && "O(nk) - Non-comparative sort"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Visual representation of the algorithm */}
          <div className="mt-4 flex justify-center h-12 relative">
            {algorithm === 'bubble' && (
              <div className="flex items-end space-x-1 relative">
                {/* Background grid effect */}
                <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:8px_8px] opacity-20"></div>
                
                {/* Animated bars */}
                {[4, 2, 6, 1, 5, 3].map((height, i) => (
                  <div 
                    key={i} 
                    className="w-3 bg-gradient-to-t from-red-600 to-red-400 rounded-t transition-all duration-300 relative group"
                    style={{ 
                      height: `${height * 6}px`
                    }}
                  >
                    {/* Bar highlight effect */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-white/30 rounded-t"></div>
                    
                    {/* Bar value */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-[8px] text-red-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      {height}
                    </div>
                  </div>
                ))}
                
                {/* Animated comparison indicator */}
                <div className="absolute top-0 left-0 w-full">
                  <div 
                    className="absolute h-full border-l-2 border-r-2 border-red-400/50 rounded w-8 transition-all duration-300 bg-red-500/5"
                    style={{ 
                      left: '0%',
                      animation: 'bubbleCompare 3s ease-in-out infinite'
                    }}
                  >
                    {/* Comparison text */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-[8px] text-red-300">
                      compare
                    </div>
                    
                    {/* Swap arrows */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-400/70">
                      ⇄
                    </div>
                  </div>
                </div>
                
                {/* Algorithm step counter */}
                <div className="absolute -bottom-4 right-0 text-[8px] text-slate-400 font-mono">
                  step: <span className="text-red-400">n²</span>
                </div>
              </div>
            )}
            
            {algorithm === 'insertion' && (
              <div className="flex items-end space-x-1">
                {[1, 2, 3, 6, 5, 4].map((height, i) => (
                  <div 
                    key={i} 
                    className={`w-3 rounded-t transition-all duration-300 ${i < 3 ? 'bg-gradient-to-t from-orange-600 to-orange-400' : 'bg-gradient-to-t from-slate-600 to-slate-400'}`}
                    style={{ height: `${height * 6}px` }}
                  ></div>
                ))}
                <div className="absolute top-0 left-0 w-full">
                  <div className="w-3 h-6 border-2 border-orange-400/50 rounded-t absolute animate-[moveRight_3s_ease-in-out_infinite]" style={{ left: '50%' }}></div>
                </div>
              </div>
            )}
            
            {algorithm === 'selection' && (
              <div className="flex items-end space-x-1 relative">
                {[1, 4, 3, 6, 2, 5].map((height, i) => (
                  <div 
                    key={i} 
                    className={`w-3 rounded-t transition-all duration-300 ${i === 0 ? 'bg-gradient-to-t from-amber-600 to-amber-400' : 'bg-gradient-to-t from-slate-600 to-slate-400'}`}
                    style={{ height: `${height * 6}px` }}
                  ></div>
                ))}
                {/* Animated selection indicator */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div 
                    className="absolute w-3 h-3 border-2 border-amber-400 rounded-full bg-amber-400/20"
                    style={{ 
                      animation: 'selectionSearch 4s ease-in-out infinite',
                      top: '30%'
                    }}
                  ></div>
                  <div className="absolute bottom-0 left-0 h-1 bg-amber-400/30 w-full"></div>
                </div>
              </div>
            )}
            
            {algorithm === 'quick' && (
              <div className="flex items-end space-x-1">
                {[2, 1, 3, 5, 6, 4].map((height, i) => (
                  <div 
                    key={i} 
                    className={`w-3 rounded-t transition-all duration-300 ${i === 3 ? 'bg-gradient-to-t from-green-600 to-green-400' : 'bg-gradient-to-t from-slate-600 to-slate-400'}`}
                    style={{ height: `${height * 6}px` }}
                  ></div>
                ))}
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <div className="w-[80%] border-t-2 border-dashed border-green-400/50"></div>
                </div>
              </div>
            )}
            
            {algorithm === 'merge' && (
              <div className="flex items-end space-x-1">
                {[1, 3, 2, 5, 4, 6].map((height, i) => (
                  <div 
                    key={i} 
                    className={`w-3 rounded-t transition-all duration-300 ${i < 3 ? 'bg-gradient-to-t from-blue-600 to-blue-400' : 'bg-gradient-to-t from-purple-600 to-purple-400'}`}
                    style={{ height: `${height * 6}px` }}
                  ></div>
                ))}
                <div className="absolute top-0 left-0 w-full h-full flex items-center">
                  <div className="w-[50%] border-r-2 border-blue-400/50 h-full"></div>
                </div>
              </div>
            )}
            
            {algorithm === 'radix' && (
              <div className="flex items-end space-x-1">
                {[12, 24, 35, 41, 53, 60].map((height, i) => (
                  <div 
                    key={i} 
                    className="w-3 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t transition-all duration-300"
                    style={{ 
                      height: `${(height/10) * 6}px`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  >
                    <div className="text-[6px] text-center text-white font-bold">{Math.floor(height/10)}</div>
                  </div>
                ))}
              </div>
            )}
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
        
        {/* Animation Speed Control */}
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
          height="h-100"
        />
      )}
    </div>
  );
};

export default ConfigPanel; 