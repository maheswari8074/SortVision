import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, BarChart2, Zap, Beaker, StopCircle, Crown } from 'lucide-react';
import ArrayVisualization from './ArrayVisualization';

/**
 * MetricsPanel Component
 * 
 * Displays performance metrics for sorting algorithms:
 * - Current run metrics (swaps, comparisons, time)
 * - Algorithm comparison with rankings
 * - Test all algorithms functionality
 */
const MetricsPanel = ({ 
  metrics, 
  sortedMetrics, 
  isSorting, 
  currentTestingAlgo, 
  testAllAlgorithms, 
  stopSorting,
  algorithm,
  array,
  currentBar,
  isStopped
}) => {
  return (
    <div className="space-y-6">
      {/* Current Run Metrics */}
      <div className="bg-slate-900 p-4 rounded border border-slate-800">
        <div className="font-mono text-sm text-slate-400 mb-4">// current run metrics</div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-800 p-3 rounded border border-slate-700">
            <div className="text-xs text-slate-400 mb-1 flex items-center">
              <RefreshCw className="mr-1 h-3 w-3" /> SWAPS
            </div>
            <div className="text-xl text-emerald-400 font-mono">{metrics.swaps}</div>
          </div>
          <div className="bg-slate-800 p-3 rounded border border-slate-700">
            <div className="text-xs text-slate-400 mb-1 flex items-center">
              <BarChart2 className="mr-1 h-3 w-3" /> COMPARISONS
            </div>
            <div className="text-xl text-emerald-400 font-mono">{metrics.comparisons}</div>
          </div>
          <div className="bg-slate-800 p-3 rounded border border-slate-700">
            <div className="text-xs text-slate-400 mb-1 flex items-center">
              <Zap className="mr-1 h-3 w-3" /> TIME (MS)
            </div>
            <div className="text-xl text-emerald-400 font-mono">{metrics.time}</div>
          </div>
        </div>
      </div>

      {/* Algorithm Comparison Section */}
      <div className="bg-slate-900 p-4 rounded border border-slate-800">
        <div className="flex justify-between items-center mb-4">
          <div className="font-mono text-sm text-slate-400">// algorithm comparison</div>
          <div className="flex space-x-2">
            <Button 
              onClick={testAllAlgorithms} 
              disabled={isSorting && !currentTestingAlgo}
              className="bg-purple-600 hover:bg-purple-500 text-white font-mono text-sm flex items-center"
            >
              <Beaker className="mr-2 h-4 w-4" />
              test_all()
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={stopSorting} 
              disabled={!currentTestingAlgo}
              className="font-mono text-sm flex items-center"
            >
              <StopCircle className="mr-2 h-4 w-4" />
              stop_test()
            </Button>
          </div>
        </div>
        
        {/* Algorithm Ranking Cards */}
        <div className="space-y-2">
          {sortedMetrics.map(({ algo, metrics, rank }) => (
            <div 
              key={algo} 
              className={`bg-slate-800 p-3 rounded border ${
                rank === 1 ? 'border-yellow-500' : 'border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm text-emerald-400 font-mono mb-2">
                  {algo}_sort()
                  {/* Crown icon for the winner */}
                  {rank === 1 && (
                    <Crown 
                      className="inline-block ml-2 text-yellow-500"
                      style={{
                        animation: 'bounce 1s ease-in-out infinite',
                        height: '16px',
                        width: '16px'
                      }}
                    />
                  )}
                </div>
                {/* Rank badge */}
                <Badge 
                  variant="outline" 
                  className={`
                    ${rank === 1 ? 'bg-yellow-500/10 text-yellow-500' : 
                      rank === 2 ? 'bg-slate-400/10 text-slate-400' :
                      rank === 3 ? 'bg-amber-700/10 text-amber-700' :
                      'bg-slate-700/10 text-slate-500'}
                  `}
                >
                  #{rank}
                </Badge>
              </div>
              {/* Algorithm metrics */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-slate-400 flex items-center">
                  <RefreshCw className="mr-1 h-3 w-3 text-amber-400" />
                  Swaps: <span className="text-amber-400 ml-1">{metrics.swaps}</span>
                </div>
                <div className="text-slate-400 flex items-center">
                  <BarChart2 className="mr-1 h-3 w-3 text-amber-400" />
                  Comparisons: <span className="text-amber-400 ml-1">{metrics.comparisons}</span>
                </div>
                <div className="text-slate-400 flex items-center">
                  <Zap className="mr-1 h-3 w-3 text-amber-400" />
                  Time: <span className="text-amber-400 ml-1">{metrics.time}ms</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Winner summary */}
        {sortedMetrics.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="text-xs text-slate-400 font-mono flex items-center">
              <Crown className="mr-1 h-4 w-4 text-yellow-500" />
              // Winner: <span className="text-yellow-500">{sortedMetrics[0]?.algo}_sort()</span> 
              <span className="text-slate-500">
                ({sortedMetrics[0]?.metrics.time}ms)
              </span>
            </div>
          </div>
        )}
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
          height="h-100" // Increased height to match the images
        />
      )}
    </div>
  );
};

export default MetricsPanel; 