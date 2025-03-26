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
import { algorithms } from '../src/utils/seo.js';

// Get current directory 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define current date for lastmod
const currentDate = new Date().toISOString().split('T')[0];

// Base URL
const BASE_URL = 'https://sortvision.vercel.app';

// Generate sitemap content
function generateSitemap() {
  // Start sitemap XML
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${BASE_URL}/og-image.png</image:loc>
      <image:title>SortVision - Sorting Algorithm Visualizer</image:title>
      <image:caption>Interactive visualization of sorting algorithms</image:caption>
    </image:image>
  </url>
  
  <!-- Algorithm Pages -->`;

  // Add algorithm pages
  for (const [key, algorithm] of Object.entries(algorithms)) {
    sitemap += `
  <url>
    <loc>${BASE_URL}/algorithms/${key}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${BASE_URL}/og-image.png</image:loc>
      <image:title>${algorithm.name} Visualization - SortVision</image:title>
      <image:caption>Interactive visualization of ${algorithm.name} algorithm</image:caption>
    </image:image>
  </url>`;
  }

  // Close sitemap
  sitemap += `
</urlset>`;

  return sitemap;
}

// Write sitemap to file
function writeSitemap() {
  const sitemap = generateSitemap();
  const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
  
  fs.writeFileSync(outputPath, sitemap);
  console.log(`Sitemap generated at ${outputPath}`);
}

// Execute sitemap generation
writeSitemap(); 