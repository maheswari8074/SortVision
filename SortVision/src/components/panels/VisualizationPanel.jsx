import React from 'react';
import { Terminal, Info, CheckCircle2, AlertTriangle, Code, Lightbulb, Zap, Brain, Cpu, GitBranch, History } from 'lucide-react';
import { ArrayVisualization } from '../visualizations';

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
                            {Array.from({ length: algorithm === "quick" ? 12 : algorithm === "merge" ? 8 : algorithm === "insertion" ? 7 : algorithm === "radix" ? 5 : algorithm === "selection" ? 6 : 4 }).map((_, i) => (
                                <div key={i} className="group-hover:text-emerald-400 transition-colors">{i + 1}</div>
                            ))}
                        </div>

                        {/* Code with enhanced animations */}
                        <div className="pl-8 w-full relative">
                            <pre className="text-xs font-mono text-emerald-400 relative group">
                                {/* Left border accent */}
                                <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-emerald-400/20 group-hover:bg-emerald-400/40 transition-colors"></div>
                                
                                {/* Code content with hover effect */}
                                <code className="block group-hover:translate-x-1 transition-transform">
                                    {algorithm === "bubble" && `function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) swap(arr, j, j + 1);
        }
    }
}`}
                                    {algorithm === "insertion" && `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`}
                                    {algorithm === "selection" && `function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx !== i) swap(arr, i, minIdx);
    }
}`}
                                    {algorithm === "quick" && `function quickSort(arr, low, high) {
    if (low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return i + 1;
}`}
                                    {algorithm === "merge" && `function mergeSort(arr, l, r) {
    if (l < r) {
        let m = Math.floor(l + (r - l) / 2);
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

function merge(arr, l, m, r) {
    // Merge two sorted subarrays
}`}
                                    {algorithm === "radix" && `function radixSort(arr) {
    let max = getMax(arr);
    for (let exp = 1; max/exp > 0; exp *= 10) {
        countSort(arr, exp);
    }
}`}
                                </code>
                                
                                {/* Blinking cursor */}
                                <div className="absolute bottom-0 left-[.7rem] h-3.5 w-1.5 bg-emerald-400 animate-[blink_1s_ease-in-out_infinite]"></div>
                                
                                {/* Hover highlight effect */}
                                <div className="absolute inset-0 bg-emerald-400/0 group-hover:bg-emerald-400/5 transition-colors rounded"></div>
                            </pre>
                        </div>
                    </div>
                </div>

                {/* New sections for enhanced interactivity */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Algorithm Category Info */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg border border-slate-700/50 group hover:bg-slate-800/80 transition-colors relative overflow-hidden">
                        {/* Animated corner accent */}
                        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
                        
                        {/* Animated bottom line */}
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-emerald-500/50 via-teal-500/50 to-blue-500/50 rounded transition-all duration-700"></div>
                        
                        <div className="text-xs font-bold text-slate-300 mb-3 flex items-center relative">
                            {getAlgorithmInfo().category_icon}
                            <span className="ml-2">{getAlgorithmInfo().category}</span>
                        </div>
                        
                        <div className="text-sm text-slate-400">
                            <p className="mb-2">Related Algorithms:</p>
                            <ul className="list-disc list-inside space-y-1">
                                {getAlgorithmInfo().related.map((algo, index) => (
                                    <li key={index} className="text-slate-500">{algo}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Historical Context */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg border border-slate-700/50 group hover:bg-slate-800/80 transition-colors relative overflow-hidden">
                        {/* Animated corner accent */}
                        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
                        
                        {/* Animated bottom line */}
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-rose-500/50 rounded transition-all duration-700"></div>
                        
                        <div className="text-xs font-bold text-slate-300 mb-3 flex items-center relative">
                            <History className="h-4 w-4 text-purple-400" />
                            <span className="ml-2">Historical Context</span>
                        </div>
                        
                        <div className="text-sm text-slate-400">
                            <p className="mb-2">Invented by: <span className="text-purple-400">{getAlgorithmInfo().inventor}</span></p>
                            <p>Year: <span className="text-purple-400">{getAlgorithmInfo().year}</span></p>
                        </div>
                    </div>
                </div>

                {/* Interactive Tip Section */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg border border-slate-700/50 group hover:bg-slate-800/80 transition-colors relative overflow-hidden">
                    {/* Animated corner accent */}
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
                    
                    {/* Animated bottom line */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-orange-500/50 rounded transition-all duration-700"></div>
                    
                    <div className="text-xs font-bold text-slate-300 mb-3 flex items-center relative">
                        <Lightbulb className="mr-2 h-4 w-4 text-amber-400 animate-pulse" />
                        <span className="tracking-widest relative">
                            PRO TIP
                            <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-amber-400/0 via-amber-400/70 to-amber-400/0"></span>
                        </span>
                    </div>
                    <div className="text-xs text-amber-400 italic group-hover:text-amber-300 transition-colors relative">
                        {getTip()}
                    </div>
                </div>

                {/* Fun fact with enhanced styling */}
                <div className="mt-4 bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg border border-slate-700/50 group hover:bg-slate-800/80 transition-colors relative overflow-hidden">
                    {/* Animated corner accent */}
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
                    
                    {/* Animated bottom line */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-yellow-500/50 via-orange-500/50 to-red-500/50 rounded transition-all duration-700"></div>
                    
                    <div className="text-xs font-bold text-slate-300 mb-3 flex items-center relative">
                        <Zap className="mr-2 h-4 w-4 text-yellow-400 group-hover:animate-bounce" />
                        <span className="tracking-widest relative">
                            FUN FACT
                            <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-yellow-400/0 via-yellow-400/70 to-yellow-400/0"></span>
                        </span>
                    </div>
                    <div className="text-xs text-yellow-400 italic group-hover:text-yellow-300 transition-colors relative">
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
            <div className="relative group mt-6">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 via-blue-500/30 to-purple-500/30 rounded-xl blur-md opacity-70 animate-pulse-slow"></div>
                <div className="relative p-1 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700/50 overflow-hidden">
                    {/* Animated corner accent */}
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
                    
                    {/* Animated bottom line */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-emerald-500/50 rounded transition-all duration-700"></div>
                    
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
        </div>
    );
};

export default VisualizationPanel;