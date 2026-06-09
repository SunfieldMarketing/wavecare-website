import sharp from 'sharp';

async function processImage() {
  const originalPath = 'public/images/gallery/Yorktown front.jpg';
  const aiImagePath = 'C:/Users/TEGAC/.gemini/antigravity/brain/0067f733-b4ee-4c7b-9bc8-ef3c5a4545db/flag_moved_1780968445225.png';
  const outputPath = 'public/images/gallery/Yorktown_front_before.jpg';

  console.log('Loading images...');
  const metadata = await sharp(originalPath).metadata();
  const width = metadata.width;
  const height = metadata.height;

  // Generate subtle noise buffer
  console.log('Generating subtle noise...');
  const noiseSize = width * height * 3;
  const noiseBuffer = Buffer.alloc(noiseSize);
  for (let i = 0; i < noiseSize; i++) {
    // Very light noise
    const grain = Math.floor(Math.random() * 40) - 20; 
    noiseBuffer[i] = Math.min(255, Math.max(0, 128 + grain));
  }

  console.log('Applying filters to AI image with new flag...');
  await sharp(aiImagePath)
    .resize(width, height) // Force exact dimensions
    // Much more subtle grey effect
    .modulate({
      saturation: 0.75, // Only slightly desaturated (was 0.4)
      brightness: 1.02, // Barely overexposed
      hue: -2 // Extremely subtle tint
    })
    .composite([{
      input: noiseBuffer,
      raw: { width, height, channels: 3 },
      blend: 'overlay', 
      opacity: 0.15 // Very subtle noise
    }])
    .jpeg({
      quality: 70, // Better quality
      chromaSubsampling: '4:2:0'
    })
    .toFile(outputPath);

  console.log('Done!');
}

processImage().catch(console.error);
