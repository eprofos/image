import React from 'react';

const AnnotationTools = ({ 
  selectedTool, 
  setSelectedTool, 
  color, 
  setColor, 
  fontSize, 
  setFontSize, 
  thickness, 
  setThickness,
  onUndo,
  canUndo,
  hasImage
}) => {
  return (
    <div className="annotation-tools">
      <div className="tool-buttons">
        <button
          className={`tool-button ${selectedTool === 'text' ? 'active' : ''}`}
          onClick={() => setSelectedTool('text')}
          disabled={!hasImage}
        >
          Text
        </button>
        <button
          className={`tool-button ${selectedTool === 'arrow' ? 'active' : ''}`}
          onClick={() => setSelectedTool('arrow')}
          disabled={!hasImage}
        >
          Arrow
        </button>
        <button
          className={`tool-button ${selectedTool === 'rectangle' ? 'active' : ''}`}
          onClick={() => setSelectedTool('rectangle')}
          disabled={!hasImage}
        >
          Rectangle
        </button>
        {canUndo && (
          <button
            className="tool-button"
            onClick={onUndo}
            title="Undo last annotation"
          >
            Undo
          </button>
        )}
      </div>
      <div className="tool-options">
        <label>
          Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            title="Choose color"
            disabled={!hasImage}
          />
        </label>
        {selectedTool === 'text' && (
          <label>
            Font Size:
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              min="8"
              max="72"
              title="Font size"
              disabled={!hasImage}
            />
          </label>
        )}
        {(selectedTool === 'arrow' || selectedTool === 'rectangle') && (
          <label>
            Thickness:
            <input
              type="number"
              value={thickness}
              onChange={(e) => setThickness(parseInt(e.target.value))}
              min="1"
              max="20"
              title="Line thickness"
              disabled={!hasImage}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default AnnotationTools;