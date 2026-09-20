import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'client', 'src');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content
    // Backgrounds
    .replace(/bg-stone-950/g, 'bg-green-50')
    .replace(/bg-stone-900/g, 'bg-green-100')
    .replace(/from-stone-950/g, 'from-green-50')
    .replace(/via-stone-950/g, 'via-green-50')
    .replace(/to-stone-950/g, 'to-green-50')
    
    // Text colors
    .replace(/text-white/g, 'text-green-900')
    .replace(/text-stone-900/g, 'text-green-50')
    
    // Green text inversions (careful with regex boundaries)
    .replace(/text-green-100/g, 'text-green-900')
    .replace(/text-green-200/g, 'text-green-800')
    .replace(/text-green-300/g, 'text-green-700')
    
    // Borders and others
    .replace(/border-white\/10/g, 'border-green-900/10')
    .replace(/border-green-400\/10/g, 'border-green-700/20')
    .replace(/border-green-400\/30/g, 'border-green-700/40')
    .replace(/border-green-400\/20/g, 'border-green-700/30');

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
    } else if (fullPath.endsWith('.jsx')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir(srcDir);
console.log("Light theme conversion done");
