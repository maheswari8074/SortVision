import React, { useState, useEffect } from 'react';
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
  // State for typing animation
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = 'Interactive visualization of popular sorting algorithms';
  
  // Typing animation effect
  useEffect(() => {
    if (displayText.length < fullText.length) {
      const typingTimer = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, 50); // Adjust speed of typing here
      
      return () => clearTimeout(typingTimer);
    } else {
      setIsTypingComplete(true);
    }
  }, [displayText]);
  
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-5 overflow-hidden">
      {/* Header with logo and title */}
      <div className="flex items-center gap-3 mb-6 animate-fade-down animate-once animate-duration-[800ms] animate-delay-100">
        <Terminal className="h-8 w-8 text-emerald-400 animate-pulse animate-infinite animate-duration-[3000ms]" />
        <h1 className="text-3xl font-mono font-bold text-white">
          <span className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300">algorithm</span>
          <span className="text-purple-400 hover:text-purple-300 transition-colors duration-300">.visualizer</span>
          <span className="text-slate-400 hover:text-white transition-colors duration-300">()</span>
        </h1>
        <Code className="h-6 w-6 text-slate-400 animate-spin animate-once animate-duration-[1500ms] animate-delay-300" />
      </div>
      
      {/* Subtitle with typing animation */}
      <div className="text-center text-slate-400 font-mono mb-8 max-w-md h-6 animate-fade-up animate-once animate-duration-[800ms] animate-delay-300">
        <span className="text-amber-400">//</span> {displayText}
        {!isTypingComplete && <span className="inline-block w-2 h-4 bg-amber-400 ml-1 animate-pulse"></span>}
      </div>
      
      {/* Main Sorting Visualizer Component */}
      <div className="animate-fade-up animate-once animate-duration-[1000ms] animate-delay-500 w-full max-w-4xl">
        <SortingVisualizer />
      </div>
      
      {/* Footer */}
      <div className="mt-6 text-slate-500 text-xs font-mono text-center animate-fade-up animate-once animate-duration-[800ms] animate-delay-700">
        <span className="text-slate-600">/**</span> Built with 
        <span className="inline-block animate-bounce animate-infinite animate-duration-[2000ms] mx-1">❤️</span> 
        by alienX <span className="text-slate-600">*/</span>
        <div className="mt-2 flex items-center justify-center gap-4">
          <a 
            href="https://github.com/alienx5499/SortVision" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 hover:scale-110 transition-all duration-300"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
          
          <a 
            href="https://www.linkedin.com/in/prabalpatra5499/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-blue-400 hover:scale-110 transition-all duration-300"
          >
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn</span>
          </a>
          
          <a 
            href="https://x.com/alienx5499" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-sky-400 hover:scale-110 transition-all duration-300"
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