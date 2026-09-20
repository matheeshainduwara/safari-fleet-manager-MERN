import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
  path.join(__dirname, 'client', 'src', 'sections', 'About.jsx'),
  path.join(__dirname, 'client', 'src', 'sections', 'Booking.jsx'),
  path.join(__dirname, 'client', 'src', 'components', 'Footer.jsx')
];

function updateFontColor(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // We want to replace text-green-[56789]00 and any opacity modifier with text-green-900
  // But we want to avoid replacing text-green-50 which is used for button text.
  let newContent = content.replace(/text-green-[56789]00(\/\d+)?/g, 'text-green-900');
  
  // Replace text-green-900/50 etc.
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
console.log("Done updating font colors.");
