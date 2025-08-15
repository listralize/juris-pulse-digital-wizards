const fs = require('fs');
const path = require('path');

console.log('🌐 Preparando para deploy na Hostinger...');

const distPath = path.join(__dirname, '../dist');

if (!fs.existsSync(distPath)) {
  console.error('❌ Pasta dist não encontrada! Execute o build primeiro.');
  process.exit(1);
}

// Verificar arquivos essenciais
const essentialFiles = ['index.html', 'assets'];
const missingFiles = [];

essentialFiles.forEach(file => {
  const filePath = path.join(distPath, file);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.error('❌ Arquivos essenciais não encontrados:', missingFiles);
  process.exit(1);
}

// Criar .htaccess para Hostinger
const htaccessContent = `# Hostinger Production Configuration
Options +FollowSymlinks
RewriteEngine On

# Handle client-side routing
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security headers
<IfModule mod_headers.c>
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>

# Cache control
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Compression
<IfModule mod_deflate.c>
    SetOutputFilter DEFLATE
    SetEnvIfNoCase Request_URI \\.(?:gif|jpe?g|png)$ no-gzip dont-vary
    SetEnvIfNoCase Request_URI \\.(?:exe|t?gz|zip|bz2|sit|rar)$ no-gzip dont-vary
</IfModule>
`;

fs.writeFileSync(path.join(distPath, '.htaccess'), htaccessContent, 'utf8');

// Relatório final
console.log('✅ Deploy preparado com sucesso!');
console.log('📂 Arquivos na pasta dist:');

function listFiles(dir, prefix = '') {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      console.log(`${prefix}📁 ${file}/`);
      listFiles(filePath, prefix + '  ');
    } else {
      const size = (stat.size / 1024).toFixed(1);
      console.log(`${prefix}📄 ${file} (${size}KB)`);
    }
  });
}

listFiles(distPath);

console.log('\n🚀 Instruções para deploy na Hostinger:');
console.log('1. Acesse o painel da Hostinger');
console.log('2. Vá em "Gerenciador de Arquivos"');
console.log('3. Navegue até a pasta "public_html"');
console.log('4. Faça upload de TODOS os arquivos da pasta "dist"');
console.log('5. Certifique-se que o arquivo .htaccess foi carregado');
console.log('6. Teste o site no seu domínio');

console.log('\n📋 Checklist:');
console.log('✅ .htaccess criado para SPA routing');
console.log('✅ Assets organizados');
console.log('✅ Compressão configurada');
console.log('✅ Cache headers definidos');
console.log('✅ Security headers configurados');