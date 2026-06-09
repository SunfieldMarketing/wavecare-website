import sharp from 'sharp';

async function processExactDepthImage() {
  const inputPath = 'public/images/gallery/Yorktown front.jpg';
  const outputPath = 'public/images/gallery/Yorktown_front_before.jpg';

  console.log('Loading original image to preserve 100% exact depth...');
  const metadata = await sharp(inputPath).metadata();
  
  // We use the exact same dimensions to guarantee perfect depth match
  const resWidth = metadata.width;
  const resHeight = metadata.height;

  console.log('Applying subtle grey effect and amateur look...');
  await sharp(inputPath)
    // Apply a subtle greyscale/desaturation effect
    .modulate({
      saturation: 0.4, // Wash out colors significantly
      brightness: 1.05, // Slightly overexposed
      hue: -10 // Slight color shift
    })
    // Add a very slight blur to remove the "professional sharpness"
    .blur(0.8)
    .jpeg({
      quality: 60, // Moderate compression
      chromaSubsampling: '4:2:0'
    })
    .toFile(outputPath);

  console.log('Successfully created exact-depth before photo!');
}

processExactDepthImage().catch(console.error);
