import React, { useState, useCallback, useEffect } from 'react';

const TextAnnotation = ({ stageRef, selectedTool, color, fontSize, onAnnotationAdd }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 });

  const handleStageClick = useCallback((e) => {
    if (selectedTool === 'text' && !isAdding) {
      const stage = stageRef.current;
      if (stage) {
        const pointerPosition = stage.getPointerPosition();
        const stageRect = stage.container().getBoundingClientRect();
        setInputPosition({
          x: pointerPosition.x + stageRect.left,
          y: pointerPosition.y + stageRect.top
        });
        setIsAdding(true);
      }
    }
  }, [selectedTool, isAdding, stageRef]);

  useEffect(() => {
    const stage = stageRef.current;
    if (stage) {
      stage.on('click', handleStageClick);
    }
    return () => {
      if (stage) {
        stage.off('click', handleStageClick);
      }
    };
  }, [handleStageClick, stageRef]);

  const handleInputChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTextAnnotation();
    }
  };

  const addTextAnnotation = () => {
    if (textValue.trim() !== '') {
      const stage = stageRef.current;
      if (stage) {
        const stageRect = stage.container().getBoundingClientRect();
        const textNode = {
          x: inputPosition.x - stageRect.left,
          y: inputPosition.y - stageRect.top,
          text: textValue,
          fontSize: fontSize,
          fill: color,
          type: 'text',
        };
        onAnnotationAdd(textNode);
        setTextValue('');
        setIsAdding(false);
      }
    }
  };

  return (
    <>
      {isAdding && (
        <input
          type="text"
          value={textValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={addTextAnnotation}
          autoFocus
          style={{
            position: 'absolute',
            top: `${inputPosition.y}px`,
            left: `${inputPosition.x}px`,
            zIndex: 1000,
            fontSize: `${fontSize}px`,
            color: color,
          }}
        />
      )}
    </>
  );
};

export default TextAnnotation;