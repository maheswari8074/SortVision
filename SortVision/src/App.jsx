import React from 'react';
import SortingVisualizer from './components/SortingVisualizer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Terminal, Code, Github, Linkedin, Twitter } from 'lucide-react';

/**
 * Main Application Component
 * 
 * Renders the sorting visualizer application with header and footer
 * Includes Vercel Analytics for tracking usage and Speed Insights for performance monitoring
 */
const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-5">
      {/* Header with logo and title */}
      <div className="flex items-center gap-3 mb-6">
        <Terminal className="h-8 w-8 text-emerald-400" />
        <h1 className="text-3xl font-mono font-bold text-white">
          <span className="text-emerald-400">algorithm</span>
          <span className="text-purple-400">.visualizer</span>
          <span className="text-slate-400">()</span>
        </h1>
        <Code className="h-6 w-6 text-slate-400" />
      </div>
      
      {/* Subtitle */}
      <div className="text-center text-slate-400 font-mono mb-8 max-w-md">
        <span className="text-amber-400">//</span> Interactive visualization of popular sorting algorithms
      </div>
      
      {/* Main Sorting Visualizer Component */}
      <SortingVisualizer />
      
      {/* Footer */}
      <div className="mt-6 text-slate-500 text-xs font-mono text-center">
        <span className="text-slate-600">/**</span> Built with ❤️ by alienX <span className="text-slate-600">*/</span>
        <div className="mt-2 flex items-center justify-center gap-4">
          <a 
            href="https://github.com/alienx5499/SortVision" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
          
          <a 
            href="https://www.linkedin.com/in/prabalpatra5499/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-blue-400 transition-colors"
          >
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn</span>
          </a>
          
          <a 
            href="https://x.com/alienx5499" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-sky-400 transition-colors"
          >
            <Twitter className="h-4 w-4" />
            <span>X</span>
          </a>
        </div>
      </div>
      
      {/* Vercel Analytics - Tracks usage without affecting privacy */}
      <Analytics />
      
      {/* Vercel Speed Insights - Monitors performance metrics */}
      <SpeedInsights />
    </div>
  );
};

export default App; 