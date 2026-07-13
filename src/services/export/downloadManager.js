/**
 * Triggers a browser-side download of a generated Data URL.
 */
export const downloadImage = (dataUrl, filename) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Sequential batch downloader to prevent browser from blocking multiple simultaneous downloads.
 */
export const downloadBatch = async (files) => {
  for (const file of files) {
    downloadImage(file.dataUrl, file.filename);
    // Add a tiny delay between downloads to ensure the browser processes them
    await new Promise(resolve => setTimeout(resolve, 500));
  }
};
