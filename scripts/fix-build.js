#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing build configuration...');

// Fix dist folder structure and MIME types
const distPath = path.join(process.cwd(), 'dist');

if (fs.existsSync(distPath)) {
  // Copy .htaccess to dist if it exists
  const htaccessSource = path.join(process.cwd(), 'public', '.htaccess');
  const htaccessDest = path.join(distPath, '.htaccess');
  
  if (fs.existsSync(htaccessSource)) {
    fs.copyFileSync(htaccessSource, htaccessDest);
    console.log('✅ .htaccess copied to dist folder');
  }
  
  // Check if assets folder exists and has JS files
  const assetsPath = path.join(distPath, 'assets');
  if (fs.existsSync(assetsPath)) {
    const files = fs.readdirSync(assetsPath);
    const jsFiles = files.filter(file => file.endsWith('.js'));
    console.log(`✅ Found ${jsFiles.length} JavaScript files in assets`);
    
    if (jsFiles.length === 0) {
      console.log('❌ No JavaScript files found in assets folder!');
      process.exit(1);
    }
  }
  
  console.log('✅ Build verification complete');
} else {
  console.log('❌ Dist folder not found. Run build first.');
  process.exit(1);
}