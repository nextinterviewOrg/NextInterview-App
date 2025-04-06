import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create tinymce directory in public if it doesn't exist
const publicDir = path.join(__dirname, '../public');
const tinymceDir = path.join(publicDir, 'tinymce');

if (!fs.existsSync(tinymceDir)) {
  fs.mkdirSync(tinymceDir, { recursive: true });
}

// Copy tinymce.min.js
fs.copyFileSync(
  path.join(__dirname, '../node_modules/tinymce/tinymce.min.js'),
  path.join(tinymceDir, 'tinymce.min.js')
);

// Copy skins directory
const skinsDir = path.join(tinymceDir, 'skins');
if (!fs.existsSync(skinsDir)) {
  fs.mkdirSync(skinsDir, { recursive: true });
}
fs.cpSync(
  path.join(__dirname, '../node_modules/tinymce/skins'),
  skinsDir,
  { recursive: true }
);

// Copy icons directory
const iconsDir = path.join(tinymceDir, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}
fs.cpSync(
  path.join(__dirname, '../node_modules/tinymce/icons'),
  iconsDir,
  { recursive: true }
);

// Copy plugins directory
const pluginsDir = path.join(tinymceDir, 'plugins');
if (!fs.existsSync(pluginsDir)) {
  fs.mkdirSync(pluginsDir, { recursive: true });
}
fs.cpSync(
  path.join(__dirname, '../node_modules/tinymce/plugins'),
  pluginsDir,
  { recursive: true }
);

console.log('TinyMCE files copied successfully!'); 