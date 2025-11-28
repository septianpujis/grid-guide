// Icon generator script for Grid Guide extension
// Run with: node generate-icons.js
// Requires: npm install canvas (or use the HTML version instead)

const fs = require('fs');
const path = require('path');

// Check if canvas is available
let Canvas;
try {
  Canvas = require('canvas');
} catch (e) {
  console.log('Canvas module not found. Please use create-icons.html instead.');
  console.log('Or install canvas: npm install canvas');
  process.exit(1);
}

const iconsDir = path.join(__dirname, 'icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

function createIcon(size) {
  const canvas = Canvas.createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  // Draw grid lines
  ctx.strokeStyle = 'white';
  ctx.lineWidth = Math.max(1, size / 64);
  
  // Vertical lines
  for (let i = 1; i < 4; i++) {
    const x = (size / 4) * i;
    ctx.beginPath();
    ctx.moveTo(x, size * 0.2);
    ctx.lineTo(x, size * 0.8);
    ctx.stroke();
  }
  
  // Horizontal lines
  for (let i = 1; i < 4; i++) {
    const y = (size / 4) * i;
    ctx.beginPath();
    ctx.moveTo(size * 0.2, y);
    ctx.lineTo(size * 0.8, y);
    ctx.stroke();
  }
  
  return canvas;
}

// Generate icons
const sizes = [16, 48, 128];

console.log('Generating icons...');

sizes.forEach(size => {
  const canvas = createIcon(size);
  const buffer = canvas.toBuffer('image/png');
  const filePath = path.join(iconsDir, `icon${size}.png`);
  fs.writeFileSync(filePath, buffer);
  console.log(`✓ Created ${filePath}`);
});

console.log('\nAll icons generated successfully!');

