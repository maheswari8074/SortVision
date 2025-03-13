// src/App.jsx

import React from 'react';
import { Terminal, Code } from 'lucide-react';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-5">
      <div className="flex items-center gap-3 mb-6">
        <Terminal className="h-8 w-8 text-emerald-400" />
        <h1 className="text-3xl font-mono font-bold text-white">
          <span className="text-emerald-400">algorithm</span>
          <span className="text-purple-400">.visualizer</span>
          <span className="text-slate-400">()</span>
        </h1>
        <Code className="h-6 w-6 text-slate-400" />
      </div>
    </div>
  );
};

export default App;