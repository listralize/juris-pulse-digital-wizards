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
    console.log('📦 Arquivos JS:', jsFiles);
    
    // Verificar se index.html referencia os arquivos corretos
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf8');
      const missingRefs = jsFiles.filter(file => !indexContent.includes(path.basename(file)));
      if (missingRefs.length > 0) {
        console.warn('⚠️ Possíveis referências perdidas:', missingRefs);
        
        // Try to fix missing references by updating paths
        let updatedContent = indexContent;
        for (const missingFile of missingRefs) {
          const fileName = path.basename(missingFile);
          const relativePath = `./${missingFile}`;
          // Look for old reference patterns and replace
          updatedContent = updatedContent.replace(
            new RegExp(`assets/js/[^"']*\\.js`, 'g'),
            relativePath
          );
        }
        
        if (updatedContent !== indexContent) {
          fs.writeFileSync(indexPath, updatedContent);
          console.log('🔧 Referências corrigidas no index.html');
        }
      } else {
        console.log('✅ Todas as referências JS estão corretas');
      }
    }
    
    // Verificar se existe robots.txt
    const robotsPath = path.join(distPath, 'robots.txt');
    if (!fs.existsSync(robotsPath)) {
      const robotsContent = `User-agent: *
Allow: /
Sitemap: https://your-domain.com/sitemap.xml`;
      fs.writeFileSync(robotsPath, robotsContent);
      console.log('✅ robots.txt criado');
    }
  }

  console.log('✅ Build completed successfully!');
  console.log('📁 Files ready for upload to Hostinger in dist/ folder');
  console.log('🚀 Build otimizado para Hostinger com scripts de marketing integrados');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}