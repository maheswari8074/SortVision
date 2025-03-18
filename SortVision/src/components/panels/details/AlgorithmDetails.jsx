import React from 'react';
import { Info, Terminal } from 'lucide-react';

/**
 * AlgorithmDetails Component
 * 
 * Displays details of the algorithm with its pseudocode in a 
 * code-editor-like interface.
 */
const AlgorithmDetails = ({ algorithm }) => {
    // Color scheme based on algorithm
    const getColorScheme = () => {
        switch(algorithm) {
            case 'bubble': return { base: 'red', accent: 'orange' };
            case 'insertion': return { base: 'orange', accent: 'amber' };
            case 'selection': return { base: 'yellow', accent: 'yellow' };
            case 'quick': return { base: 'green', accent: 'emerald' };
            case 'merge': return { base: 'blue', accent: 'cyan' };
            case 'radix': return { base: 'purple', accent: 'indigo' };
            default: return { base: 'emerald', accent: 'teal' };
        }
    };

    const { base, accent } = getColorScheme();

    return (
        <div className="relative group mb-8">
            {/* Animated background glow effect */}
            <div className={`absolute -inset-2 bg-gradient-to-r from-${base}-500/30 via-${accent}-500/30 to-purple-500/30 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/algo overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full">
                        {/* Animated grid pattern */}
                        <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>
                        
                        {/* Floating particles */}
                        <div className={`absolute h-2 w-2 rounded-full bg-${base}-500/50 top-[10%] left-[20%] animate-pulse`} style={{ animationDuration: '3s' }}></div>
                        <div className={`absolute h-1 w-1 rounded-full bg-${accent}-500/50 top-[30%] left-[70%] animate-pulse`} style={{ animationDuration: '2.3s' }}></div>
                        <div className="absolute h-1.5 w-1.5 rounded-full bg-purple-500/50 top-[70%] left-[30%] animate-pulse" style={{ animationDuration: '4s' }}></div>
                        <div className="absolute h-1 w-1 rounded-full bg-cyan-500/50 top-[60%] left-[80%] animate-pulse" style={{ animationDuration: '3.5s' }}></div>
                        
                        {/* Animated code lines */}
                        <div className={`absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-${base}-500/30 to-transparent animate-[moveRight_15s_linear_infinite]`}></div>
                        <div className={`absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-${accent}-500/30 to-transparent animate-[moveRight_12s_linear_infinite]`}></div>
                        <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
                    </div>
                </div>
                
                {/* Animated corner accent */}
                <div className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-${base}-500/20 to-${accent}-500/20 rounded-full blur-md group-hover/algo:scale-150 transition-transform duration-700`}></div>
                
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