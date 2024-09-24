# ImageImport Component

## Overview
The ImageImport component provides a user interface for uploading an image file to the application and passes the original image dimensions to the parent component.

## Props
- `onImageLoad` (function): A callback function that is called when an image is successfully loaded. It receives the loaded image object, original width, and original height as arguments.

## Functionality
1. Renders a styled button labeled "Choose Image".
2. When an image is selected, it reads the file and creates an Image object.
3. Once the image is loaded, it calls the `onImageLoad` callback with the image object and its original dimensions.

## Key Features
- File Selection: Uses a hidden file input to allow users to select image files.
- Image Preview: Converts the selected file to a data URL for preview and further processing.
- Original Dimension Preservation: Captures and passes the original width and height of the uploaded image.
- Styled Button: Uses a label styled as a button for better user experience.
- File Type Restriction: Accepts only image files (`accept="image/*"`).

## Usage
```jsx
<ImageImport onImageLoad={handleImageLoad} />
```

## Implementation Details
1. The component uses a FileReader to read the selected image file.
2. It creates a new Image object and sets its source to the result of the FileReader.
3. Once the image is loaded, it calls the `onImageLoad` prop function with the loaded image, its width, and height.

## Styling
- The file input is hidden (`style={{ display: 'none' }}`).
- A label with the class `custom-file-upload` is used as a styled button.
- The container div has a class `image-import` for additional styling if needed.

## Notes
- The component doesn't handle errors that might occur during file reading or image loading. Error handling could be added for robustness.
- The component doesn't impose any restrictions on image size or dimensions. If needed, such validations should be implemented in the parent component or in the `onImageLoad` callback.
- The original image dimensions are crucial for maintaining aspect ratio and size in other components, particularly for the download functionality.

## Best Practices
- The use of a hidden file input with a styled label follows a common pattern for creating custom-styled file upload buttons.
- The component is focused on a single responsibility: importing an image file and providing its original dimensions.
- Passing the original dimensions allows other components to make informed decisions about scaling and rendering.

## Example of Parent Component Usage
```jsx
const handleImageLoad = (img, width, height) => {
  setImage(img);
  setOriginalWidth(width);
  setOriginalHeight(height);
  // Other necessary state updates or processing
};
```

This updated documentation reflects the changes made to pass the original image dimensions from the ImageImport component to its parent component, which is crucial for ensuring the downloaded image maintains the same size as the uploaded image.