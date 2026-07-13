import * as htmlToImage from 'html-to-image';

/**
 * Adapter pattern to isolate the html-to-image dependency.
 * Allows easy swapping to a different renderer later (e.g. html2canvas).
 */
export const renderToDataUrl = async (nodeRef, format = 'png', scale = 1) => {
  if (!nodeRef) throw new Error('No DOM node provided to rendering adapter.');

  const options = {
    quality: 1.0,
    pixelRatio: scale,
    // Ensure styles capture correctly even if we are hiding the node or transforming it
    style: {
      transform: 'scale(1)', // Force 1:1 scale for capture to avoid blur
      transformOrigin: 'top left'
    }
  };

  try {
    if (format === 'jpg' || format === 'jpeg') {
      return await htmlToImage.toJpeg(nodeRef, options);
    }
    // Default to PNG
    return await htmlToImage.toPng(nodeRef, options);
  } catch (error) {
    console.error("Rendering failed:", error);
    throw new Error('Failed to render image.');
  }
};
