import React from 'react';
import { RefreshCw, Play, Square } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ControlButtons = ({ generateNewArray, startSorting, stopSorting, isSorting }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Button 
        variant="outline" 
        onClick={generateNewArray} 
        disabled={isSorting}
        className="bg-slate-800 border-slate-700 text-emerald-400 hover:bg-slate-700 hover:text-emerald-300 font-mono flex items-center justify-center"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        new_array()
      </Button>
      
      <Button 
        onClick={startSorting} 
        disabled={isSorting}
        className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono flex items-center justify-center"
      >
        <Play className="mr-2 h-4 w-4" />
        {isSorting ? "sorting..." : "start()"}
      </Button>
      
      <Button 
        variant="destructive" 
        onClick={stopSorting} 
        disabled={!isSorting}
        className="font-mono flex items-center justify-center"
      >
        <Square className="mr-2 h-4 w-4" />
        stop()
      </Button>
    </div>
  );
};

export default ControlButtons; 