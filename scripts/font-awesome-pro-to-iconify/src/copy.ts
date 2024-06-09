import fs from 'fs';
import path from 'path';

// set output directory
const outputDirectory = path.resolve(__dirname, '../output');

// set target directory
const targetDirectory = path.resolve(__dirname, '../../packages/font-awesome-pro-iconify/src');

// read all json files from output directory
const files = fs.readdirSync(outputDirectory).filter((file) => file.endsWith('.json'));

// copy files
files.forEach((file) => {
  console.log(`Copy file ${file}...`);
  fs.copyFileSync(path.join(outputDirectory, file), path.join(targetDirectory, file));
  console.log(`File ${file} copied.`);
});

// copy index file
console.log(`Copy index file...`);
fs.copyFileSync(path.join(outputDirectory, 'index.ts'), path.join(targetDirectory, 'index.ts'));
console.log(`Index file copied.`);
