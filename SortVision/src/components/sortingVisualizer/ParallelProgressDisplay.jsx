import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ParallelProgressDisplay = ({ workerStatuses, overallParallelProgress, isParallelSorting }) => {
  if (!isParallelSorting && (!workerStatuses || workerStatuses.length === 0)) {
    // Don't render if not parallel sorting or no statuses to show (e.g., before first run)
    // Or, show a message indicating parallel processing is available.
    // For now, just return null if not actively parallel sorting.
    return null; 
  }

  // Show a default message if workers are initializing or not yet active
  if (isParallelSorting && (!workerStatuses || workerStatuses.length === 0)) {
    return (
        <Card className="my-4 border-slate-700 bg-slate-900 text-slate-300">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-purple-400">Parallel Execution Status</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-slate-400">Initializing parallel workers...</p>
            </CardContent>
        </Card>
    );
  }


  return (
    <Card className="my-4 border-slate-700 bg-slate-900 text-slate-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-purple-400">Parallel Execution Status</CardTitle>
      </CardHeader>
      <CardContent>
        {isParallelSorting && (
          <div className="mb-4">
            <p className="text-sm text-slate-400 mb-1">Overall Progress: {overallParallelProgress ? overallParallelProgress.toFixed(2) : '0.00'}%</p>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
              <div 
                className="bg-purple-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
                style={{ width: `${overallParallelProgress || 0}%` }}
              />
            </div>
          </div>
        )}

        <div className="space-y-3">
          {workerStatuses && workerStatuses.map(ws => (
            <div key={ws.id} className="p-3 bg-slate-800 rounded-lg shadow">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-emerald-400">Thread {ws.id + 1}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  ws.status === 'busy' ? 'bg-yellow-500 text-slate-900 animate-pulse' :
                  ws.status === 'idle' ? 'bg-green-500 text-slate-900' :
                  ws.status === 'error' ? 'bg-red-500 text-white' :
                  ws.status === 'terminated' ? 'bg-slate-600 text-white' :
                  'bg-slate-500 text-white' // Default / unknown
                }`}>
                  {ws.status}
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-1.5 mb-1">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-150 ease-linear ${
                    ws.status === 'error' ? 'bg-red-700' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${ws.progress || 0}%` }}
                />
              </div>
              {ws.error && (
                <p className="text-xs text-red-400 mt-1">
                  <span className="font-semibold">Error:</span> {typeof ws.error === 'object' ? JSON.stringify(ws.error) : ws.error}
                </p>
              )}
               /* Optionally show result preview or time taken if available
               {ws.status === 'idle' && ws.result && (
                <p className="text-xs text-slate-500 mt-1">
                   Time: {((ws.endTime - ws.startTime)/1000).toFixed(2)}s
                </p>
              )}
            </div>
          ))}
        </div>
         {!workerStatuses || workerStatuses.length === 0 && !isParallelSorting && (
            <p className="text-sm text-slate-500">Parallel processing details will appear here during execution.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ParallelProgressDisplay;
