import sharp from 'sharp';

async function processGeneratedImage() {
  const inputPath = 'C:/Users/TEGAC/.gemini/antigravity/brain/0067f733-b4ee-4c7b-9bc8-ef3c5a4545db/yorktown_front_semantic_edit_1780968097860.png';
  const outputPath = 'public/images/gallery/Yorktown_front_before.jpg';

  console.log('Loading AI generated semantic edit...');
  
  // We just need to convert the PNG to a slightly compressed JPG so it loads fast
  // and maintains the exact filename.
  await sharp(inputPath)
    .jpeg({ quality: 75 })
    .toFile(outputPath);

  console.log('Successfully replaced before photo with semantic edit!');
}

processGeneratedImage().catch(console.error);
