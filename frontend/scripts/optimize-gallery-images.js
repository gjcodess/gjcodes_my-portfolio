import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const inputDir = path.resolve('public/gallery');
const sizes = [400, 800, 1200];
const sizeSuffixPattern = new RegExp(`-(${sizes.join('|')})\\.(jpe?g|png)$`, 'i');
const formats = [
  { ext: 'webp', format: 'webp', options: { quality: 80 } },
  { ext: 'jpg', format: 'jpeg', options: { quality: 80, mozjpeg: true } },
];

const isSourceImage = (fileName) =>
  /\.(jpe?g|png)$/i.test(fileName) && !sizeSuffixPattern.test(fileName);

const files = await fs.readdir(inputDir);
const sourceFiles = files.filter(isSourceImage);

if (sourceFiles.length === 0) {
  console.log('No source images found in public/gallery.');
  process.exit(0);
}

for (const file of sourceFiles) {
  const inputPath = path.join(inputDir, file);
  const { name } = path.parse(file);

  for (const size of sizes) {
    for (const format of formats) {
      const outputPath = path.join(inputDir, `${name}-${size}.${format.ext}`);
      await sharp(inputPath)
        .resize({ width: size, withoutEnlargement: true })
        .toFormat(format.format, format.options)
        .toFile(outputPath);
    }
  }

  console.log(`Optimized ${file}`);
}

console.log('Gallery image optimization complete.');
