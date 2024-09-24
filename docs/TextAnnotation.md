# TextAnnotation Component

## Overview
The TextAnnotation component allows users to add text annotations to an image on a Konva stage.

## Props
- `stageRef` (React.RefObject): A reference to the Konva Stage component.
- `selectedTool` (string): The currently selected annotation tool.
- `color` (string): The color to be used for the text annotation.
- `fontSize` (number): The font size to be used for the text annotation.
- `onAnnotationAdd` (function): A callback function to add the new text annotation to the parent component's state.

## Functionality
1. Listens for clicks on the Konva stage when the text tool is selected.
2. When a click is detected, it displays an input field at the clicked position.
3. Allows the user to enter text and confirms the annotation on Enter key press or when the input loses focus.
4. Adds the text annotation to the stage through the `onAnnotationAdd` callback.

## Key Features
- Dynamic Positioning: The input field appears at the exact location where the user clicks on the stage.
- Real-time Styling: The input field reflects the selected color and font size in real-time.
- Multiple Input Methods: Supports adding annotations via Enter key or by clicking outside the input (onBlur).
- Efficient Event Handling: Uses React's useCallback and useEffect for optimized event listener management.

## State Management
- `isAdding` (boolean): Tracks whether the user is currently adding a text annotation.
- `textValue` (string): Stores the current value of the text input.
- `inputPosition` (object): Keeps track of the position where the input field should be rendered.

## Usage
```jsx
<TextAnnotation
  stageRef={stageRef}
  selectedTool={selectedTool}
  color={color}
  fontSize={fontSize}
  onAnnotationAdd={handleAnnotationAdd}
/>
```

## Implementation Details
1. Uses React hooks (useState, useCallback, useEffect) for state management and side effects.
2. Calculates the correct position for the input field by considering the stage's position relative to the viewport.
3. Creates a text node object with position, content, and styling information when adding an annotation.

## Styling
- The input field is positioned absolutely and styled inline to match the selected color and font size.
- The z-index is set high (1000) to ensure the input appears above the Konva stage.

## Notes
- The component assumes that it's used within a parent component that manages the Konva stage and overall annotation state.
- It only renders the input field when actively adding a text annotation, keeping the DOM clean when not in use.

## Best Practices
- Uses cleanup function in useEffect to remove event listeners, preventing memory leaks.
- Implements conditional rendering to only show the input when necessary, optimizing performance.
- Utilizes useCallback to memoize the click handler, preventing unnecessary re-renders.