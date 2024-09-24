# AnnotationTools Component

## Overview
The AnnotationTools component provides a user interface for selecting and configuring annotation tools in an image annotation application.

## Props
- `selectedTool` (string): The currently selected annotation tool.
- `setSelectedTool` (function): Function to update the selected tool.
- `color` (string): The current color selected for annotations.
- `setColor` (function): Function to update the selected color.
- `fontSize` (number): The current font size for text annotations.
- `setFontSize` (function): Function to update the font size.
- `thickness` (number): The current line thickness for arrow and rectangle annotations.
- `setThickness` (function): Function to update the line thickness.
- `onUndo` (function): Function to undo the last annotation.
- `canUndo` (boolean): Indicates whether there are annotations that can be undone.

## Functionality
1. Provides buttons to select different annotation tools: Text, Arrow, and Rectangle.
2. Offers an Undo button to remove the last annotation.
3. Allows users to choose the color for annotations using a color picker.
4. For text annotations, provides an input to set the font size.
5. For arrow and rectangle annotations, provides an input to set the line thickness.

## Usage
The component renders a set of buttons for tool selection and a panel for configuring tool options. It updates the parent component's state when the user interacts with these controls.

## Key Features
- Active tool highlighting: The selected tool button is highlighted with an 'active' class.
- Dynamic options: The font size input is only shown when the text tool is selected, while the thickness input is shown for arrow and rectangle tools.
- Undo functionality: The Undo button is disabled when there are no annotations to undo.
- Tooltips: Provides helpful tooltips for color, font size, and line thickness inputs.

## Notes
- The component uses React hooks implicitly (through the props passed to it) for state management.
- Console logs are included for debugging purposes, showing when the component renders and the current thickness value.