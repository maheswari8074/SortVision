import React from 'react';
import PerformanceMetrics from './PerformanceMetrics';

const ExecutionTimePanel = ({ algorithm, arraySize }) => {
  const metrics = PerformanceMetrics();
  const estimate = metrics.estimateExecutionTime(algorithm, arraySize);

  return (
    <div className="p-4 bg-slate-800 rounded shadow text-slate-200 mb-4">
      <div className="font-bold mb-2">Estimated Performance</div>
      <div>Estimated Time: <span className="font-mono">{estimate.time} ms</span></div>
      <div>Estimated Memory: <span className="font-mono">{estimate.memory} MB</span></div>
      <div>Time Complexity: <span className="font-mono">{estimate.complexity?.average}</span></div>
      <div>Space Complexity: <span className="font-mono">{estimate.complexity?.space}</span></div>
    </div>
  );
};

export default ExecutionTimePanel; 