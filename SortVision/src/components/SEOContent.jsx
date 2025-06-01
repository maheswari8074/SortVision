import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * SEO Content Component
 *
 * Provides additional semantic content for search engines while remaining
 * invisible to users (via `.sr-only`). Includes keyword-rich headings,
 * meta tags, and structured data so that SortVision ranks for sorting,
 * DSA, merge sort, etc.
 */
const SEOContent = ({ algorithm = null }) => {
  // 1. Primary <h1> with the most important keywords up front:
  const mainHeading = (
    <h1>SortVision: Top Sorting Algorithm Visualizer & DSA Interactive Tool</h1>
  );

  // 2. A broad set of sorting / DSA terms to cover long-tail keywords:
  const allKeywordsContent = (
    <div className="sr-only" aria-hidden="true">
      {mainHeading}

      <p>
        SortVision is the world's leading sorting algorithm visualizer, offering in-depth
        interactive visualizations for merge sort, quick sort, heap sort, bubble sort,
        insertion sort, selection sort, radix sort, and bucket sort. Whether you're studying data structures and algorithms (DSA), preparing
        for coding interviews, or teaching computer science, SortVision provides real-time
        step-by-step animations, performance metrics, and complexity analysis for every
        major sorting technique.
      </p>

      <h2>Comprehensive DSA & Sorting Algorithm Support</h2>
      <ul>
        <li>Merge Sort algorithm visualizer: divide-and-conquer demonstration with recursive subarray merging</li>
        <li>Quick Sort algorithm visualizer: pivot selection, partitioning visualization, and recursion tracing</li>
        <li>Heap Sort visualizer: binary heap construction, heapify steps, and sorted extraction</li>
        <li>Bubble Sort visualizer: pairwise swapping, best-case vs. worst-case time complexity</li>
        <li>Insertion Sort visualizer: adaptive sorting for small arrays, step-by-step insertion</li>
        <li>Selection Sort visualizer: scanning for minimum element, in-place swapping</li>
        <li>Radix Sort visualizer: non-comparative, digit-by-digit sorting for integers</li>
        <li>Bucket Sort visualizer: dividing into buckets and applying insertion sort for individual buckets</li>
      </ul>

      <h2>Key Data Structures & DSA Concepts</h2>
      <p>
        Alongside sorting algorithms, SortVision also covers fundamental data structures:
        arrays, linked lists, stacks, queues, binary search trees (BST), heaps, graphs,
        hash tables, and complexity measures (Big O notation, time vs. space trade-offs).
        Our platform helps you master:
      </p>
      <ul>
        <li>Time complexity analysis (O(n log n), O(n²), O(n))</li>
        <li>Space complexity evaluation</li>
        <li>In-place vs. out-of-place algorithms</li>
        <li>Stability in sorting algorithms</li>
        <li>Divide and conquer, dynamic programming, and greedy strategies</li>
      </ul>

      <h2>Why SortVision Ranks #1 for Sorting & DSA Education</h2>
      <p>
        As the premier online sorting visualization tool, SortVision's unique combination
        of interactive animations, real-time performance charts, and step-by-step explanations
        makes it the go-to resource for:
      </p>
      <ul>
        <li>Computer science students learning algorithms</li>
        <li>Software engineers preparing for technical interviews (LeetCode, HackerRank)</li>
        <li>Educators seeking a teaching aid for data structures classes</li>
        <li>Self-learners exploring advanced algorithmic concepts</li>
        <li>Algorithm researchers comparing sorting methodologies</li>
      </ul>

      <h2>SortVision Features for Sorting & DSA Mastery</h2>
      <ul>
        <li>60FPS real-time sorting animations for all major sorting algorithms</li>
        <li>Customizable visualization speed and dataset size</li>
        <li>Side-by-side comparison of two sorting algorithms</li>
        <li>Interactive code walkthrough showing pseudocode alongside animations</li>
        <li>Full support for array, list, tree, and graph visualizations</li>
        <li>Complexity metrics dashboard (time, space, comparisons, swaps)</li>
        <li>Mobile-responsive design for on-the-go learning</li>
        <li>Completely free and open-source (MIT License)</li>
      </ul>

      <h2>Get Started: SortVision's Free Sorting Algorithm Visualizer</h2>
      <p>
        Whether your focus is on merge sort optimizations, quick sort partition strategies,
        or analyzing worst-case scenarios for bubble sort, SortVision provides the tools you
        need. Join thousands of learners worldwide who have improved their DSA skills with
        the most advanced sorting algorithm visualizer online.
      </p>
    </div>
  );

  // 3. Algorithm-specific content (if `algorithm` prop is provided):
  const algorithmSpecificContent = algorithm ? (
    <div className="sr-only" aria-hidden="true">
      <h2>
        {algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort Algorithm Visualizer – SortVision
      </h2>
      <p>
        Experience our interactive {algorithm} sort visualizer with step-by-step animations,
        pivot tracking, recursive calls, and complexity analysis. Perfect for mastering
        {algorithm} sort's best-, average-, and worst-case behavior. Key features include:
      </p>
      <ul>
        <li>Real-time {algorithm} sort animations at 60FPS</li>
        <li>Performance metrics: comparisons, swaps, recursion depth</li>
        <li>Custom dataset size and random seed for reproducibility</li>
        <li>Visual pivot selection and partitioning breakdown</li>
        <li>Interactive controls (pause, resume, step-through)</li>
        <li>Compare {algorithm} sort vs. merge sort or quick sort side-by-side</li>
      </ul>
      <h3>Why Use SortVision's {algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort Visualizer?</h3>
      <p>
        SortVision is the only platform providing such detailed, educational
        {algorithm} sort walkthroughs—ideal for coding interview prep, DSA coursework,
        and self-guided study.
      </p>
    </div>
  ) : null;

  return (
    <>
      {/* 4. Inject meta tags and structured data via react-helmet */}
      <Helmet>
        {/* Primary title tag showing "SortVision" + top keywords */}
        <title>
          SortVision – #1 Sorting Algorithm Visualizer | DSA, Merge Sort, Quick Sort Tool
        </title>

        <meta
          name="description"
          content="SortVision: The ultimate sorting algorithm visualizer for DSA. Interactive merge sort, quick sort, heap sort, bubble sort, complexity analysis & more. Free educational tool."
        />

        {/* Canonical (replace with your actual domain if different) */}
        <link rel="canonical" href="https://www.sortvision.io/" />

        {/* Structured data: describing SortVision as a SoftwareApplication */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "SoftwareApplication",
            name: "SortVision",
            url: "https://www.sortvision.io/",
            description:
              "SortVision is the world's leading sorting algorithm visualizer. Interactive DSA tool for merge sort, quick sort, heap sort, bubble sort, insertion sort, and more.",
            applicationCategory: "EducationalApplication",
            operatingSystem: "All",
            author: {
              "@type": "Organization",
              name: "SortVision",
              url: "https://www.sortvision.io/",
            },
            softwareVersion: "1.0.0",
            datePublished: "2023-08-15",
            license: "https://opensource.org/licenses/MIT",
          })}
        </script>
      </Helmet>

      {allKeywordsContent}
      {algorithmSpecificContent}
    </>
  );
};

export default SEOContent; 