import React from 'react';
import { saveAs } from 'file-saver';

const DownloadButton = ({ stageRef, isImageLoaded, originalWidth, originalHeight }) => {
  const handleDownload = () => {
    const stage = stageRef.current;
    if (stage) {
      // Create a new canvas with the original image dimensions
      const canvas = document.createElement('canvas');
      canvas.width = originalWidth;
      canvas.height = originalHeight;
      const context = canvas.getContext('2d');

      // Draw the stage content onto the new canvas
      const stageCanvas = stage.toCanvas();
      context.drawImage(stageCanvas, 0, 0, originalWidth, originalHeight);

      const dataURL = canvas.toDataURL();
      const blob = dataURLToBlob(dataURL);
      saveAs(blob, 'annotated_image.png');
    }
  };

  const dataURLToBlob = (dataURL) => {
    const binary = atob(dataURL.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/png' });
  };

  if (!isImageLoaded) {
    return null;
  }

  return (
    <button className="download-button" onClick={handleDownload}>
      Download Image
    </button>
  );
};

export default DownloadButton;