import React from 'react';

/**
 * SEO Content Component
 * 
 * Provides additional semantic content for search engines while remaining
 * invisible to users. This helps improve search rankings for relevant keywords.
 */
const SEOContent = ({ algorithm = null }) => {
  const generalContent = (
    <div className="sr-only" aria-hidden="true">
      {/* Main SEO Content */}
      <h1>SortVision: The Ultimate Sorting Algorithm Visualizer for DSA Learning</h1>
      <p>
        SortVision is an interactive sorting algorithm visualizer designed for computer science students, 
        software developers, and anyone learning data structures and algorithms (DSA). Our platform provides 
        comprehensive algorithm visualization tools that make complex sorting concepts easy to understand.
      </p>
      
      <h2>Learn Sorting Algorithms with Interactive Visualization</h2>
      <p>
        Master fundamental sorting algorithms including Bubble Sort, Insertion Sort, Selection Sort, 
        Merge Sort, Quick Sort, Heap Sort, and Radix Sort. Each algorithm comes with step-by-step 
        animations, performance metrics, and detailed complexity analysis.
      </p>
      
      <h3>Features for Algorithm Learning:</h3>
      <ul>
        <li>Real-time sorting algorithm animation and visualization</li>
        <li>Performance metrics tracking (comparisons, swaps, time complexity)</li>
        <li>Algorithm comparison tools for educational analysis</li>
        <li>Interactive controls for speed and array size adjustment</li>
        <li>Educational content explaining algorithm complexity</li>
        <li>Perfect for coding interview preparation and DSA practice</li>
      </ul>
      
      <h3>Supported Sorting Algorithms:</h3>
      <ul>
        <li>Bubble Sort - Simple comparison-based sorting algorithm</li>
        <li>Insertion Sort - Efficient for small datasets and nearly sorted arrays</li>
        <li>Selection Sort - In-place comparison sorting algorithm</li>
        <li>Merge Sort - Efficient divide-and-conquer stable sorting algorithm</li>
        <li>Quick Sort - Fast average-case partitioning-based sorting algorithm</li>
        <li>Heap Sort - Binary heap-based comparison sorting algorithm</li>
        <li>Radix Sort - Non-comparative integer sorting algorithm</li>
      </ul>
      
      <h3>Educational Benefits:</h3>
      <ul>
        <li>Visual learning enhances understanding of algorithm concepts</li>
        <li>Interactive exploration of algorithm behavior and performance</li>
        <li>Comparative analysis tools for different sorting techniques</li>
        <li>Step-by-step algorithm execution for detailed learning</li>
        <li>Performance metrics help understand time and space complexity</li>
      </ul>
      
      <p>
        Whether you're preparing for coding interviews, studying computer science, or exploring 
        algorithmic concepts, SortVision provides the tools you need to master sorting algorithms 
        through interactive visualization and hands-on learning.
      </p>
    </div>
  );

  const algorithmSpecificContent = algorithm ? (
    <div className="sr-only" aria-hidden="true">
      <h2>{algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort Algorithm Visualization</h2>
      <p>
        Learn {algorithm} sort algorithm through interactive visualization. Understand how {algorithm} sort 
        works with step-by-step animation, performance tracking, and educational content designed for 
        data structures and algorithms learning.
      </p>
      
      <h3>{algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort Features:</h3>
      <ul>
        <li>Interactive {algorithm} sort visualization with real-time animation</li>
        <li>Performance metrics for {algorithm} sort algorithm analysis</li>
        <li>Step-by-step {algorithm} sort execution breakdown</li>
        <li>Educational content explaining {algorithm} sort complexity and behavior</li>
        <li>Comparison tools to analyze {algorithm} sort performance</li>
      </ul>
      
      <p>
        Master {algorithm} sort algorithm concepts through our interactive DSA learning platform. 
        Perfect for computer science education, coding interview preparation, and algorithm practice.
      </p>
    </div>
  ) : null;

  return (
    <>
      {generalContent}
      {algorithmSpecificContent}
    </>
  );
};

export default SEOContent; 