import sharp from 'sharp';
import fs from 'fs';

async function degradeImage() {
  const inputPath = 'public/images/gallery/Yorktown front.jpg';
  const outputPath = 'public/images/gallery/yorktown_front_before.jpg';

  console.log('Loading image...');
  const metadata = await sharp(inputPath).metadata();
  
  // Create a noise buffer
  console.log('Generating noise...');
  const width = 800; // Work on a smaller size to simulate bad camera
  const height = Math.round((metadata.height / metadata.width) * 800);
  
  const noiseSize = width * height * 3; // RGB
  const noiseBuffer = Buffer.alloc(noiseSize);
  for (let i = 0; i < noiseSize; i++) {
    // Random noise values between 0 and 255
    // But we want monochromatic or colored noise. Let's do colored grain.
    // For subtlety, let's keep it centered around 128
    const grain = Math.floor(Math.random() * 100) - 50; 
    noiseBuffer[i] = 128 + grain;
  }

  console.log('Applying effects...');
  await sharp(inputPath)
    .resize(width, height) // Downscale to simulate low-res sensor
    .blur(1.5) // Out of focus
    .modulate({
      brightness: 1.15, // Blown out highlights
      saturation: 0.6, // Washed out colors
      hue: -10 // Bad white balance
    })
    .composite([{
      input: noiseBuffer,
      raw: { width, height, channels: 3 },
      blend: 'overlay', // Overlay the noise
      opacity: 0.4
    }])
    .jpeg({
      quality: 15, // Terrible JPEG compression artifacts
      chromaSubsampling: '4:2:0'
    })
    .toFile(outputPath);

  console.log('Done!');
}

degradeImage().catch(console.error);
