# DownloadButton Component

## Overview
The DownloadButton component provides functionality to download the annotated image as a PNG file, ensuring that the downloaded image maintains the same dimensions as the original uploaded image.

## Props
- `stageRef` (React.RefObject): A reference to the Konva Stage component containing the annotated image.
- `isImageLoaded` (boolean): A flag indicating whether an image has been loaded into the application.
- `originalWidth` (number): The width of the original uploaded image.
- `originalHeight` (number): The height of the original uploaded image.

## Functionality
1. Renders a "Download Image" button when an image is loaded.
2. When clicked, it creates a new canvas with the original image dimensions.
3. Draws the current state of the Konva Stage onto this new canvas, scaling it to match the original dimensions.
4. Converts the canvas to a data URL and then to a Blob.
5. Uses the file-saver library to save the Blob as a PNG file named 'annotated_image.png'.

## Key Features
- Conditional Rendering: The button is only displayed when an image is loaded (`isImageLoaded` is true).
- Original Size Preservation: Creates a new canvas with the original image dimensions to ensure the downloaded image matches the uploaded image size.
- Image Capture: Uses Konva's `toCanvas()` method to capture the entire stage, including all annotations.
- Image Scaling: Scales the annotated image to match the original dimensions when drawing onto the new canvas.
- File Conversion: Includes a utility function `dataURLToBlob` to convert the data URL to a Blob for download.
- File Saving: Utilizes the `file-saver` library for cross-browser compatible file downloading.

## Usage
```jsx
<DownloadButton 
  stageRef={stageRef} 
  isImageLoaded={isImageLoaded} 
  originalWidth={originalWidth}
  originalHeight={originalHeight}
/>
```

## Dependencies
- React
- file-saver: For saving the file to the user's device.

## Notes
- The component assumes that the Konva Stage is properly set up and contains the annotated image.
- The download functionality is triggered on button click, giving users control over when to save their work.
- The downloaded image will include all annotations present on the Konva Stage at the time of download, scaled to match the original image dimensions.

## Error Handling
- The component checks if the `stageRef` is valid before attempting to capture the image data.
- If `isImageLoaded` is false, the component returns null, preventing any download attempts when no image is present.

## Styling
- The button has a class name of "download-button" for styling purposes.