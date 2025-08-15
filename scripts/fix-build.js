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
    const walkDir = (dir, callback) => {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          walkDir(filePath, callback);
        } else {
          callback(filePath);
        }
      });
    };
    
    let jsFiles = [];
    let cssFiles = [];
    
    walkDir(assetsPath, (filePath) => {
      if (filePath.endsWith('.js')) jsFiles.push(filePath);
      if (filePath.endsWith('.css')) cssFiles.push(filePath);
    });
    
    console.log(`✅ Found ${jsFiles.length} JavaScript files in assets`);
    console.log(`✅ Found ${cssFiles.length} CSS files in assets`);
    
    if (jsFiles.length === 0) {
      console.log('❌ No JavaScript files found in assets folder!');
      process.exit(1);
    }
    
    // Check index.html references
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf8');
      const hasJSReferences = jsFiles.some(jsFile => {
        const relativePath = path.relative(distPath, jsFile).replace(/\\/g, '/');
        return indexContent.includes(relativePath);
      });
      
      if (hasJSReferences) {
        console.log('✅ Index.html correctly references JavaScript files');
      } else {
        console.log('⚠️ Index.html may not reference JavaScript files correctly');
      }
    }
  }
  
  console.log('✅ Build verification complete');
} else {
  console.log('❌ Dist folder not found. Run build first.');
  process.exit(1);
}