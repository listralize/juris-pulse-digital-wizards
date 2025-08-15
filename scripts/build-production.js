const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('🚀 Iniciando build de produção...');

// Step 1: Copy assets
console.log('📁 Copiando assets...');
const sourceDir = path.join(__dirname, '../public/lovable-uploads');
const targetDir = path.join(__dirname, '../public/assets');

// Create assets directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy all files from lovable-uploads to assets
if (fs.existsSync(sourceDir)) {
  const files = fs.readdirSync(sourceDir);
  
  files.forEach(file => {
    const sourceFile = path.join(sourceDir, file);
    const targetFile = path.join(targetDir, file);
    
    try {
      fs.copyFileSync(sourceFile, targetFile);
      console.log(`✅ Copiado: ${file}`);
    } catch (error) {
      console.error(`❌ Erro ao copiar ${file}:`, error.message);
    }
  });
}

// Step 2: Clean references
console.log('🧹 Limpando referências...');
exec('node scripts/clean-production.js', (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Erro na limpeza:', error);
    return;
  }
  console.log(stdout);
  
  // Step 3: Build
  console.log('🔨 Construindo projeto...');
  exec('npm run build', (buildError, buildStdout, buildStderr) => {
    if (buildError) {
      console.error('❌ Erro no build:', buildError);
      return;
    }
    console.log(buildStdout);
    
    // Step 4: Final cleanup of dist folder
    console.log('✨ Limpeza final...');
    const distPath = path.join(__dirname, '../dist');
    if (fs.existsSync(distPath)) {
      // Remove any remaining Lovable references from built files
      const cleanDistFiles = (dir) => {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);
          
          if (stat.isDirectory()) {
            cleanDistFiles(filePath);
          } else if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')) {
            try {
              let content = fs.readFileSync(filePath, 'utf8');
              const originalContent = content;
              
              // Replace any remaining lovable-uploads references
              content = content.replace(/lovable-uploads/g, 'assets');
              
              // Remove any lovable tagger references
              content = content.replace(/lovable-tagger/g, '');
              content = content.replace(/componentTagger/g, '');
              
              if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`🧹 Limpeza final: ${file}`);
              }
            } catch (error) {
              console.error(`❌ Erro na limpeza final de ${file}:`, error.message);
            }
          }
        });
      };
      
      cleanDistFiles(distPath);
    }
    
    console.log('🎉 Build de produção concluído com sucesso!');
    console.log('📁 Arquivos prontos na pasta /dist');
    console.log('🛡️ Proteções contra F12 ativadas');
    console.log('🔒 Referências ao Lovable removidas');
    console.log('🏷️ Assets organizados em /assets');
  });
});