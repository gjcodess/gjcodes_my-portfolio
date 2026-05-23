import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { projects } from '../src/data/content.js';

const publicDir = path.resolve('public');
const sizes = [400, 800, 1200];
const formats = [
  { ext: 'webp', format: 'webp', options: { quality: 80 } },
  { ext: 'jpg', format: 'jpeg', options: { quality: 80, mozjpeg: true } },
];
const sourceExtensions = ['.png', '.jpg', '.jpeg'];

const normalizeBase = (value) => {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const cleaned = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
  const parsed = path.parse(cleaned);
  return parsed.name || null;
};

const collectProjectBases = () => {
  const bases = new Set();

  projects.forEach((project) => {
    let hasBase = false;

    if (Array.isArray(project.imageBases)) {
      project.imageBases
        .map(normalizeBase)
        .filter(Boolean)
        .forEach((base) => {
          bases.add(base);
          hasBase = true;
        });
    }

    if (project.imageBase) {
      const base = normalizeBase(project.imageBase);
      if (base) {
        bases.add(base);
        hasBase = true;
      }
    }

    if (!hasBase) {
      const legacyList = Array.isArray(project.images)
        ? project.images
        : project.image
          ? [project.image]
          : [];

      legacyList
        .map(normalizeBase)
        .filter(Boolean)
        .forEach((base) => bases.add(base));
    }
  });

  return Array.from(bases);
};

const findSourceFile = async (base) => {
  for (const ext of sourceExtensions) {
    const filePath = path.join(publicDir, `${base}${ext}`);
    try {
      await fs.access(filePath);
      return filePath;
    } catch {
      // keep searching
    }
  }

  return null;
};

const bases = collectProjectBases();

if (bases.length === 0) {
  console.log('No project image bases found.');
  process.exit(0);
}

for (const base of bases) {
  const inputPath = await findSourceFile(base);

  if (!inputPath) {
    console.warn(`Missing source image for ${base}.`);
    continue;
  }

  for (const size of sizes) {
    for (const format of formats) {
      const outputPath = path.join(publicDir, `${base}-${size}.${format.ext}`);
      await sharp(inputPath)
        .resize({ width: size, withoutEnlargement: true })
        .toFormat(format.format, format.options)
        .toFile(outputPath);
    }
  }

  console.log(`Optimized ${path.basename(inputPath)}`);
}

console.log('Project image optimization complete.');
