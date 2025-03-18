import React from 'react';
import { Info, Terminal } from 'lucide-react';

/**
 * AlgorithmDetails Component
 * 
 * Displays details of the algorithm with its pseudocode in a 
 * code-editor-like interface.
 */
const AlgorithmDetails = ({ algorithm }) => {
    return (
        <div className="bg-slate-800 p-3 rounded border border-slate-700 mb-4 relative overflow-hidden group">
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
        </div>
    );
};

export default AlgorithmDetails; 