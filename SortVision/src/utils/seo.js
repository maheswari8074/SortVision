/**
 * SEO Utilities for SortVision
 * 
 * This file contains utility functions for Search Engine Optimization,
 * including dynamic generation of metadata and sitemaps.
 */

// Sorting algorithm information for SEO
export const algorithms = {
  bubble: {
    name: 'Bubble Sort',
    description: 'A simple comparison sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
    complexity: 'O(n²)',
    keywords: 'bubble sort, comparison sort, swapping algorithm, in-place sorting algorithm',
    seo_title: 'Bubble Sort Visualizer | Interactive Algorithm Visualization Tool',
    seo_description: 'Learn Bubble Sort algorithm with interactive visualizations. See how the algorithm works step-by-step with real-time animation and performance metrics.',
  },
  insertion: {
    name: 'Insertion Sort',
    description: 'A simple sorting algorithm that builds the final sorted array one item at a time, by repeatedly taking the next unsorted item and inserting it into its correct position in the already sorted part.',
    complexity: 'O(n²)',
    keywords: 'insertion sort, efficient for small data sets, online algorithm, in-place sorting algorithm',
    seo_title: 'Insertion Sort Visualizer | Interactive Algorithm Learning',
    seo_description: 'Understand Insertion Sort algorithm with our interactive visualizer. Track its efficiency and see how it sorts elements step by step.',
  },
  selection: {
    name: 'Selection Sort',
    description: 'A sorting algorithm that repeatedly finds the minimum element from the unsorted part and puts it at the beginning of the unsorted part.',
    complexity: 'O(n²)',
    keywords: 'selection sort, in-place comparison sort, simple sorting algorithm',
    seo_title: 'Selection Sort Visualizer | Visual Algorithm Learning',
    seo_description: 'Explore Selection Sort algorithm visually. Learn how it works by finding the minimum element in each pass and building a sorted array.',
  },
  merge: {
    name: 'Merge Sort',
    description: 'An efficient, stable, divide-and-conquer sorting algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.',
    complexity: 'O(n log n)',
    keywords: 'merge sort, divide and conquer, efficient sorting, stable sort',
    seo_title: 'Merge Sort Visualizer | Efficient Divide-and-Conquer Algorithm',
    seo_description: 'See Merge Sort in action with our interactive visualizer. Learn this efficient algorithm with step-by-step animation and performance tracking.',
  },
  quick: {
    name: 'Quick Sort',
    description: 'An efficient, in-place sorting algorithm that uses the divide-and-conquer strategy with a pivot element to partition the array.',
    complexity: 'O(n log n) average, O(n²) worst case',
    keywords: 'quick sort, pivot, partitioning, divide and conquer, efficient sorting',
    seo_title: 'Quick Sort Visualizer | Fast Partitioning-Based Algorithm',
    seo_description: 'Visualize Quick Sort algorithm in real-time. Learn how it uses pivot elements and partitioning to efficiently sort data structures.',
  },
  heap: {
    name: 'Heap Sort',
    description: 'A comparison-based sorting algorithm that uses a binary heap data structure to build a heap and then repeatedly extracts the maximum element.',
    complexity: 'O(n log n)',
    keywords: 'heap sort, binary heap, efficient sorting, in-place algorithm',
    seo_title: 'Heap Sort Visualizer | Binary Heap-Based Algorithm',
    seo_description: 'Explore Heap Sort with our interactive visualizer. Learn how this binary heap-based algorithm efficiently sorts data with O(n log n) complexity.',
  },
  radix: {
    name: 'Radix Sort',
    description: 'A non-comparative integer sorting algorithm that sorts data by processing individual digits, starting from the least significant digit to the most significant.',
    complexity: 'O(nk) where k is the number of digits',
    keywords: 'radix sort, digit-by-digit sort, non-comparative sort, linear time',
    seo_title: 'Radix Sort Visualizer | Non-Comparative Sorting Algorithm',
    seo_description: 'Visualize Radix Sort, a unique non-comparative sorting algorithm. Learn how it processes data digit by digit for efficient sorting.',
  }
};

/**
 * Generate meta tags for a specific algorithm page
 * @param {string} algorithmName - The algorithm identifier
 * @returns {Object} - Object containing meta tags for SEO
 */
export const getAlgorithmMetaTags = (algorithmName) => {
  const algorithm = algorithms[algorithmName] || {
    name: 'Sorting Algorithm',
    description: 'Interactive visualization of sorting algorithms',
    complexity: 'Varies',
    keywords: 'sorting algorithms, algorithm visualization',
    seo_title: 'Sorting Algorithm Visualizer',
    seo_description: 'Interactive visualization of sorting algorithms with real-time performance metrics'
  };
  
  return {
    title: algorithm.seo_title,
    description: algorithm.seo_description,
    keywords: `${algorithm.keywords}, algorithm visualizer, sorting algorithm visualization, interactive learning`,
    ogTitle: algorithm.seo_title,
    ogDescription: algorithm.seo_description,
    twitterTitle: algorithm.seo_title,
    twitterDescription: algorithm.seo_description
  };
};

/**
 * Generate schema markup for algorithm pages
 * @param {string} algorithmName - The algorithm identifier
 * @param {string} path - Current URL path
 * @returns {Object} - Schema.org JSON-LD markup
 */
export const getAlgorithmSchema = (algorithmName, path) => {
  const algorithm = algorithms[algorithmName];
  if (!algorithm) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': `${algorithm.name} Algorithm Visualization and Tutorial`,
    'description': algorithm.seo_description,
    'keywords': algorithm.keywords,
    'author': {
      '@type': 'Person',
      'name': 'alienX'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'SortVision',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://sortvision.vercel.app/favicon.svg'
      }
    },
    'datePublished': '2024-03-26',
    'dateModified': '2024-03-26',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://sortvision.vercel.app${path}`
    },
    'about': {
      '@type': 'Thing',
      'name': algorithm.name,
      'description': algorithm.description
    },
    'educationalUse': 'Interactive Visualization',
    'timeRequired': 'PT10M'
  };
};

/**
 * Generate SEO-friendly URLs for all supported algorithms
 * @returns {Array} - Array of URL objects for sitemap
 */
export const getAllAlgorithmUrls = () => {
  return Object.keys(algorithms).map(key => ({
    url: `/algorithms/${key}`,
    title: algorithms[key].name,
    description: algorithms[key].seo_description,
    lastModified: new Date().toISOString().split('T')[0]
  }));
};

/**
 * Format SEO title based on page type
 * @param {string} algorithm - Optional algorithm name
 * @returns {string} - Formatted page title
 */
export const formatPageTitle = (algorithm = null) => {
  if (algorithm && algorithms[algorithm]) {
    return `${algorithms[algorithm].name} Visualizer | SortVision - Learn How ${algorithms[algorithm].name} Works`;
  }
  return 'SortVision | Interactive Sorting Algorithm Visualizer & Learning Tool';
}; 