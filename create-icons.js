const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create directory if it doesn't exist
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir);
}

// Function to create a simple icon with text
function createIcon(size, text, backgroundColor = '#4285f4', textColor = '#ffffff') {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Draw background
  ctx.fillStyle = backgroundColor;
  ctx.beginPath();
  ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw text
  ctx.fillStyle = textColor;
  ctx.font = `bold ${size/2}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, size/2, size/2);
  
  return canvas.toBuffer('image/png');
}

// Create icons in various sizes
const sizes = [16, 32, 48, 96, 128];
const text = 'SR';

sizes.forEach(size => {
  const iconBuffer = createIcon(size, text);
  fs.writeFileSync(path.join(iconsDir, `icon${size}.png`), iconBuffer);
  console.log(`Created icon${size}.png`);
});

console.log('All icons created successfully!');
