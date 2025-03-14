import React from 'react';
import { Terminal, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
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
    isStopped
}) => {
    return (
        <div className="space-y-6">
            {/* Algorithm Details */}
            <div className="bg-slate-900 p-4 rounded border border-slate-800">
                <div className="font-mono text-sm text-slate-400 mb-4 flex items-center">
                    <Info className="mr-2 h-4 w-4" />
          // {algorithm}_sort() details
                </div>

                {/* Algorithm visualization */}
                <div className="bg-slate-800 p-3 rounded border border-slate-700 mb-4 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(59,130,246,0.05),transparent)] animate-[gradient_8s_ease_infinite] bg-[length:200%_100%]"></div>
                    <div className="text-xs text-slate-400 mb-2 flex items-center">
                        <Terminal className="mr-1 h-3 w-3 text-emerald-400" />
                        VISUALIZATION
                    </div>
                    <div className="flex justify-center p-3 bg-slate-900 rounded relative">
                        {/* Code editor-like line numbers */}
                        <div className="absolute left-2 top-3 bottom-3 text-right pr-2 border-r border-slate-700/50 text-[10px] text-slate-500 font-mono">
                            {algorithm === "bubble" && Array.from({ length: 4 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                            {algorithm === "insertion" && Array.from({ length: 7 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                            {algorithm === "selection" && Array.from({ length: 5 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                            {algorithm === "quick" && Array.from({ length: 12 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                            {algorithm === "merge" && Array.from({ length: 8 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                            {algorithm === "radix" && Array.from({ length: 7 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                        </div>

                        {/* Code with simpler formatting */}
                        <div className="pl-8 w-full">
                            {algorithm === "bubble" && (
                                <pre className="text-xs font-mono text-emerald-400 relative">
                                    <code>
                                        {`for i = 0 to n-1
  for j = 0 to n-i-1
    if arr[j] > arr[j+1]
      swap(arr[j], arr[j+1])`}
                                    </code>
                                    {/* Blinking cursor after the last line */}
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

                    {/* We've added specific cursors for each algorithm, so we don't need this general one anymore */}
                </div>

                {/* Characteristics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-800 p-3 rounded border border-slate-700">
                        <div className="text-xs text-slate-400 mb-2">CHARACTERISTICS</div>
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

                    <div className="bg-slate-800 p-3 rounded border border-slate-700">
                        <div className="text-xs text-slate-400 mb-2">IDEAL USE CASES</div>
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

                {/* Fun fact */}
                <div className="bg-slate-800 p-3 rounded border border-slate-700">
                    <div className="text-xs text-slate-400 mb-2">FUN FACT</div>
                    <div className="text-xs text-amber-400 italic">
                        {algorithm === "bubble" && "Bubble Sort is named for the way smaller elements 'bubble' to the top of the list through exchanges."}
                        {algorithm === "insertion" && "Insertion Sort is similar to how many people sort playing cards in their hands."}
                        {algorithm === "selection" && "Selection Sort makes the minimum number of swaps possible (n-1 in the worst case)."}
                        {algorithm === "quick" && "Quick Sort was developed by Tony Hoare in 1959 while he was an exchange student at Moscow State University."}
                        {algorithm === "merge" && "Merge Sort was invented by John von Neumann in 1945, one of the earliest divide-and-conquer algorithms described."}
                        {algorithm === "radix" && "Radix Sort predates modern computers and was used with punch card sorting machines in the early 20th century."}
                    </div>
                </div>
            </div>

            {/* Use the reusable ArrayVisualization component */}
            <ArrayVisualization
                algorithm={algorithm}
                array={array}
                currentBar={currentBar}
                isSorting={isSorting}
                currentTestingAlgo={currentTestingAlgo}
                isStopped={isStopped}
            />
        </div>
    );
};

export default VisualizationPanel; 