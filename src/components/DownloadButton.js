import React from 'react';
import { saveAs } from 'file-saver';

const DownloadButton = ({ stageRef, isImageLoaded }) => {
  const handleDownload = () => {
    const stage = stageRef.current;
    if (stage) {
      const dataURL = stage.toDataURL();
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