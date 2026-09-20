import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const srcDir = path.join(__dirname, 'client', 'src');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content
    .replace(/amber-/g, 'green-')
    .replace(/orange-/g, 'green-')
    .replace(/forest-/g, 'green-')
    .replace(/cream-50/g, 'green-50')
    .replace(/cream-100/g, 'green-100')
    // hex codes in css
    .replace(/#fbbf24/ig, '#66bb6a') // amber-400 -> green-400
    .replace(/#f59e0b/ig, '#4caf50') // amber-500 -> green-500
    .replace(/#d97706/ig, '#43a047') // amber-600 -> green-600
    .replace(/#f97316/ig, '#4caf50') // orange-500 -> green-500
    .replace(/#ea580c/ig, '#388e3c') // orange-600 -> green-700
    .replace(/#0d1f0d/ig, '#1b5e20') // forest-900
    .replace(/#14240f/ig, '#2e7d32') // forest-800
    .replace(/#1a3010/ig, '#388e3c') // forest-700
    .replace(/#fffbeb/ig, '#e8f5e9') // cream-50
    .replace(/#fef3c7/ig, '#c8e6c9'); // cream-100
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir(srcDir);
console.log("Done");
