
import React from "react";
import {
Zap,
Clock,
Terminal,
Shuffle,
MoveRight,
Activity,
BadgePercent,
} from "lucide-react";

const getColorForPerformance = (score) => {
if (score > 80) return "text-green-500";
if (score > 60) return "text-yellow-400";
return "text-red-500";
};

const CurrentRunMetrics = ({ metrics, sortedMetrics, algorithm, array }) => {
if (!metrics || !array || array.length === 0) return null;

const { swaps, comparisons, time, steps } = metrics;

const efficiency = (steps / time).toFixed(2); // steps/ms
const swapRatio = (swaps / comparisons).toFixed(2);
const timePerElement = (time / array.length).toFixed(2);
const score = Math.max(
100 - swaps - comparisons / 100 - time / 50 + efficiency,
0
).toFixed(2);

const best = sortedMetrics.reduce((best, curr) => {
const currEff = curr.steps / curr.time;
const bestEff = best.steps / best.time;
return currEff > bestEff ? curr : best;
}, sortedMetrics[0]);

const isBest = steps / time >= best.steps / best.time;

return (
<div className="bg-slate-900 p-4 rounded border border-slate-800 relative overflow-hidden group">
{/* Animated gradient background */}
<div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-[gradient_8s_ease_infinite] opacity-25 pointer-events-none" />
  <div className="relative z-10">
    <h2 className="text-xl font-semibold mb-2 text-white flex items-center gap-2">
      <Zap className="text-yellow-400" size={20} />
      {algorithm} Run Stats
    </h2>
    <ul className="space-y-1 text-sm text-slate-300">
      <li className="flex items-center gap-2">
        <Shuffle size={16} className="text-blue-400" />
        Swaps: {swaps}
      </li>
      <li className="flex items-center gap-2">
        <MoveRight size={16} className="text-purple-400" />
        Comparisons: {comparisons}
      </li>
      <li className="flex items-center gap-2">
        <Terminal size={16} className="text-pink-400" />
        Steps: {steps}
      </li>
      <li className="flex items-center gap-2">
        <Clock size={16} className="text-orange-400" />
        Time: {time} ms
      </li>
      <li className="flex items-center gap-2">
        <Activity size={16} className="text-green-400" />
        Efficiency: {efficiency} steps/ms
      </li>
      <li className="flex items-center gap-2">
        <BadgePercent size={16} className="text-cyan-400" />
        Score:{" "}
        <span className={`font-semibold ${getColorForPerformance(score)}`}>
          {score}%
        </span>
      </li>
    </ul>

    {isBest && (
      <div className="mt-2 text-xs text-green-400">
        🌟 Best Efficiency This Session
      </div>
    )}
  </div>
</div>
  );
}
export default CurrentRunMetrics;