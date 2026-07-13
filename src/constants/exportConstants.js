export const EXPORT_PRESETS = {
  FULL_HD: {
    id: 'FULL_HD',
    name: 'Full HD (16:9)',
    width: 1920,
    height: 1080,
    scale: 1, // Native render
    description: 'Standard format for YouTube and Broadcast.'
  },
  INSTAGRAM_SQUARE: {
    id: 'INSTAGRAM_SQUARE',
    name: 'Instagram Square (1:1)',
    width: 1080,
    height: 1080,
    scale: 1,
    description: 'Perfect for Instagram and Facebook feeds.'
  },
  INSTAGRAM_PORTRAIT: {
    id: 'INSTAGRAM_PORTRAIT',
    name: 'Instagram Portrait (4:5)',
    width: 1080,
    height: 1350,
    scale: 1,
    description: 'Maximum screen real-estate for social feeds.'
  },
  STORY: {
    id: 'STORY',
    name: 'Story / Reels (9:16)',
    width: 1080,
    height: 1920,
    scale: 1,
    description: 'Optimized for mobile viewing.'
  }
};

export const EXPORT_FORMATS = {
  PNG: 'png',
  JPG: 'jpg'
};
