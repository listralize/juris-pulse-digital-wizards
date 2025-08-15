#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🔧 Verificando e corrigindo build...');

// Verificar se dist existe
const distPath = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ Pasta dist não encontrada!');
  process.exit(1);
}

// Copiar .htaccess se não existir
const htaccessSource = path.join(process.cwd(), 'public', '.htaccess');
const htaccessDest = path.join(distPath, '.htaccess');

if (fs.existsSync(htaccessSource) && !fs.existsSync(htaccessDest)) {
  fs.copyFileSync(htaccessSource, htaccessDest);
  console.log('✅ .htaccess copiado para dist');
}

// Função para andar recursivamente pelos diretórios
function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkDir(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// Verificar assets
const assetsPath = path.join(distPath, 'assets');
if (fs.existsSync(assetsPath)) {
  const allFiles = walkDir(assetsPath);
  const jsFiles = allFiles.filter(file => file.endsWith('.js'));
  const cssFiles = allFiles.filter(file => file.endsWith('.css'));
  
  console.log('📦 Assets encontrados:');
  console.log(`  - ${jsFiles.length} arquivos JS`);
  console.log(`  - ${cssFiles.length} arquivos CSS`);
  
  if (jsFiles.length === 0) {
    console.error('❌ Nenhum arquivo JS encontrado em assets!');
    process.exit(1);
  }
  
  // Verificar index.html
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Verificar se todos os JS estão referenciados
    const jsFilenames = jsFiles.map(file => path.basename(file));
    const referencedJs = jsFilenames.filter(filename => indexContent.includes(filename));
    
    console.log(`📄 index.html referencia ${referencedJs.length}/${jsFilenames.length} arquivos JS`);
    
    if (referencedJs.length === 0) {
      console.error('❌ index.html não referencia nenhum arquivo JS!');
      process.exit(1);
    }
    
    const missingRefs = jsFilenames.filter(filename => !indexContent.includes(filename));
    if (missingRefs.length > 0) {
      console.warn('⚠️ Arquivos JS não referenciados:', missingRefs);
    }
    
  } else {
    console.error('❌ index.html não encontrado!');
    process.exit(1);
  }
} else {
  console.error('❌ Pasta assets não encontrada!');
  process.exit(1);
}

console.log('✅ Verificação do build concluída!');