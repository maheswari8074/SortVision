import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Terminal, Users } from 'lucide-react';
import ContributionPanel from './panels/ContributionPanel';

/**
 * Contributors Page Component
 * 
 * Full page wrapper for the ContributionPanel that provides:
 * - Page metadata and SEO
 * - Full page layout styling
 * - Hero section
 * - Footer call to action
 */
const ContributorsPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>Contributors - SortVision | SSOC Season 4</title>
        <meta name="description" content="Meet the amazing contributors who make SortVision possible. Join our Social Summer of Code Season 4 community!" />
        <meta name="keywords" content="SortVision contributors, SSOC Season 4, open source contributors, algorithm visualization contributors" />
      </Helmet>

      {/* Hero Section - SortVision Style */}
      <div className="bg-slate-950 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center animate-fade-down animate-once">
          {/* Terminal-style header */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            <Terminal className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-400 animate-pulse animate-infinite animate-duration-[3000ms]" />
            <h1 className="text-2xl sm:text-4xl font-mono font-bold text-white">
              <span className="text-emerald-400">Sort</span>
              <span className="text-purple-400">Vision</span>
              <span className="text-slate-400">.contributors</span>
              <span className="text-amber-400">()</span>
            </h1>
            <Users className="h-4 w-4 sm:h-6 sm:w-6 text-slate-400" />
          </div>
          
          {/* Subtitle with typing effect style */}
          <div className="text-slate-400 font-mono mb-6 sm:mb-8">
            <span className="text-amber-400">//</span> Meet the developers building algorithm visualization
          </div>

          {/* SSOC Badge - Terminal style */}
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-purple-500/50 bg-purple-500/10 font-mono text-sm text-purple-400">
            <span className="text-emerald-400">$</span> ssoc --season=4 --year=2025
          </div>
        </div>
      </div>

      {/* Main Content with ContributionPanel */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ContributionPanel />
        </div>
      </div>

      {/* Footer Call to Action - Terminal Style */}
      <div className="bg-slate-950 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="font-mono text-slate-400 mb-4">
            <span className="text-emerald-400">sortvision@terminal</span>
            <span className="text-slate-400"> ~$ </span>
            <span className="text-amber-400">join --community</span>
          </div>
          <p className="text-slate-400 font-mono text-sm mb-8">
            <span className="text-amber-400">//</span> Help us make algorithm learning accessible for everyone!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/CONTRIBUTING.md"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600/20 border border-emerald-500/50 hover:bg-emerald-600/30 hover:border-emerald-400 text-emerald-400 rounded font-mono text-sm transition-all duration-300"
            >
              <Terminal className="w-4 h-4" />
              ./start-contributing.sh
            </a>
            <a
              href="https://github.com/alienx5499/SortVision/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-purple-500/50 hover:bg-purple-500/10 text-purple-400 hover:text-purple-300 rounded font-mono text-sm transition-all duration-300"
            >
              <Users className="w-4 h-4" />
              ./join-discussion.sh
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributorsPage; 