import React from 'react';

const ImageImport = ({ onImageLoad }) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        onImageLoad(img, img.width, img.height);
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="image-import">
      <label htmlFor="file-upload" className="custom-file-upload">
        Choose Image
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageImport;