const fs = require('fs');
const path = require('path');

console.log('🎯 Finalizando build de produção...');

const distPath = path.join(__dirname, '../dist');
const indexPath = path.join(distPath, 'index.html');

if (fs.existsSync(indexPath)) {
  let htmlContent = fs.readFileSync(indexPath, 'utf8');
  
  // Enhanced dev tools protection script
  const protectionScript = `
    <script>
      // Enhanced Production Security
      (function() {
        'use strict';
        
        // Disable dev tools detection
        let devtools = { open: false };
        
        // Multiple detection methods
        const detectDevTools = () => {
          // Method 1: Size difference
          if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
            return true;
          }
          
          // Method 2: Performance timing
          const start = performance.now();
          console.profile();
          console.profileEnd();
          const end = performance.now();
          
          if (end - start > 5) {
            return true;
          }
          
          return false;
        };
        
        // Monitor continuously
        setInterval(() => {
          if (detectDevTools()) {
            if (!devtools.open) {
              devtools.open = true;
              document.body.innerHTML = \`
                <div style="
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(45deg, #000, #333);
                  color: #fff;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-family: 'Arial', sans-serif;
                  z-index: 999999;
                  text-align: center;
                ">
                  <div>
                    <h1 style="margin-bottom: 20px; font-size: 2.5em;">🔒 Acesso Negado</h1>
                    <p style="margin-bottom: 30px; font-size: 1.2em;">Ferramentas de desenvolvedor não são permitidas neste site.</p>
                    <button onclick="window.location.reload()" style="
                      padding: 15px 30px;
                      background: linear-gradient(45deg, #007bff, #0056b3);
                      color: white;
                      border: none;
                      border-radius: 25px;
                      cursor: pointer;
                      font-size: 1.1em;
                      transition: all 0.3s;
                    " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                      🔄 Recarregar Página
                    </button>
                  </div>
                </div>
              \`;
            }
          } else {
            devtools.open = false;
          }
        }, 100);
        
        // Disable console functions
        const noop = () => {};
        ['log', 'warn', 'error', 'info', 'debug', 'dir', 'dirxml', 'group', 'groupCollapsed', 'groupEnd', 'time', 'timeEnd', 'timeLog', 'trace', 'assert', 'clear', 'count', 'countReset', 'table'].forEach(method => {
          console[method] = noop;
        });
        
        // Clear console periodically
        setInterval(() => {
          console.clear();
        }, 1000);
        
        // Keyboard protection
        document.addEventListener('keydown', (e) => {
          // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C, Ctrl+Shift+K
          if (e.keyCode === 123 || 
              (e.ctrlKey && e.shiftKey && [73, 74, 67, 75].includes(e.keyCode)) ||
              (e.ctrlKey && e.keyCode === 85)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        });
        
        // Context menu protection
        document.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          return false;
        });
        
        // Selection protection
        document.addEventListener('selectstart', (e) => {
          e.preventDefault();
          return false;
        });
        
        // Drag protection
        document.addEventListener('dragstart', (e) => {
          e.preventDefault();
          return false;
        });
        
        // Copy protection
        document.addEventListener('copy', (e) => {
          e.preventDefault();
          return false;
        });
        
      })();
    </script>
  `;
  
  // Insert the protection script before closing body tag
  htmlContent = htmlContent.replace('</body>', protectionScript + '\n  </body>');
  
  // Update title and meta tags for production
  htmlContent = htmlContent.replace(
    /<title>.*?<\/title>/,
    '<title>Listralize - Soluções Jurídicas Inovadoras</title>'
  );
  
  // Update meta description
  htmlContent = htmlContent.replace(
    /content=".*?" name="description"/,
    'content="Listralize - Escritório de advocacia especializado em soluções jurídicas inovadoras" name="description"'
  );
  
  // Remove any remaining lovable references
  htmlContent = htmlContent.replace(/lovable/gi, 'listralize');
  
  fs.writeFileSync(indexPath, htmlContent, 'utf8');
  console.log('✅ index.html finalizado com proteções avançadas');
}

// Create a production manifest
const manifest = {
  name: "Listralize",
  buildDate: new Date().toISOString(),
  version: "1.0.0",
  security: {
    devToolsProtection: true,
    consoleDisabled: true,
    rightClickDisabled: true,
    keyboardShortcutsDisabled: true,
    sourceCodeProtected: true
  },
  optimizations: {
    minified: true,
    chunked: true,
    sourceMapsRemoved: true,
    assetsOptimized: true
  }
};

fs.writeFileSync(
  path.join(distPath, 'build-manifest.json'), 
  JSON.stringify(manifest, null, 2), 
  'utf8'
);

console.log('🎉 Build finalizado com sucesso!');
console.log('📋 Manifest criado: build-manifest.json');
console.log('🛡️ Todas as proteções ativadas');
console.log('🚀 Pronto para deploy!');