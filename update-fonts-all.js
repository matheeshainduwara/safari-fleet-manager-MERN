import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
  path.join(__dirname, 'client', 'src', 'sections', 'Hero.jsx'),
  path.join(__dirname, 'client', 'src', 'sections', 'Gallery.jsx'),
  path.join(__dirname, 'client', 'src', 'sections', 'Contact.jsx'),
  path.join(__dirname, 'client', 'src', 'components', 'Navbar.jsx')
];

function updateFontColor(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace text-green-100 through 900 (with optional opacity) to text-green-900
  // Note: we don't match text-green-50
  let newContent = content.replace(/text-green-[1-9]00(\/\d+)?/g, 'text-green-900');
  
  // Handle case where text-green-900/50 etc was just generated or previously missed
  newContent = newContent.replace(/text-green-900\/\d+/g, 'text-green-900');
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated font colors in ${path.basename(filePath)}`);
  }
}

for (const file of files) {
  if (fs.existsSync(file)) {
    updateFontColor(file);
  }
}
console.log("Done updating font colors for all other sections.");
