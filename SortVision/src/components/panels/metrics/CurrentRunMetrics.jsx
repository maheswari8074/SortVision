import React from "react";

const CurrentRunMetrics = ({ metrics }) => {
  const { swaps = 0, comparisons = 0, steps = 0, time = "0.00" } = metrics || {};

  return (
    <div className="bg-slate-900 p-4 rounded border border-slate-800 relative overflow-hidden group">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-[gradient_8s_ease_infinite] opacity-20 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-white text-sm font-medium">
        <div className="metric-item">
          <span className="label block text-slate-400">🔁 Swaps</span>
          <span className="value text-lg font-semibold">{swaps}</span>
        </div>
        <div className="metric-item">
          <span className="label block text-slate-400">🔍 Comparisons</span>
          <span className="value text-lg font-semibold">{comparisons}</span>
        </div>
        <div className="metric-item">
          <span className="label block text-slate-400">🚶 Steps</span>
          <span className="value text-lg font-semibold">{steps}</span>
        </div>
        <div className="metric-item">
          <span className="label block text-slate-400">⏱️ Time</span>
          <span className="value text-lg font-semibold">{time} ms</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentRunMetrics;
