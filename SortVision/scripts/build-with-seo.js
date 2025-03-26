/**
 * SEO-Enhanced Build Script for SortVision
 * 
 * This script runs before the main build to ensure that all SEO
 * assets are generated correctly, including sitemap and meta tags.
 */
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert exec to promise-based
const execAsync = promisify(exec);

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log with timestamp
const log = (message) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${message}`);
};

// Run sitemap generator
async function generateSitemap() {
  log('Generating sitemap.xml...');
  try {
    const sitemapScript = path.resolve(__dirname, './generate-sitemap.js');
    await execAsync(`node ${sitemapScript}`);
    log('Sitemap generated successfully.');
    return true;
  } catch (error) {
    log(`Error generating sitemap: ${error.message}`);
    return false;
  }
}

// Run the main build process
async function runBuild() {
  log('Running main build process...');
  try {
    await execAsync('vite build');
    log('Build completed successfully.');
    return true;
  } catch (error) {
    log(`Error during build: ${error.message}`);
    return false;
  }
}

// Run prerender for SEO
async function runPrerender() {
  log('Running prerender for SEO...');
  try {
    await execAsync('node prerender.js');
    log('Prerender completed successfully.');
    return true;
  } catch (error) {
    log(`Error during prerender: ${error.message}`);
    return false;
  }
}

// Main function to run all build steps
async function buildWithSEO() {
  log('Starting SEO-enhanced build process...');
  
  // Generate sitemap first
  const sitemapSuccess = await generateSitemap();
  
  // Run build process
  const buildSuccess = await runBuild();
  
  // Run prerender if build was successful
  let prerenderSuccess = false;
  if (buildSuccess) {
    prerenderSuccess = await runPrerender();
  }
  
  // Log final status
  if (sitemapSuccess && buildSuccess && prerenderSuccess) {
    log('✅ SEO-enhanced build completed successfully!');
    process.exit(0);
  } else {
    log('❌ SEO-enhanced build completed with errors.');
    process.exit(1);
  }
}

// Execute build process
buildWithSEO(); 