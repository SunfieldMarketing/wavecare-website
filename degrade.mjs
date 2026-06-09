import sharp from 'sharp';
import fs from 'fs';

async function degradeImage() {
  const inputPath = 'public/images/gallery/Yorktown front.jpg';
  // Use the exact case-sensitive filename that Git is tracking
  const outputPath = 'public/images/gallery/Yorktown_front_before.jpg';

  console.log('Loading image...');
  const metadata = await sharp(inputPath).metadata();
  
  // Downscale heavily first to lose detail
  const lowResWidth = 400; 
  const lowResHeight = Math.round((metadata.height / metadata.width) * lowResWidth);

  // Generate heavy noise buffer
  console.log('Generating heavy noise...');
  const noiseSize = lowResWidth * lowResHeight * 3;
  const noiseBuffer = Buffer.alloc(noiseSize);
  for (let i = 0; i < noiseSize; i++) {
    // Aggressive colored noise
    const grain = Math.floor(Math.random() * 200) - 100; 
    noiseBuffer[i] = Math.min(255, Math.max(0, 128 + grain));
  }

  console.log('Applying extreme degradation effects...');
  await sharp(inputPath)
    .resize(lowResWidth, lowResHeight) // Extreme downscale
    .blur(1.5) // Out of focus blur
    .modulate({
      brightness: 1.25, // Very blown out highlights
      saturation: 0.3, // Extremely washed out
      hue: -25 // Strong ugly color shift (greenish/yellow tint)
    })
    .composite([{
      input: noiseBuffer,
      raw: { width: lowResWidth, height: lowResHeight, channels: 3 },
      blend: 'overlay', 
      opacity: 0.8 // Much heavier noise opacity
    }])
    .jpeg({
      quality: 5, // Maximum compression artifacting
      chromaSubsampling: '4:2:0'
    })
    .toBuffer()
    .then(data => {
      // Upscale it back up slightly so it fits the container without browser smoothing it nicely
      return sharp(data)
        .resize(800, null, { kernel: 'nearest' }) // Nearest neighbor upscale for blockiness
        .toFile(outputPath);
    });

  console.log('Done!');
}

degradeImage().catch(console.error);
