# ImageImport Component

## Overview
The ImageImport component provides a user interface for uploading an image file to the application.

## Props
- `onImageLoad` (function): A callback function that is called when an image is successfully loaded. It receives the loaded image as an argument.

## Functionality
1. Renders a styled button labeled "Choose Image".
2. When an image is selected, it reads the file and creates an Image object.
3. Once the image is loaded, it calls the `onImageLoad` callback with the image object.

## Key Features
- File Selection: Uses a hidden file input to allow users to select image files.
- Image Preview: Converts the selected file to a data URL for preview and further processing.
- Styled Button: Uses a label styled as a button for better user experience.
- File Type Restriction: Accepts only image files (`accept="image/*"`).

## Usage
```jsx
<ImageImport onImageLoad={handleImageLoad} />
```

## Implementation Details
1. The component uses a FileReader to read the selected image file.
2. It creates a new Image object and sets its source to the result of the FileReader.
3. Once the image is loaded, it calls the `onImageLoad` prop function with the loaded image.

## Styling
- The file input is hidden (`style={{ display: 'none' }}`).
- A label with the class `custom-file-upload` is used as a styled button.
- The container div has a class `image-import` for additional styling if needed.

## Notes
- The component doesn't handle errors that might occur during file reading or image loading. Error handling could be added for robustness.
- The component doesn't impose any restrictions on image size or dimensions. If needed, such validations should be implemented in the parent component or in the `onImageLoad` callback.

## Best Practices
- The use of a hidden file input with a styled label follows a common pattern for creating custom-styled file upload buttons.
- The component is focused on a single responsibility: importing an image file.