import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function generateThumbs() {
  const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery');
  const thumbsDir = path.join(galleryDir, 'thumbs');

  // Create thumbs directory if it doesn't exist
  if (!fs.existsSync(thumbsDir)) {
    fs.mkdirSync(thumbsDir, { recursive: true });
  }

  const files = fs.readdirSync(galleryDir).filter(f => f.match(/\.(jpg|jpeg|png)$/i));
  
  console.log(`Found ${files.length} images. Generating thumbs...`);

  for (const file of files) {
    // skip the ugly before photo
    if (file === 'Yorktown_front_before.jpg') continue;

    const inputPath = path.join(galleryDir, file);
    const outputPath = path.join(thumbsDir, file);

    try {
      await sharp(inputPath)
        .resize(300, 300, { fit: 'cover' })
        .webp({ quality: 60 })
        .toFile(outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
      console.log(`Generated thumb for: ${file}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  console.log('All thumbnails generated successfully!');
}

generateThumbs();
