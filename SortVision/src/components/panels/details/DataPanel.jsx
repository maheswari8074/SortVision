import React from 'react';
import { ArrayVisualization } from '../../visualizations';
import { AlgorithmSelector, AlgorithmDetails, AlgorithmInfo, InteractiveTip, FunFact } from '.';

/**
 * DataPanel Component
 * 
 * Displays the visualization and information of sorting algorithms:
 * - Algorithm selection UI
 * - Algorithm details (pseudocode, characteristics)
 * - Algorithm information (category, related algorithms, historical context)
 * - Interactive tips and fun facts
 * - Array visualization with animated bars
 */
const DataPanel = ({
    algorithm,
    array,
    currentBar,
    isSorting,
    currentTestingAlgo,
    isStopped,
    setAlgorithm
}) => {
    return (
        <div className="space-y-6">
            {/* Algorithm Details with enhanced styling */}
            <div className="bg-slate-900 p-4 rounded border border-slate-800">
                {/* Algorithm Selector Component */}
                <AlgorithmSelector algorithm={algorithm} setAlgorithm={setAlgorithm} />
                
                {/* Algorithm Details Component */}
                <AlgorithmDetails algorithm={algorithm} />

                {/* Algorithm Info Component */}
                <AlgorithmInfo algorithm={algorithm} />

                {/* Interactive Tip Component */}
                <InteractiveTip algorithm={algorithm} />

                {/* Fun Fact Component */}
                <FunFact algorithm={algorithm} />
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

export default DataPanel; 