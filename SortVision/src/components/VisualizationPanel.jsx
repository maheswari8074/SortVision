import React from 'react';
import { Terminal, Info, CheckCircle2, AlertTriangle, Code, Lightbulb, Zap, Brain, Cpu, GitBranch } from 'lucide-react';
import ArrayVisualization from './ArrayVisualization';

/**
 * VisualizationPanel Component
 * 
 * Displays the visualization of sorting algorithms:
 * - Algorithm details (pseudocode, characteristics, use cases)
 * - Array visualization with animated bars
 */
const VisualizationPanel = ({
    algorithm,
    array,
    currentBar,
    isSorting,
    currentTestingAlgo,
    isStopped,
    setAlgorithm
}) => {
    // Interactive tips based on algorithm
    const getTip = () => {
        const tips = {
            bubble: "Try increasing the array size to see how bubble sort's performance degrades quadratically!",
            insertion: "Watch how insertion sort performs exceptionally well on nearly sorted arrays.",
            selection: "Notice how selection sort always takes the same time regardless of initial order.",
            quick: "Observe how the pivot selection affects the partitioning process.",
            merge: "See how merge sort divides the array into smaller subarrays recursively.",
            radix: "Watch how radix sort processes each digit position independently!"
        };
        return tips[algorithm];
    };

    // Get algorithm category and related algorithms
    const getAlgorithmInfo = () => {
        const info = {
            bubble: {
                category: "Exchange Sort",
                related: ["Cocktail Sort", "Comb Sort"],
                inventor: "Unknown",
                year: "1956",
                category_icon: <GitBranch className="h-4 w-4 text-blue-400" />
            },
            insertion: {
                category: "Insertion Sort",
                related: ["Shell Sort", "Tree Sort"],
                inventor: "John Mauchly",
                year: "1946",
                category_icon: <Zap className="h-4 w-4 text-yellow-400" />
            },
            selection: {
                category: "Selection Sort",
                related: ["Heap Sort", "Cycle Sort"],
                inventor: "Unknown",
                year: "1960s",
                category_icon: <Brain className="h-4 w-4 text-purple-400" />
            },
            quick: {
                category: "Divide & Conquer",
                related: ["Quick Select", "Dual-Pivot Quicksort"],
                inventor: "Tony Hoare",
                year: "1959",
                category_icon: <Cpu className="h-4 w-4 text-green-400" />
            },
            merge: {
                category: "Divide & Conquer",
                related: ["Timsort", "Natural Merge Sort"],
                inventor: "John von Neumann",
                year: "1945",
                category_icon: <Cpu className="h-4 w-4 text-green-400" />
            },
            radix: {
                category: "Non-Comparative",
                related: ["Counting Sort", "Bucket Sort"],
                inventor: "Herman Hollerith",
                year: "1887",
                category_icon: <Lightbulb className="h-4 w-4 text-amber-400" />
            }
        };
        return info[algorithm];
    };

    return (
        <div className="space-y-6">
            {/* Algorithm Details with enhanced styling */}
            <div className="bg-slate-900 p-4 rounded border border-slate-800">
                {/* Add interactive sort selection */}
                <div className="mb-6 relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-lg blur-sm"></div>
                    <div className="relative grid grid-cols-3 gap-2">
                        <div 
                            className={`p-2 rounded cursor-pointer transition-all duration-300 ${
                                algorithm === "bubble" || algorithm === "insertion" || algorithm === "selection" 
                                ? "bg-slate-800 border border-slate-700" 
                                : "bg-slate-800/50 border border-slate-700/50"
                            }`}
                        >
                            <div className="text-xs text-slate-400 mb-2 flex items-center justify-between">
                                <span>BASIC SORTS</span>
                                <div className="flex space-x-1">
                                    <div 
                                        onClick={() => setAlgorithm("bubble")}
                                        className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                                            algorithm === "bubble" 
                                            ? "bg-red-400 scale-125" 
                                            : "bg-slate-600 hover:bg-red-400/50"
                                        }`}
                                    ></div>
                                    <div 
                                        onClick={() => setAlgorithm("insertion")}
                                        className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                                            algorithm === "insertion" 
                                            ? "bg-orange-400 scale-125" 
                                            : "bg-slate-600 hover:bg-orange-400/50"
                                        }`}
                                    ></div>
                                    <div 
                                        onClick={() => setAlgorithm("selection")}
                                        className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                                            algorithm === "selection" 
                                            ? "bg-yellow-400 scale-125" 
                                            : "bg-slate-600 hover:bg-yellow-400/50"
                                        }`}
                                    ></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => setAlgorithm("bubble")}
                                        className={`text-[10px] px-2 py-1 rounded ${
                                            algorithm === "bubble" 
                                            ? "bg-red-500/20 text-red-400 border border-red-500/20" 
                                            : "text-slate-400 hover:bg-slate-700"
                                        }`}
                                    >
                                        Bubble
                                    </button>
                                    <button 
                                        onClick={() => setAlgorithm("insertion")}
                                        className={`text-[10px] px-2 py-1 rounded ${
                                            algorithm === "insertion" 
                                            ? "bg-orange-500/20 text-orange-400 border border-orange-500/20" 
                                            : "text-slate-400 hover:bg-slate-700"
                                        }`}
                                    >
                                        Insertion
                                    </button>
                                    <button 
                                        onClick={() => setAlgorithm("selection")}
                                        className={`text-[10px] px-2 py-1 rounded ${
                                            algorithm === "selection" 
                                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/20" 
                                            : "text-slate-400 hover:bg-slate-700"
                                        }`}
                                    >
                                        Selection
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div 
                            className={`p-2 rounded cursor-pointer transition-all duration-300 ${
                                algorithm === "quick" || algorithm === "merge"
                                ? "bg-slate-800 border border-slate-700" 
                                : "bg-slate-800/50 border border-slate-700/50"
                            }`}
                        >
                            <div className="text-xs text-slate-400 mb-2 flex items-center justify-between">
                                <span>EFFICIENT SORTS</span>
                                <div className="flex space-x-1">
                                    <div 
                                        onClick={() => setAlgorithm("quick")}
                                        className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                                            algorithm === "quick" 
                                            ? "bg-green-400 scale-125" 
                                            : "bg-slate-600 hover:bg-green-400/50"
                                        }`}
                                    ></div>
                                    <div 
                                        onClick={() => setAlgorithm("merge")}
                                        className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                                            algorithm === "merge" 
                                            ? "bg-blue-400 scale-125" 
                                            : "bg-slate-600 hover:bg-blue-400/50"
                                        }`}
                                    ></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => setAlgorithm("quick")}
                                        className={`text-[10px] px-2 py-1 rounded ${
                                            algorithm === "quick" 
                                            ? "bg-green-500/20 text-green-400 border border-green-500/20" 
                                            : "text-slate-400 hover:bg-slate-700"
                                        }`}
                                    >
                                        Quick
                                    </button>
                                    <button 
                                        onClick={() => setAlgorithm("merge")}
                                        className={`text-[10px] px-2 py-1 rounded ${
                                            algorithm === "merge" 
                                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/20" 
                                            : "text-slate-400 hover:bg-slate-700"
                                        }`}
                                    >
                                        Merge
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div 
                            className={`p-2 rounded cursor-pointer transition-all duration-300 ${
                                algorithm === "radix"
                                ? "bg-slate-800 border border-slate-700" 
                                : "bg-slate-800/50 border border-slate-700/50"
                            }`}
                        >
                            <div className="text-xs text-slate-400 mb-2 flex items-center justify-between">
                                <span>SPECIAL SORTS</span>
                                <div className="flex space-x-1">
                                    <div 
                                        onClick={() => setAlgorithm("radix")}
                                        className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                                            algorithm === "radix" 
                                            ? "bg-purple-400 scale-125" 
                                            : "bg-slate-600 hover:bg-purple-400/50"
                                        }`}
                                    ></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => setAlgorithm("radix")}
                                        className={`text-[10px] px-2 py-1 rounded ${
                                            algorithm === "radix" 
                                            ? "bg-purple-500/20 text-purple-400 border border-purple-500/20" 
                                            : "text-slate-400 hover:bg-slate-700"
                                        }`}
                                    >
                                        Radix
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="font-mono text-sm text-slate-400 mb-4 flex items-center">
                    <Info className="mr-2 h-4 w-4" />
                    // {algorithm}_sort() details
                </div>

                {/* Algorithm visualization with enhanced effects */}
                <div className="bg-slate-800 p-3 rounded border border-slate-700 mb-4 relative overflow-hidden group">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-[gradient_8s_ease_infinite] bg-[length:200%_100%]"></div>
                    
                    {/* Interactive header with hover effect */}
                    <div className="text-xs text-slate-400 mb-2 flex items-center relative z-10 group cursor-pointer hover:text-emerald-400 transition-colors">
                        <Terminal className="mr-1 h-3 w-3 text-emerald-400 group-hover:animate-spin" />
                        <span className="group-hover:tracking-wider transition-all">VISUALIZATION</span>
                    </div>

                    {/* Code editor with enhanced styling */}
                    <div className="flex justify-center p-3 bg-slate-900 rounded relative group">
                        {/* Enhanced line numbers */}
                        <div className="absolute left-2 top-3 bottom-3 text-right pr-2 border-r border-slate-700/50 text-[10px] text-slate-500 font-mono">
                            {algorithm === "bubble" && Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="group-hover:text-emerald-400 transition-colors">{i + 1}</div>
                            ))}
                            {algorithm === "insertion" && Array.from({ length: 7 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                            {algorithm === "selection" && Array.from({ length: 5 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                            {algorithm === "quick" && Array.from({ length: 12 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                            {algorithm === "merge" && Array.from({ length: 8 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                            {algorithm === "radix" && Array.from({ length: 7 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                        </div>

                        {/* Code with enhanced animations */}
                        <div className="pl-8 w-full relative">
                            {algorithm === "bubble" && (
                                <pre className="text-xs font-mono text-emerald-400 relative group">
                                    <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-emerald-400/20 group-hover:bg-emerald-400/40 transition-colors"></div>
                                    <code className="block group-hover:translate-x-1 transition-transform">
                                        {`for i = 0 to n-1
  for j = 0 to n-i-1
    if arr[j] > arr[j+1]
      swap(arr[j], arr[j+1])`}
                                    </code>
                                    <div className="absolute bottom-0 left-[12.5rem] h-3.5 w-1.5 bg-emerald-400 animate-[blink_1s_ease-in-out_infinite]"></div>
                                </pre>
                            )}
                            {algorithm === "insertion" && (
                                <pre className="text-xs font-mono text-emerald-400 relative">
                                    <code>
                                        {`for i = 1 to n-1
  key = arr[i]
  j = i-1
  while j >= 0 and arr[j] > key
    arr[j+1] = arr[j]
    j = j-1
  arr[j+1] = key`}
                                    </code>
                                    {/* Blinking cursor after the last line */}
                                    <div className="absolute bottom-0 left-[7.3rem] h-3.5 w-1.5 bg-emerald-400 animate-[blink_1s_ease-in-out_infinite]"></div>
                                </pre>
                            )}
                            {algorithm === "selection" && (
                                <pre className="text-xs font-mono text-emerald-400 relative">
                                    <code>
                                        {`for i = 0 to n-1
  min_idx = i
  for j = i+1 to n
    if arr[j] < arr[min_idx]
      min_idx = j
  swap(arr[i], arr[min_idx])`}
                                    </code>
                                    {/* Blinking cursor after the last line */}
                                    <div className="absolute bottom-0 left-[12.5rem] h-3.5 w-1.5 bg-emerald-400 animate-[blink_1s_ease-in-out_infinite]"></div>
                                </pre>
                            )}
                            {algorithm === "quick" && (
                                <pre className="text-xs font-mono text-emerald-400 relative">
                                    <code>
                                        {`function quickSort(arr, low, high)
  if low < high
    pi = partition(arr, low, high)
    quickSort(arr, low, pi-1)
    quickSort(arr, pi+1, high)

function partition(arr, low, high)
  pivot = arr[high]
  i = low - 1
  for j = low to high-1
    if arr[j] <= pivot
      i++
      swap(arr[i], arr[j])
  swap(arr[i+1], arr[high])
  return i+1`}
                                    </code>
                                    {/* Blinking cursor after the last line */}
                                    <div className="absolute bottom-0 left-[5.5rem] h-3.5 w-1.5 bg-emerald-400 animate-[blink_1s_ease-in-out_infinite]"></div>
                                </pre>
                            )}
                            {algorithm === "merge" && (
                                <pre className="text-xs font-mono text-emerald-400 relative">
                                    <code>
                                        {`function mergeSort(arr, l, r)
  if l < r
    m = l + (r - l) / 2
    mergeSort(arr, l, m)
    mergeSort(arr, m+1, r)
    merge(arr, l, m, r)

function merge(arr, l, m, r)
  // Merge two subarrays`}
                                    </code>
                                    {/* Blinking cursor after the last line */}
                                    <div className="absolute bottom-0 left-[11rem] h-3.5 w-1.5 bg-emerald-400 animate-[blink_1s_ease-in-out_infinite]"></div>
                                </pre>
                            )}
                            {algorithm === "radix" && (
                                <pre className="text-xs font-mono text-emerald-400 relative">
                                    <code>
                                        {`function radixSort(arr)
  max = getMax(arr)
  for exp = 1 while max/exp > 0
    countSort(arr, exp)
    exp *= 10

function countSort(arr, exp)
  // Sort by digit at exp position`}
                                    </code>
                                    {/* Blinking cursor after the last line */}
                                    <div className="absolute bottom-0 left-[15.5rem] h-3.5 w-1.5 bg-emerald-400 animate-[blink_1s_ease-in-out_infinite]"></div>
                                </pre>
                            )}
                        </div>
                    </div>
                </div>

                {/* Enhanced characteristics grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Characteristics with animations */}
                    <div className="bg-slate-800 p-3 rounded border border-slate-700 transform hover:scale-[1.02] transition-transform">
                        <div className="text-xs text-slate-400 mb-2 flex items-center">
                            <Code className="mr-1 h-3 w-3 text-emerald-400" />
                            CHARACTERISTICS
                        </div>
                        <ul className="text-xs space-y-1">
                            {algorithm === "bubble" && (
                                <>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Simple implementation</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> In-place sorting</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Stable sort</li>
                                    <li className="flex items-center"><AlertTriangle className="h-3 w-3 text-red-400 mr-1" /> Poor performance on large datasets</li>
                                </>
                            )}
                            {algorithm === "insertion" && (
                                <>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Simple implementation</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> In-place sorting</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Stable sort</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Efficient for small datasets</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Adaptive (efficient for nearly sorted data)</li>
                                </>
                            )}
                            {algorithm === "selection" && (
                                <>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Simple implementation</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> In-place sorting</li>
                                    <li className="flex items-center"><AlertTriangle className="h-3 w-3 text-red-400 mr-1" /> Not stable</li>
                                    <li className="flex items-center"><AlertTriangle className="h-3 w-3 text-red-400 mr-1" /> Poor performance regardless of input</li>
                                </>
                            )}
                            {algorithm === "quick" && (
                                <>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Efficient for large datasets</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> In-place sorting</li>
                                    <li className="flex items-center"><AlertTriangle className="h-3 w-3 text-red-400 mr-1" /> Not stable</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Good cache locality</li>
                                    <li className="flex items-center"><AlertTriangle className="h-3 w-3 text-red-400 mr-1" /> Worst case on already sorted data</li>
                                </>
                            )}
                            {algorithm === "merge" && (
                                <>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Consistent performance</li>
                                    <li className="flex items-center"><AlertTriangle className="h-3 w-3 text-red-400 mr-1" /> Not in-place (requires extra space)</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Stable sort</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Parallelizable</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Good for linked lists</li>
                                </>
                            )}
                            {algorithm === "radix" && (
                                <>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Linear time complexity</li>
                                    <li className="flex items-center"><AlertTriangle className="h-3 w-3 text-red-400 mr-1" /> Not in-place (requires extra space)</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Stable sort</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Works well with fixed-length integers</li>
                                    <li className="flex items-center"><AlertTriangle className="h-3 w-3 text-red-400 mr-1" /> Limited to specific data types</li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Use cases with animations */}
                    <div className="bg-slate-800 p-3 rounded border border-slate-700 transform hover:scale-[1.02] transition-transform">
                        <div className="text-xs text-slate-400 mb-2 flex items-center">
                            <Cpu className="mr-1 h-3 w-3 text-emerald-400" />
                            IDEAL USE CASES
                        </div>
                        <ul className="text-xs space-y-1">
                            {algorithm === "bubble" && (
                                <>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Educational purposes</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Very small datasets</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> When simplicity is more important than efficiency</li>
                                </>
                            )}
                            {algorithm === "insertion" && (
                                <>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Small datasets</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Nearly sorted data</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Online sorting (sorting as data arrives)</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> When stability is required</li>
                                </>
                            )}
                            {algorithm === "selection" && (
                                <>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Educational purposes</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> When memory writes are expensive</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Small datasets where simplicity matters</li>
                                </>
                            )}
                            {algorithm === "quick" && (
                                <>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> General-purpose sorting</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Large datasets</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Systems with good cache locality</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> When average case performance matters more than worst case</li>
                                </>
                            )}
                            {algorithm === "merge" && (
                                <>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> When stable sorting is needed</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> External sorting (when data doesn't fit in memory)</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Linked list sorting</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> When worst-case performance is important</li>
                                </>
                            )}
                            {algorithm === "radix" && (
                                <>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Sorting integers or strings of fixed length</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> When elements have a bounded range</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> Large datasets of fixed-length keys</li>
                                    <li className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" /> When linear time sorting is needed</li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>

                {/* New sections for enhanced interactivity */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Algorithm Category Info */}
                    <div className="bg-slate-800 p-3 rounded border border-slate-700 group hover:bg-slate-800/80 transition-colors">
                        <div className="text-xs text-slate-400 mb-2 flex items-center">
                            {getAlgorithmInfo().category_icon}
                            <span className="ml-1">{getAlgorithmInfo().category.toUpperCase()}</span>
                        </div>
                        <div className="text-xs">
                            <div className="text-emerald-400 mb-1">Related Algorithms:</div>
                            <ul className="list-disc list-inside text-slate-300">
                                {getAlgorithmInfo().related.map((algo, index) => (
                                    <li key={index} className="group-hover:text-emerald-400 transition-colors">{algo}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Historical Context */}
                    <div className="bg-slate-800 p-3 rounded border border-slate-700 group hover:bg-slate-800/80 transition-colors">
                        <div className="text-xs text-slate-400 mb-2 flex items-center">
                            <Brain className="mr-1 h-3 w-3 text-purple-400" />
                            HISTORICAL CONTEXT
                        </div>
                        <div className="text-xs text-slate-300">
                            <div className="mb-1">
                                <span className="text-purple-400">Inventor:</span> {getAlgorithmInfo().inventor}
                            </div>
                            <div>
                                <span className="text-purple-400">Year:</span> {getAlgorithmInfo().year}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive Tip Section */}
                <div className="bg-slate-800 p-3 rounded border border-slate-700 group hover:bg-slate-800/80 transition-colors">
                    <div className="text-xs text-slate-400 mb-2 flex items-center">
                        <Lightbulb className="mr-1 h-3 w-3 text-amber-400 animate-pulse" />
                        PRO TIP
                    </div>
                    <div className="text-xs text-amber-400 italic group-hover:text-amber-300 transition-colors">
                        {getTip()}
                    </div>
                </div>

                {/* Fun fact with enhanced styling */}
                <div className="mt-4 bg-slate-800 p-3 rounded border border-slate-700 group hover:bg-slate-800/80 transition-colors">
                    <div className="text-xs text-slate-400 mb-2 flex items-center">
                        <Zap className="mr-1 h-3 w-3 text-yellow-400 group-hover:animate-bounce" />
                        FUN FACT
                    </div>
                    <div className="text-xs text-yellow-400 italic group-hover:text-yellow-300 transition-colors">
                        {algorithm === "bubble" && "Bubble Sort is named for the way smaller elements 'bubble' to the top of the list through exchanges."}
                        {algorithm === "insertion" && "Insertion Sort is similar to how many people sort playing cards in their hands."}
                        {algorithm === "selection" && "Selection Sort makes the minimum number of swaps possible (n-1 in the worst case)."}
                        {algorithm === "quick" && "Quick Sort was developed by Tony Hoare in 1959 while he was an exchange student at Moscow State University."}
                        {algorithm === "merge" && "Merge Sort was invented by John von Neumann in 1945, one of the earliest divide-and-conquer algorithms described."}
                        {algorithm === "radix" && "Radix Sort predates modern computers and was used with punch card sorting machines in the early 20th century."}
                    </div>
                </div>
            </div>

            {/* Array visualization with enhanced container */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <ArrayVisualization
                    algorithm={algorithm}
                    array={array}
                    currentBar={currentBar}
                    isSorting={isSorting}
                    currentTestingAlgo={currentTestingAlgo}
                    isStopped={isStopped}
                />
            </div>
        </div>
    );
};

export default VisualizationPanel; 