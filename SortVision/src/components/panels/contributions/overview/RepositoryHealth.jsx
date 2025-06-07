import React, { useState, useEffect } from 'react';
import { Activity, GitPullRequest, AlertCircle, Package, Tag, RefreshCw } from 'lucide-react';

/**
 * Repository Health Component
 * 
 * Displays key project health metrics:
 * - Issues status (open vs closed)
 * - Pull requests status  
 * - Repository info (size, language)
 * - Latest release
 */
const RepositoryHealth = () => {
  const [healthData, setHealthData] = useState({
    issues: { open: 0, closed: 0 },
    pullRequests: { open: 0, merged: 0 },
    repository: { size: 0, language: 'JavaScript' },
    latestRelease: null,
    loading: true,
    error: null
  });

  const fetchHealthData = async () => {
    try {
      setHealthData(prev => ({ ...prev, loading: true, error: null }));
      
      // Development-only logging
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.port !== '') {
        console.log('Repository Health: Fetching health data...');
      }

      // Fetch repository basic info
      const repoResponse = await fetch('https://api.github.com/repos/alienx5499/SortVision', {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'SortVision-Health-Dashboard'
        }
      });

      // Fetch issues (open)
      const issuesResponse = await fetch('https://api.github.com/repos/alienx5499/SortVision/issues?state=open&per_page=1', {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'SortVision-Health-Dashboard'
        }
      });

      // Fetch pull requests (open)
      const prsResponse = await fetch('https://api.github.com/repos/alienx5499/SortVision/pulls?state=open&per_page=1', {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'SortVision-Health-Dashboard'
        }
      });

      // Fetch latest release
      const releaseResponse = await fetch('https://api.github.com/repos/alienx5499/SortVision/releases/latest', {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'SortVision-Health-Dashboard'
        }
      });

      let repoData = null, issuesData = null, prsData = null, releaseData = null;

      if (repoResponse.ok) {
        repoData = await repoResponse.json();
      }

      // Get total counts from headers (more efficient than fetching all)
      let openIssuesCount = 0, openPRsCount = 0;
      
      if (issuesResponse.ok) {
        const linkHeader = issuesResponse.headers.get('Link');
        if (linkHeader && linkHeader.includes('rel="last"')) {
          const lastPageMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
          openIssuesCount = lastPageMatch ? parseInt(lastPageMatch[1]) : 1;
        } else {
          issuesData = await issuesResponse.json();
          openIssuesCount = issuesData.length;
        }
      }

      if (prsResponse.ok) {
        const linkHeader = prsResponse.headers.get('Link');
        if (linkHeader && linkHeader.includes('rel="last"')) {
          const lastPageMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
          openPRsCount = lastPageMatch ? parseInt(lastPageMatch[1]) : 1;
        } else {
          prsData = await prsResponse.json();
          openPRsCount = prsData.length;
        }
      }

      if (releaseResponse.ok) {
        releaseData = await releaseResponse.json();
      }

      setHealthData({
        issues: {
          open: repoData?.open_issues_count || openIssuesCount,
          closed: 'N/A' // GitHub API doesn't provide closed issues count directly
        },
        pullRequests: {
          open: openPRsCount,
          merged: 'N/A' // Would require additional API calls to get accurate count
        },
        repository: {
          size: Math.round((repoData?.size || 0) / 1024), // Convert to MB
          language: repoData?.language || 'JavaScript'
        },
        latestRelease: releaseData ? {
          name: releaseData.name || releaseData.tag_name,
          publishedAt: releaseData.published_at,
          htmlUrl: releaseData.html_url
        } : null,
        loading: false,
        error: null
      });

      // Development-only logging
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.port !== '') {
        console.log('Repository Health: Data updated successfully');
      }

    } catch (error) {
      console.error('Repository Health: Error fetching data:', error);
      setHealthData(pre => ({
        ...pre,
        loading: false,
        error: error.message,
        // Fallback data
        issues: { open: 0, closed: 'N/A' },
        pullRequests: { open: 0, merged: 'N/A' },
        repository: { size: 2, language: 'JavaScript' },
        latestRelease: null
      }));
    }
  };

  useEffect(() => {
    fetchHealthData();
  }, []);

  const healthMetrics = [
    {
      title: 'Issues',
      icon: AlertCircle,
      color: 'blue',
      data: [
        { label: 'Open', value: healthData.issues.open, color: 'text-yellow-400' },
        { label: 'Closed', value: healthData.issues.closed, color: 'text-green-400' }
      ]
    },
    {
      title: 'Pull Requests', 
      icon: GitPullRequest,
      color: 'purple',
      data: [
        { label: 'Open', value: healthData.pullRequests.open, color: 'text-blue-400' },
        { label: 'Merged', value: healthData.pullRequests.merged, color: 'text-emerald-400' }
      ]
    },
    {
      title: 'Repository',
      icon: Package,
      color: 'emerald',
      data: [
        { label: 'Size', value: `${healthData.repository.size}MB`, color: 'text-slate-300' },
        { label: 'Language', value: healthData.repository.language, color: 'text-blue-400' }
      ]
    }
  ];

  return (
    <div className="mb-4 relative group">
      {/* Animated background glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/health overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>
          <div className="absolute h-2 w-2 rounded-full bg-blue-500/50 top-[15%] left-[25%] animate-pulse" style={{ animationDuration: '3s' }}></div>
          <div className="absolute h-1 w-1 rounded-full bg-purple-500/50 top-[60%] left-[75%] animate-pulse" style={{ animationDuration: '2.5s' }}></div>
          <div className="absolute h-1.5 w-1.5 rounded-full bg-emerald-500/50 top-[80%] left-[20%] animate-pulse" style={{ animationDuration: '4s' }}></div>
        </div>
        
        {/* Header */}
        <div className="font-mono text-sm text-slate-400 mb-4 flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <Activity className="mr-2 h-4 w-4 text-blue-400 animate-pulse" style={{ animationDuration: '3s' }} />
            <span>// repository health</span>
          </div>
          <button
            onClick={fetchHealthData}
            disabled={healthData.loading}
            className="p-1 hover:bg-slate-800 rounded transition-colors duration-200 disabled:opacity-50"
            title="Refresh health data"
          >
            <RefreshCw className={`h-3 w-3 text-slate-500 hover:text-blue-400 transition-colors ${healthData.loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Error Message */}
        {healthData.error && (
          <div className="mb-4 p-2 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400 font-mono relative z-10">
            API limit reached. Showing cached data.
          </div>
        )}

        {/* Health Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 relative z-10">
          {healthMetrics.map((metric, index) => (
            <HealthCard key={metric.title} metric={metric} index={index} loading={healthData.loading} />
          ))}
        </div>

        {/* Latest Release */}
        {healthData.latestRelease && (
          <div className="relative z-10">
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center mb-2">
                <Tag className="h-3 w-3 text-emerald-400 mr-2" />
                <span className="font-mono text-xs font-bold text-emerald-400">Latest Release</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-sm text-white">{healthData.latestRelease.name}</div>
                  <div className="font-mono text-xs text-slate-400">
                    {new Date(healthData.latestRelease.publishedAt).toLocaleDateString()}
                  </div>
                </div>
                <a
                  href={healthData.latestRelease.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 bg-emerald-600/20 border border-emerald-500/30 rounded text-emerald-400 hover:text-emerald-300 font-mono text-xs transition-colors duration-200"
                >
                  View →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Health Card Component
const HealthCard = ({ metric, index, loading }) => {
  const colorClasses = {
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' }
  };

  const colors = colorClasses[metric.color] || colorClasses.blue;
  const Icon = metric.icon;

  return (
    <div 
      className={`p-3 rounded-lg border ${colors.border} ${colors.bg} transition-all duration-300 hover:scale-105 animate-fade-up animate-once`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center mb-3">
        <div className={`p-1.5 rounded-md ${colors.bg} border ${colors.border}`}>
          <Icon className={`w-3 h-3 ${colors.text}`} />
        </div>
        <h3 className={`font-mono text-xs font-bold ${colors.text} ml-2`}>
          {metric.title}
        </h3>
      </div>
      
      <div className="space-y-2">
        {metric.data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400">{item.label}:</span>
            <span className={`font-mono text-xs font-bold ${loading ? 'text-slate-500' : item.color}`}>
              {loading ? '...' : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepositoryHealth; 