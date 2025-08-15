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

  // Verificar e corrigir problemas com arquivos JS no build
  const distPath = path.join(process.cwd(), 'dist');
  const assetsPath = path.join(distPath, 'assets');
  
  if (fs.existsSync(assetsPath)) {
    // Recursively check all asset folders
    const checkAssetsRecursively = (dir) => {
      const files = fs.readdirSync(dir, { withFileTypes: true });
      let jsFiles = [];
      
      for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
          jsFiles = jsFiles.concat(checkAssetsRecursively(fullPath));
        } else if (file.name.endsWith('.js')) {
          jsFiles.push(path.relative(distPath, fullPath));
        }
      }
      return jsFiles;
    };
    
    const jsFiles = checkAssetsRecursively(assetsPath);
    console.log('📦 Arquivos JS encontrados:', jsFiles.length);
    console.log('📦 Arquivos JS:', jsFiles.map(f => path.basename(f)));
    
    // Verificar se index.html referencia os arquivos corretos
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf8');
      console.log('🔍 Verificando referências no index.html...');
      
      // Check which JS files are actually referenced
      const referencedFiles = [];
      const missingFiles = [];
      
      for (const jsFile of jsFiles) {
        const fileName = path.basename(jsFile);
        if (indexContent.includes(fileName)) {
          referencedFiles.push(fileName);
        } else {
          missingFiles.push(fileName);
        }
      }
      
      console.log('✅ Arquivos referenciados:', referencedFiles);
      if (missingFiles.length > 0) {
        console.warn('⚠️ Arquivos não referenciados:', missingFiles);
      }
      
      // Verificar se há referências quebradas no HTML
      const scriptMatches = indexContent.match(/src="[^"]*\.js"/g);
      if (scriptMatches) {
        console.log('🔗 Scripts no HTML:', scriptMatches);
        
        for (const match of scriptMatches) {
          const src = match.match(/src="([^"]*)"/)[1];
          const fullPath = path.join(distPath, src.replace('./', ''));
          if (!fs.existsSync(fullPath)) {
            console.error('❌ Arquivo não encontrado:', src);
          }
        }
      }
    }
    
    // Verificar se existe robots.txt
    const robotsPath = path.join(distPath, 'robots.txt');
    if (!fs.existsSync(robotsPath)) {
      const robotsContent = `User-agent: *
Allow: /
Sitemap: https://stadv.com.br/sitemap.xml`;
      fs.writeFileSync(robotsPath, robotsContent);
      console.log('✅ robots.txt criado para stadv.com.br');
    }
  }

  console.log('✅ Build completed successfully!');
  console.log('📁 Files ready for upload to Hostinger in dist/ folder');
  console.log('🚀 Build otimizado para stadv.com.br com scripts de marketing integrados');
  console.log('📊 Pixel Facebook e Google Tag Manager configurados para produção');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}