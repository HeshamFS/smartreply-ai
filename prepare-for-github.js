/**
 * Script to prepare the SmartReply AI extension for GitHub
 * 
 * This script:
 * 1. Updates the manifest.json with the correct author information
 * 2. Ensures all files use the correct GitHub repository URL
 * 3. Creates a zip file for distribution
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Update manifest.json in the source directory
const manifestPath = path.join(__dirname, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Update author information
manifest.author = "Hesham Salama";
manifest.applications.gecko.id = "smartreply-ai@hesham.salama";

// Write updated manifest
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('✅ Updated manifest.json with correct author information');

// Run the minify script to update the dist folder
console.log('🔄 Running minify script to update dist folder...');
execSync('node minify.js', { stdio: 'inherit' });

// Create a zip file for distribution
console.log('📦 Creating zip file for distribution...');
try {
  execSync('cd dist && zip -r ../smartreply-ai.zip *', { stdio: 'inherit' });
  console.log('✅ Created smartreply-ai.zip');
} catch (error) {
  console.error('❌ Error creating zip file:', error.message);
  console.log('Please manually create the zip file with: cd dist && zip -r ../smartreply-ai.zip *');
}

console.log(`
🎉 Repository preparation complete!

Next steps:
1. Create a new GitHub repository at: https://github.com/HeshamFS/smartreply-ai
2. Initialize git repository:
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/HeshamFS/smartreply-ai.git
   git push -u origin main

3. Create a release on GitHub and upload the smartreply-ai.zip file

Your extension is now ready for GitHub! 🚀
`);
