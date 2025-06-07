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
  '/algorithms/radix',
  '/algorithms/heap',
  '/contributions'
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

  // Get current date for freshness signals
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();
  const httpDate = currentDate.toUTCString();

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
      
      // Format algorithm name for display if it's an algorithm page
      const displayName = isAlgorithmPage 
        ? algorithmName.charAt(0).toUpperCase() + algorithmName.slice(1) + ' Sort'
        : '';
      
      // Generate SEO-optimized HTML
      let html = transformedTemplate;
      
      // Generate canonical URL for this route
      const canonicalUrl = `https://sortvision.vercel.app${route}`;
      
      if (isAlgorithmPage) {
        // Update title and meta tags
        html = html.replace(
          /<title>SortVision \| Interactive Sorting Algorithm Visualizer & DSA Learning Tool<\/title>/g,
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
      
      // Add or update canonical URL
      if (!html.includes('<link rel="canonical"')) {
        html = html.replace(
          '</head>',
          `  <link rel="canonical" href="${canonicalUrl}">\n</head>`
        );
      } else {
        html = html.replace(
          /<link rel="canonical" href="[^"]*">/g,
          `<link rel="canonical" href="${canonicalUrl}">`
        );
      }
      
      // Update Open Graph and Twitter URLs for algorithm pages
      if (isAlgorithmPage) {
        html = html.replace(
          /<meta property="og:url" content="[^"]*">/g,
          `<meta property="og:url" content="${canonicalUrl}">`
        );
        
        html = html.replace(
          /<meta name="twitter:url" content="[^"]*">/g,
          `<meta name="twitter:url" content="${canonicalUrl}">`
        );
        
        html = html.replace(
          /<meta property="og:title" content="[^"]*">/g,
          `<meta property="og:title" content="${displayName} Visualizer | SortVision - Learn How ${displayName} Works">`
        );
        
        html = html.replace(
          /<meta name="twitter:title" content="[^"]*">/g,
          `<meta name="twitter:title" content="${displayName} Visualizer | SortVision - Learn How ${displayName} Works">`
        );
        
        html = html.replace(
          /<meta property="og:description" content="[^"]*">/g,
          `<meta property="og:description" content="Interactive visualization of ${displayName}. Learn how ${displayName} works, see its performance metrics, and understand its time complexity through visual animation.">`
        );
        
        html = html.replace(
          /<meta name="twitter:description" content="[^"]*">/g,
          `<meta name="twitter:description" content="Interactive visualization of ${displayName}. Learn how ${displayName} works and understand its complexity.">`
        );
      }
      
      // Add Last-Modified meta tag
      if (!html.includes('<meta http-equiv="Last-Modified"')) {
        html = html.replace(
          '</head>',
          `  <meta http-equiv="Last-Modified" content="${httpDate}" />\n</head>`
        );
      }
      
      // Add article:modified_time and og:updated_time if not already present
      if (!html.includes('article:modified_time')) {
        html = html.replace(
          '</head>',
          `  <meta property="article:modified_time" content="${isoDate.split('T')[0]}" />\n</head>`
        );
      }
      
      if (!html.includes('og:updated_time')) {
        html = html.replace(
          '</head>',
          `  <meta property="og:updated_time" content="${isoDate.split('T')[0]}" />\n</head>`
        );
      }
      
      // Write the rendered HTML to file
      const outputPath = path.join(outputDir, 'index.html');
      fs.writeFileSync(outputPath, html);
      console.log(`Prerendered: ${route} -> ${outputPath}`);
      
      // Create .htaccess file for Apache servers
      const htaccessContent = `
# Set Cache-Control headers
<IfModule mod_headers.c>
  # Set Last-Modified header
  Header set Last-Modified "${httpDate}"
  
  # Set Cache-Control for HTML files
  <FilesMatch "\\.html$">
    Header set Cache-Control "max-age=0, must-revalidate"
  </FilesMatch>
</IfModule>
`;
      fs.writeFileSync(path.join(distPath, '.htaccess'), htaccessContent);
      
      // Create _headers file for Netlify/Vercel
      const headersContent = `/*
  Last-Modified: ${httpDate}
  Cache-Control: max-age=0, must-revalidate
`;
      fs.writeFileSync(path.join(distPath, '_headers'), headersContent);
      
    } catch (error) {
      console.error(`Error prerendering ${route}:`, error);
    }
  }

  console.log('Prerendering complete!');
  process.exit(0);
}

prerender(); 