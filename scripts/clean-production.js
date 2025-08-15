const fs = require('fs');
const path = require('path');

// Function to recursively read all files in a directory
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .git directories
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        getAllFiles(filePath, fileList);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to replace lovable-uploads with assets
function cleanFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Replace /lovable-uploads/ with /assets/
    if (content.includes('/lovable-uploads/')) {
      content = content.replace(/\/lovable-uploads\//g, '/assets/');
      modified = true;
    }
    
    // Replace "lovable-uploads/ with "assets/
    if (content.includes('"lovable-uploads/')) {
      content = content.replace(/"lovable-uploads\//g, '"assets/');
      modified = true;
    }
    
    // Replace 'lovable-uploads/ with 'assets/
    if (content.includes("'lovable-uploads/")) {
      content = content.replace(/'lovable-uploads\//g, "'assets/");
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Cleaned: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
console.log('🧹 Starting production cleanup...');

const srcDir = path.join(__dirname, '../src');
const allFiles = getAllFiles(srcDir);

let totalCleaned = 0;

allFiles.forEach(file => {
  if (cleanFile(file)) {
    totalCleaned++;
  }
});

console.log(`✅ Production cleanup completed! ${totalCleaned} files modified.`);