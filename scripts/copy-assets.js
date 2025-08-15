const fs = require('fs');
const path = require('path');

// Copy lovable-uploads to assets directory
const sourceDir = path.join(__dirname, '../public/lovable-uploads');
const targetDir = path.join(__dirname, '../public/assets');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

if (fs.existsSync(sourceDir)) {
  const files = fs.readdirSync(sourceDir);
  
  files.forEach(file => {
    const sourceFile = path.join(sourceDir, file);
    const targetFile = path.join(targetDir, file);
    
    fs.copyFileSync(sourceFile, targetFile);
    console.log(`Copied ${file} to assets directory`);
  });
}

console.log('Assets copy completed!');