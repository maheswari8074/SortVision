/**
 * Build script with SEO optimization
 * Generates sitemap, builds the project, and prerenders pages
 */

import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'node:process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const execFileAsync = promisify(execFile);

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
    await execFileAsync('node', [sitemapScript]);
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
    await execFileAsync('vite', ['build']);
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
    const prerenderScript = path.resolve(__dirname, '../prerender.js');
    await execFileAsync('node', [prerenderScript]);
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