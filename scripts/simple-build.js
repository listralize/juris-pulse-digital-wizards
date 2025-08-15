#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

  // Verificar se há problemas com arquivos JS no build
  const distPath = path.join(process.cwd(), 'dist');
  const assetsPath = path.join(distPath, 'assets');
  
  if (fs.existsSync(assetsPath)) {
    const files = fs.readdirSync(assetsPath);
    const jsFiles = files.filter(file => file.endsWith('.js'));
    console.log('📦 Arquivos JS encontrados:', jsFiles.length);
    
    // Verificar se index.html referencia os arquivos corretos
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf8');
      const missingRefs = jsFiles.filter(file => !indexContent.includes(file));
      if (missingRefs.length > 0) {
        console.warn('⚠️ Possíveis referências perdidas:', missingRefs);
      }
    }
  }

  console.log('✅ Build completed successfully!');
  console.log('📁 Files ready for upload to Hostinger in dist/ folder');
  console.log('🚀 Build otimizado para Hostinger com scripts de marketing integrados');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}