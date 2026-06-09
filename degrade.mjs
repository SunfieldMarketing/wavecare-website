import sharp from 'sharp';

async function degradeImage() {
  const inputPath = 'public/images/gallery/Yorktown front.jpg';
  const outputPath = 'public/images/gallery/Yorktown_front_before.jpg';

  console.log('Loading image...');
  const metadata = await sharp(inputPath).metadata();
  
  // Moderate downscale
  const resWidth = 1000; 
  const resHeight = Math.round((metadata.height / metadata.width) * resWidth);

  // Generate moderate noise buffer
  console.log('Generating noise...');
  const noiseSize = resWidth * resHeight * 3;
  const noiseBuffer = Buffer.alloc(noiseSize);
  for (let i = 0; i < noiseSize; i++) {
    // Light colored noise
    const grain = Math.floor(Math.random() * 80) - 40; 
    noiseBuffer[i] = Math.min(255, Math.max(0, 128 + grain));
  }

  console.log('Applying realistic amateur photo effects...');
  await sharp(inputPath)
    .resize(resWidth, resHeight)
    .blur(0.5) // Just a tiny bit soft
    .modulate({
      brightness: 1.05, 
      saturation: 0.8, // Slightly dull colors
      hue: -5 // Very slight tint
    })
    .composite([{
      input: noiseBuffer,
      raw: { width: resWidth, height: resHeight, channels: 3 },
      blend: 'overlay', 
      opacity: 0.35 // Noticeable but not overwhelming grain
    }])
    .jpeg({
      quality: 40, // Standard phone compression
      chromaSubsampling: '4:2:0'
    })
    .toFile(outputPath);

  console.log('Done!');
}

degradeImage().catch(console.error);
