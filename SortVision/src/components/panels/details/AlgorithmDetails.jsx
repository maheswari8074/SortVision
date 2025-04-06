import React from 'react';
import { Info, Terminal } from 'lucide-react';

/**
 * AlgorithmDetails Component
 * 
 * Displays details of the algorithm with its pseudocode in a 
 * code-editor-like interface.
 */
const AlgorithmDetails = ({ algorithm }) => {
    // Get explicit color classes based on algorithm
    const getCornerAccentClass = () => {
        switch(algorithm) {
            case 'bubble': return "bg-gradient-to-br from-red-500/20 to-orange-500/20";
            case 'insertion': return "bg-gradient-to-br from-orange-500/20 to-amber-500/20";
            case 'selection': return "bg-gradient-to-br from-yellow-500/20 to-yellow-500/20";
            case 'quick': return "bg-gradient-to-br from-green-500/20 to-emerald-500/20";
            case 'merge': return "bg-gradient-to-br from-blue-500/20 to-cyan-500/20";
            case 'radix': return "bg-gradient-to-br from-purple-500/20 to-indigo-500/20";
            case 'heap': return "bg-gradient-to-br from-indigo-500/20 to-purple-500/20";
            case 'bucket': return "bg-gradient-to-br from-pink-500/20 to-rose-500/20";
            default: return "bg-gradient-to-br from-emerald-500/20 to-teal-500/20";
        }
    };

    const getBackgroundGlowClass = () => {
        switch(algorithm) {
            case 'bubble': return "bg-gradient-to-r from-red-500/30 via-orange-500/30 to-purple-500/30";
            case 'insertion': return "bg-gradient-to-r from-orange-500/30 via-amber-500/30 to-purple-500/30";
            case 'selection': return "bg-gradient-to-r from-yellow-500/30 via-yellow-500/30 to-purple-500/30";
            case 'quick': return "bg-gradient-to-r from-green-500/30 via-emerald-500/30 to-purple-500/30";
            case 'merge': return "bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-purple-500/30";
            case 'radix': return "bg-gradient-to-r from-purple-500/30 via-indigo-500/30 to-purple-500/30";
            case 'heap': return "bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-indigo-500/30";
            case 'bucket': return "bg-gradient-to-r from-pink-500/30 via-rose-500/30 to-pink-500/30";
            default: return "bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-purple-500/30";
        }
    };

    const getParticlesAndLinesClasses = () => {
        switch(algorithm) {
            case 'bubble': 
                return {
                    particle1: "bg-red-500/50",
                    particle2: "bg-orange-500/50",
                    line1: "bg-gradient-to-r from-transparent via-red-500/30 to-transparent",
                    line2: "bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"
                };
            case 'insertion': 
                return {
                    particle1: "bg-orange-500/50",
                    particle2: "bg-amber-500/50",
                    line1: "bg-gradient-to-r from-transparent via-orange-500/30 to-transparent",
                    line2: "bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
                };
            case 'selection': 
                return {
                    particle1: "bg-yellow-500/50",
                    particle2: "bg-yellow-500/50",
                    line1: "bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent",
                    line2: "bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"
                };
            case 'quick': 
                return {
                    particle1: "bg-green-500/50",
                    particle2: "bg-emerald-500/50",
                    line1: "bg-gradient-to-r from-transparent via-green-500/30 to-transparent",
                    line2: "bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
                };
            case 'merge': 
                return {
                    particle1: "bg-blue-500/50",
                    particle2: "bg-cyan-500/50",
                    line1: "bg-gradient-to-r from-transparent via-blue-500/30 to-transparent",
                    line2: "bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
                };
            case 'radix': 
                return {
                    particle1: "bg-purple-500/50",
                    particle2: "bg-indigo-500/50",
                    line1: "bg-gradient-to-r from-transparent via-purple-500/30 to-transparent",
                    line2: "bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"
                };
            case 'heap': 
                return {
                    particle1: "bg-indigo-500/50",
                    particle2: "bg-purple-500/50",
                    line1: "bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent",
                    line2: "bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
                };
            case 'bucket': 
                return {
                    particle1: "bg-pink-500/50",
                    particle2: "bg-rose-500/50",
                    line1: "bg-gradient-to-r from-transparent via-pink-500/30 to-transparent",
                    line2: "bg-gradient-to-r from-transparent via-rose-500/30 to-transparent"
                };
            default: 
                return {
                    particle1: "bg-emerald-500/50",
                    particle2: "bg-teal-500/50",
                    line1: "bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent",
                    line2: "bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"
                };
        }
    };

    const cornerAccentClass = getCornerAccentClass();
    const backgroundGlowClass = getBackgroundGlowClass();
    const { particle1, particle2, line1, line2 } = getParticlesAndLinesClasses();

    return (
        <div className="relative group mb-8">
            {/* Animated background glow effect */}
            <div className={`absolute -inset-2 ${backgroundGlowClass} rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/algo overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full">
                        {/* Animated grid pattern */}
                        <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>
                        
                        {/* Floating particles */}
                        <div className={`absolute h-2 w-2 rounded-full ${particle1} top-[10%] left-[20%] animate-pulse`} style={{ animationDuration: '3s' }}></div>
                        <div className={`absolute h-1 w-1 rounded-full ${particle2} top-[30%] left-[70%] animate-pulse`} style={{ animationDuration: '2.3s' }}></div>
                        <div className="absolute h-1.5 w-1.5 rounded-full bg-purple-500/50 top-[70%] left-[30%] animate-pulse" style={{ animationDuration: '4s' }}></div>
                        <div className="absolute h-1 w-1 rounded-full bg-cyan-500/50 top-[60%] left-[80%] animate-pulse" style={{ animationDuration: '3.5s' }}></div>
                        
                        {/* Animated code lines */}
                        <div className={`absolute top-[15%] left-0 h-px w-[30%] ${line1} animate-[moveRight_15s_linear_infinite]`}></div>
                        <div className={`absolute top-[45%] left-0 h-px w-[20%] ${line2} animate-[moveRight_12s_linear_infinite]`}></div>
                        <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
                    </div>
                </div>
                
                {/* Animated corner accent */}
                <div className={`absolute -top-10 -right-10 w-20 h-20 ${cornerAccentClass} rounded-full blur-md group-hover/algo:scale-150 transition-transform duration-700`}></div>
                
                {/* Animated bottom line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/algo:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>
                
                <div className="font-mono text-sm text-slate-400 mb-4 flex items-center relative z-10 group-hover/algo:text-emerald-400 transition-colors duration-300">
                    <Info className="mr-2 h-4 w-4 text-emerald-400 animate-pulse" style={{ animationDuration: '4s' }} />
                    <span className="transition-colors duration-300">// {algorithm}_sort() details</span>
                </div>

                {/* Algorithm visualization with enhanced effects */}
                <div className="relative bg-slate-800/50 p-4 rounded border border-slate-700/50 overflow-hidden group/viz transition-all duration-500 hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900/50">
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 w-0 group-hover/viz:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent"></div>
                    
                    {/* Interactive header with hover effect */}
                    <div className="text-xs text-slate-400 mb-3 flex items-center justify-between relative z-10">
                        <span className="tracking-widest relative group-hover/viz:text-emerald-300 transition-colors duration-300 flex items-center cursor-pointer">
                            <Terminal className="mr-2 h-4 w-4 text-emerald-400 group-hover/viz:animate-spin" style={{ animationDuration: '3s' }} />
                            <span className="group-hover/viz:tracking-wider transition-all">VISUALIZATION</span>
                            <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-emerald-400/0 via-emerald-400/70 to-emerald-400/0"></span>
                        </span>
                    </div>

                    {/* Code editor with enhanced styling */}
                    <div className="flex justify-center p-3 bg-slate-900/80 rounded relative group/code overflow-hidden transition-all duration-500 hover:shadow-inner hover:bg-slate-900/90">
                        {/* Enhanced line numbers */}
                        <div className="absolute left-2 top-3 bottom-3 text-right pr-2 border-r border-slate-700/50 text-[10px] text-slate-500 font-mono">
                            {Array.from({ length: algorithm === "quick" ? 12 : algorithm === "merge" ? 8 : algorithm === "insertion" ? 7 : algorithm === "radix" ? 5 : algorithm === "selection" ? 6 : 4 }).map((_, i) => (
                                <div key={i} className="group-hover/code:text-emerald-400 transition-colors">{i + 1}</div>
                            ))}
                        </div>

                        {/* Code with enhanced animations */}
                        <div className="pl-8 w-full relative">
                            <pre className="text-xs font-mono text-emerald-400 relative group/pre">
                                {/* Left border accent */}
                                <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-emerald-400/20 group-hover/pre:bg-emerald-400/40 transition-colors"></div>
                                
                                {/* Code content with hover effect */}
                                <code className="block group-hover/pre:translate-x-1 transition-transform">
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
                                    {algorithm === "heap" && `function heapSort(arr) {
    let n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n/2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        swap(arr, 0, i);
        heapify(arr, i, 0);
    }
}

function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        swap(arr, i, largest);
        heapify(arr, n, largest);
    }
}`}
                                    {algorithm === "bucket" && `function bucketSort(arr) {
    let n = arr.length;
    let buckets = Array.from({length: n}, () => []);
    
    // Put elements in buckets
    for (let i = 0; i < n; i++) {
        let bucketIndex = Math.floor(n * arr[i]);
        buckets[bucketIndex].push(arr[i]);
    }
    
    // Sort individual buckets
    for (let i = 0; i < n; i++) {
        buckets[i].sort((a, b) => a - b);
    }
    
    // Concatenate all buckets
    let index = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
            arr[index++] = buckets[i][j];
        }
    }
}`}
                                </code>
                                
                                {/* Blinking cursor */}
                                <div className="absolute bottom-0 left-[.7rem] h-3.5 w-1.5 bg-emerald-400 animate-[blink_1s_ease-in-out_infinite]"></div>
                                
                                {/* Hover highlight effect */}
                                <div className="absolute inset-0 bg-emerald-400/0 group-hover/pre:bg-emerald-400/5 transition-colors rounded"></div>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlgorithmDetails; 