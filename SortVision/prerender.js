// Prerendering script to generate static HTML files from the SPA
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import compression from 'compression';
import { createServer as createViteServer } from 'vite';
import process from 'node:process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROUTES = [
  '/',
  '/algorithms/bubble',
  '/algorithms/insertion',
  '/algorithms/selection',
  '/algorithms/merge',
  '/algorithms/quick',
  '/algorithms/heap',
  '/algorithms/radix',
  '/algorithms/shell',
  '/algorithms/cocktail'
];

async function prerender() {
  // Create Vite server in SSR mode
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  app.use(compression());
  app.use(vite.middlewares);

  const distPath = path.join(__dirname, 'dist');
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }

  // Process each route
  console.log('Starting prerendering...');
  
  for (const route of ROUTES) {
    const outputDir = path.join(distPath, route === '/' ? '' : route);
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    try {
      // Load the HTML template
      const template = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
      
      // Transform HTML with Vite
      const transformedTemplate = await vite.transformIndexHtml(route, template);
      
      // Generate the specific meta tags for this route
      const algorithmName = route.split('/').pop();
      const isAlgorithmPage = route !== '/';
      
      // Generate SEO-optimized HTML
      let html = transformedTemplate;
      
      if (isAlgorithmPage) {
        // Format algorithm name for display
        const displayName = algorithmName.charAt(0).toUpperCase() + algorithmName.slice(1) + ' Sort';
        
        // Update title and meta tags
        html = html.replace(
          /<title>SortVision \| Interactive Sorting Algorithm Visualizer &amp; Learning Tool<\/title>/g,
          `<title>${displayName} Visualizer | SortVision - Learn How ${displayName} Works</title>`
        );
        
        html = html.replace(
          /<meta name="description" content="[^"]*"/g,
          `<meta name="description" content="Interactive visualization of ${displayName}. Learn how ${displayName} works, see its performance metrics, and understand its time complexity through visual animation."`
        );
        
        html = html.replace(
          /<meta name="keywords" content="[^"]*"/g,
          `<meta name="keywords" content="sorting visualizer, algorithm visualizer, ${algorithmName} sort, sorting algorithms, interactive ${algorithmName} sort, learn sorting algorithms, algorithm comparison, sorting algorithm complexity, programming education"`
        );
      }
      
      // Write the rendered HTML to file
      const outputPath = path.join(outputDir, 'index.html');
      fs.writeFileSync(outputPath, html);
      console.log(`Prerendered: ${route} -> ${outputPath}`);
    } catch (error) {
      console.error(`Error prerendering ${route}:`, error);
    }
  }

  console.log('Prerendering complete!');
  process.exit(0);
}

prerender(); 