import React from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Terminal } from 'lucide-react';

/**
 * ContributionHeader Component
 * 
 * Renders the contribution panel header with title and decorative elements
 * Uses the same terminal style as SortingHeader
 */
const ContributionHeader = () => {
  return (
    <CardHeader className="border-b border-slate-800 bg-slate-900">
      <div className="flex items-center">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <CardTitle className="font-mono flex items-center">
          <Terminal className="mr-2 h-5 w-5 text-emerald-400" />
          <span className="text-emerald-400">contribute</span>
          <span className="text-purple-400">()</span>
          <span className="text-slate-400 text-sm ml-2">// community panel</span>
        </CardTitle>
        <div className="ml-auto flex items-center">
          <Users className="h-4 w-4 text-slate-400 animate-pulse" style={{ animationDuration: '3s' }} />
        </div>
      </div>
    </CardHeader>
  );
};

export default ContributionHeader; 