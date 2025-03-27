const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');
const CleanCSS = require('clean-css');

// Files to minify
const jsFiles = [
  'popup.js',
  'background.js',
  'options.js',
  'history.js',
  'history-ui.js'
];

const cssFiles = [
  'popup.css',
  'options.css',
  'history.css'
];

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Minify JS files
jsFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const code = fs.readFileSync(filePath, 'utf8');
    const result = UglifyJS.minify(code, {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      mangle: true
    });
    
    if (result.error) {
      console.error(`Error minifying ${file}:`, result.error);
    } else {
      const minifiedPath = path.join(distDir, file);
      fs.writeFileSync(minifiedPath, result.code);
      console.log(`Minified ${file} -> ${minifiedPath}`);
      
      // Calculate size reduction
      const originalSize = Buffer.byteLength(code, 'utf8');
      const minifiedSize = Buffer.byteLength(result.code, 'utf8');
      const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
      console.log(`Size reduction: ${originalSize} -> ${minifiedSize} bytes (${reduction}%)`);
    }
  } else {
    console.warn(`File not found: ${filePath}`);
  }
});

// Minify CSS files
cssFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const code = fs.readFileSync(filePath, 'utf8');
    const result = new CleanCSS({
      level: 2
    }).minify(code);
    
    if (result.errors.length > 0) {
      console.error(`Error minifying ${file}:`, result.errors);
    } else {
      const minifiedPath = path.join(distDir, file);
      fs.writeFileSync(minifiedPath, result.styles);
      console.log(`Minified ${file} -> ${minifiedPath}`);
      
      // Calculate size reduction
      const originalSize = Buffer.byteLength(code, 'utf8');
      const minifiedSize = Buffer.byteLength(result.styles, 'utf8');
      const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
      console.log(`Size reduction: ${originalSize} -> ${minifiedSize} bytes (${reduction}%)`);
    }
  } else {
    console.warn(`File not found: ${filePath}`);
  }
});

// Copy HTML files and manifest.json to dist
const htmlFiles = ['popup.html', 'options.html', 'history.html'];
const otherFiles = ['manifest.json'];

[...htmlFiles, ...otherFiles].forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const destPath = path.join(distDir, file);
    fs.writeFileSync(destPath, content);
    console.log(`Copied ${file} -> ${destPath}`);
  } else {
    console.warn(`File not found: ${filePath}`);
  }
});

// Copy icons folder to dist
const iconsDir = path.join(__dirname, 'icons');
const distIconsDir = path.join(distDir, 'icons');
if (fs.existsSync(iconsDir)) {
  if (!fs.existsSync(distIconsDir)) {
    fs.mkdirSync(distIconsDir);
  }
  
  const icons = fs.readdirSync(iconsDir);
  icons.forEach(icon => {
    const iconPath = path.join(iconsDir, icon);
    const destPath = path.join(distIconsDir, icon);
    fs.copyFileSync(iconPath, destPath);
    console.log(`Copied ${iconPath} -> ${destPath}`);
  });
} else {
  console.warn(`Icons directory not found: ${iconsDir}`);
}

console.log('Minification complete! Files are in the dist directory.');
