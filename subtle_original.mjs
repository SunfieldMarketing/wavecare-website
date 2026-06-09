import sharp from 'sharp';

async function processOriginal() {
  const inputPath = 'public/images/gallery/Yorktown front.jpg';
  const outputPath = 'public/images/gallery/Yorktown_front_before.jpg';

  console.log('Loading original image...');
  const metadata = await sharp(inputPath).metadata();
  const width = metadata.width;
  const height = metadata.height;

  console.log('Generating subtle noise...');
  const noiseSize = width * height * 3;
  const noiseBuffer = Buffer.alloc(noiseSize);
  for (let i = 0; i < noiseSize; i++) {
    const grain = Math.floor(Math.random() * 40) - 20; 
    noiseBuffer[i] = Math.min(255, Math.max(0, 128 + grain));
  }

  console.log('Applying adjusted subtle grey effect...');
  await sharp(inputPath)
    .modulate({
      saturation: 0.60, // Reduced from 0.75 to make it slightly greyer
      brightness: 1.04, 
      hue: -2 
    })
    .composite([{
      input: noiseBuffer,
      raw: { width, height, channels: 3 },
      blend: 'overlay', 
      opacity: 0.15 
    }])
    .jpeg({
      quality: 70, 
      chromaSubsampling: '4:2:0'
    })
    .toFile(outputPath);

  console.log('Done!');
}

processOriginal().catch(console.error);
