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
  
  // Replace text-green-[56789]00 and any opacity modifier with text-green-900
  // But DO NOT replace text-green-500 because it's sometimes used for accent icons. Wait, in the previous script we did. 
  // Let's replace text-green-[789]00 for safety, as 500/600 might be used for highlights or badges.
  // Actually, the user wants the text to be #1B5E20. Let's replace text-green-[6789]00(\/\d+)?
  
  let newContent = content.replace(/text-green-[6789]00(\/\d+)?/g, 'text-green-900');
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
console.log("Done updating font colors for other sections.");
