/**
 * Sitemap Generator for SortVision
 * 
 * This script generates a sitemap.xml file based on the available
 * algorithm pages. Run this script to update the sitemap whenever
 * new algorithms are added or existing ones are modified.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Algorithm information
const algorithms = [
  'bubble',
  'insertion',
  'selection',
  'merge',
  'quick',
  'heap',
  'radix',
  'bucket'
];

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  console.log('Current date components:', { year, month, day });
  
  return `${year}-${month}-${day}`;
};

// Generate sitemap XML content
const generateSitemap = () => {
  const currentDate = getCurrentDate();
  console.log('Generated date for sitemap:', currentDate);
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <!-- Homepage -->
  <url>
    <loc>https://sortvision.vercel.app/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://sortvision.vercel.app/og-image.png</image:loc>
      <image:title>SortVision - Sorting Algorithm Visualizer</image:title>
      <image:caption>Interactive visualization of sorting algorithms</image:caption>
    </image:image>
  </url>
  
  <!-- Algorithm Pages -->`;

  // Add entries for each algorithm
  algorithms.forEach(algorithm => {
    const capitalizedAlgorithm = algorithm.charAt(0).toUpperCase() + algorithm.slice(1);
    sitemap += `
  <url>
    <loc>https://sortvision.vercel.app/algorithms/${algorithm}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>https://sortvision.vercel.app/og-image.png</image:loc>
      <image:title>${capitalizedAlgorithm} Sort Visualization - SortVision</image:title>
      <image:caption>Interactive visualization of ${capitalizedAlgorithm} Sort algorithm</image:caption>
    </image:image>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

// Write sitemap to file
const writeSitemap = () => {
  const sitemap = generateSitemap();
  const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
  
  fs.writeFileSync(outputPath, sitemap);
  console.log(`Sitemap generated successfully at ${outputPath}`);
};

writeSitemap(); 