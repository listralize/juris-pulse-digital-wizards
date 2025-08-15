#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Starting simple production build...');

try {
  // Clean dist folder
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
    console.log('✅ Cleaned dist folder');
  }

  // Run build
  console.log('📦 Building project...');
  execSync('npm run build -- --mode production', { stdio: 'inherit' });
  
  // Copy .htaccess
  const htaccessSource = path.join(process.cwd(), 'public', '.htaccess');
  const htaccessDest = path.join(process.cwd(), 'dist', '.htaccess');
  
  if (fs.existsSync(htaccessSource)) {
    fs.copyFileSync(htaccessSource, htaccessDest);
    console.log('✅ .htaccess copied to dist');
  }

  console.log('✅ Build completed successfully!');
  console.log('📁 Files ready for upload to Hostinger in dist/ folder');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}