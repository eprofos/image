# ShapeAnnotation Component

## Overview
The ShapeAnnotation component allows users to draw arrow and rectangle annotations on a Konva stage.

## Props
- `stageRef` (React.RefObject): A reference to the Konva Stage component.
- `selectedTool` (string): The currently selected annotation tool ('arrow' or 'rectangle').
- `color` (string): The color to be used for the shape annotation.
- `thickness` (number): The stroke width to be used for the shape annotation.
- `onAnnotationAdd` (function): A callback function to add the new shape annotation to the parent component's state.
- `onShapeUpdate` (function): A callback function to update the shape being drawn in real-time.

## Functionality
1. Listens for mouse/touch events on the Konva stage when the arrow or rectangle tool is selected.
2. Allows users to draw arrows or rectangles by clicking and dragging on the stage.
3. Updates the shape in real-time as the user drags the mouse.
4. Finalizes the shape annotation when the user releases the mouse button.

## Key Features
- Real-time Drawing: Shows the shape being drawn as the user drags the mouse.
- Multi-tool Support: Handles both arrow and rectangle annotations.
- Touch Support: Works with both mouse and touch events for better mobile compatibility.
- Efficient Event Handling: Uses React's useCallback and useEffect for optimized event listener management.

## State Management
- `isDrawing` (boolean): Tracks whether the user is currently drawing a shape.
- `startPoint` (object): Stores the starting coordinates of the shape being drawn.

## Usage
```jsx
<ShapeAnnotation
  stageRef={stageRef}
  selectedTool={selectedTool}
  color={color}
  thickness={thickness}
  onAnnotationAdd={handleAnnotationAdd}
  onShapeUpdate={handleShapeUpdate}
/>
```

## Implementation Details
1. Uses React hooks (useState, useEffect, useCallback) for state management and side effects.
2. Implements separate logic for arrow and rectangle drawing.
3. Calculates shape dimensions and positions based on mouse/touch movement.
4. Provides real-time updates through the `onShapeUpdate` callback.
5. Finalizes the annotation through the `onAnnotationAdd` callback.

## Event Handling
- `handleMouseDown`: Initiates the drawing process when the user starts clicking/touching.
- `handleMouseMove`: Updates the shape as the user drags the mouse/finger.
- `handleMouseUp`: Finalizes the shape and adds it as an annotation.

## Notes
- The component doesn't render anything itself (`return null`). It only handles the logic for creating shape annotations.
- It assumes that it's used within a parent component that manages the Konva stage and overall annotation state.
- The component supports both desktop (mouse) and mobile (touch) interactions.

## Best Practices
- Uses cleanup function in useEffect to remove event listeners, preventing memory leaks.
- Utilizes useCallback to memoize event handlers, preventing unnecessary re-renders.
- Separates the logic for updating the shape in real-time (`onShapeUpdate`) and adding the final annotation (`onAnnotationAdd`), allowing for a smoother user experience.

## Potential Improvements
- Add support for more shape types (e.g., circles, lines).
- Implement undo functionality for shape drawing.
- Add options for fill color and opacity for closed shapes like rectangles.