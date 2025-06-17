// App.jsx
import React, {
  useState,
  useEffect,
  useMemo,
  lazy,
  Suspense,
} from 'react';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { generateCanonicalUrl, isCanonicalPath } from './utils/urlUtils';
import {
  getAlgorithmMetaTags,
  getHomepageMetaTags,
  getContributionsMetaTags,
  getSSOCMetaTags,
} from './utils/metaUtils';
import algorithms from './data/algorithms';

const Home = lazy(() => import('./pages/Home'));
const AlgorithmPage = lazy(() => import('./pages/AlgorithmPage'));
const Contributions = lazy(() => import('./pages/Contributions'));

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { algorithmName } = useParams();

  const [activeTab, setActiveTab] = useState('controls');
  const [specialMode, setSpecialMode] = useState(null);

  useEffect(() => {
    document.title = 'SortVision – Interactive Sorting Algorithm Visualizer';
  }, []);

  const pathParts = location.pathname.split('/').filter(Boolean);
  const isAlgorithmPath = pathParts[0] === 'algorithms';
  const isContributionPath = pathParts[0] === 'contributions';

  let tabFromPath = null;
  let algorithmFromPath = algorithmName;
  let contributionSection = null;

  if (isAlgorithmPath && pathParts.length >= 3) {
    tabFromPath = pathParts[1];
    algorithmFromPath = pathParts[2];
  } else if (isAlgorithmPath && pathParts.length === 2) {
    algorithmFromPath = pathParts[1];
  }

  if (isContributionPath && pathParts.length >= 2) {
    contributionSection = pathParts[1];
  }

  const currentAlgorithm = useMemo(() => algorithmFromPath || 'bubble', [algorithmFromPath]);
  const algorithmTitle = useMemo(
    () => algorithms[currentAlgorithm]?.name || 'Sorting Algorithms',
    [currentAlgorithm]
  );

  useEffect(() => {
    if (!isCanonicalPath(location.pathname)) {
      const canonicalPath = generateCanonicalUrl(location.pathname).replace('https://sortvision.vercel.app', '');
      navigate(canonicalPath, { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (isContributionPath) {
      setSpecialMode('contributors');
      if (contributionSection === 'guide') {
        setActiveTab('guide');
      } else if (contributionSection === 'overview') {
        setActiveTab('overview');
      } else if (contributionSection === 'ssoc') {
        setActiveTab('ssoc');
      } else {
        navigate('/contributions/overview', { replace: true });
      }
    } else {
      setSpecialMode(null);
      if (tabFromPath && ['config', 'metrics', 'details'].includes(tabFromPath)) {
        const tabMapping = {
          config: 'controls',
          metrics: 'metrics',
          details: 'details',
        };
        setActiveTab(tabMapping[tabFromPath]);
      } else if (isAlgorithmPath && pathParts.length === 2) {
        const algorithm = pathParts[1];
        const validAlgorithms = [
          'bubble',
          'insertion',
          'selection',
          'merge',
          'quick',
          'heap',
          'radix',
          'bucket',
        ];
        if (validAlgorithms.includes(algorithm)) {
          navigate(`/algorithms/config/${algorithm}`, { replace: true });
        }
      } else if (!isAlgorithmPath) {
        setActiveTab('controls');
      }
    }
  }, [
    location.pathname,
    tabFromPath,
    isAlgorithmPath,
    isContributionPath,
    contributionSection,
    pathParts,
    navigate,
  ]);

  const metaTags = useMemo(() => {
    if (location.pathname === '/contributions/ssoc') return getSSOCMetaTags();
    if (location.pathname === '/contributions') return getContributionsMetaTags();
    if (algorithmName) return getAlgorithmMetaTags(algorithmName);
    return getHomepageMetaTags();
  }, [algorithmName, location.pathname]);

  const schemaMarkup = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": algorithmName
        ? `${algorithmTitle} Visualizer - SortVision`
        : 'SortVision',
      "url": `https://sortvision.vercel.app${location.pathname}`,
      "applicationCategory": "EducationalApplication",
      "applicationSubCategory": "Algorithm Visualization",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": metaTags.description,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "1247",
        "bestRating": "5",
        "worstRating": "1"
      },
      "creator": {
        "@type": "Person",
        "name": "alienX",
        "url": "https://github.com/alienx5499"
      },
      "screenshot": "https://sortvision.vercel.app/og-image.png",
      "featureList": [
        "Interactive Bubble Sort Visualization",
        "Interactive Insertion Sort Visualization",
        "Interactive Selection Sort Visualization",
        "Interactive Merge Sort Visualization",
        "Interactive Quick Sort Visualization",
        "Interactive Heap Sort Visualization",
        "Interactive Radix Sort Visualization",
        "Real-time Performance Metrics",
        "Algorithm Comparison Tools",
        "Educational Content",
        "Step-by-step Animation",
        "Algorithm Complexity Analysis"
      ],
      "keywords": metaTags.keywords,
      "educationalUse": [
        "Computer Science Education",
        "Algorithm Learning",
        "Data Structures and Algorithms",
        "Programming Education",
        "Coding Interview Preparation"
      ],
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": [
          "student",
          "teacher",
          "self-learner",
          "developer"
        ]
      },
      "sameAs": [
        "https://github.com/alienx5499/SortVision",
        "https://x.com/alienx5499"
      ]
    };
  }, [algorithmName, algorithmTitle, metaTags, location.pathname]);

  return (
    <>
      <Helmet>
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
        <meta name="keywords" content={metaTags.keywords} />
        <link rel="canonical" href={generateCanonicalUrl(location.pathname)} />
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/algorithms/:algorithmName" element={<AlgorithmPage />} />
          <Route path="/contributions/*" element={<Contributions />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;


