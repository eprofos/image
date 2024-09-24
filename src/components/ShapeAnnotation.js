import { useState, useEffect, useCallback } from 'react';

const ShapeAnnotation = ({ stageRef, selectedTool, color, thickness, onAnnotationAdd, onShapeUpdate }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e) => {
    if (selectedTool === 'arrow' || selectedTool === 'rectangle') {
      setIsDrawing(true);
      const stage = stageRef.current;
      if (stage) {
        const pointerPosition = stage.getPointerPosition();
        setStartPoint(pointerPosition);
        onShapeUpdate(null);
      }
    }
  }, [selectedTool, stageRef, onShapeUpdate]);

  const handleMouseMove = useCallback((e) => {
    if (!isDrawing) return;

    const stage = stageRef.current;
    if (stage) {
      const pointerPosition = stage.getPointerPosition();

      if (selectedTool === 'arrow') {
        const arrowNode = {
          points: [startPoint.x, startPoint.y, pointerPosition.x, pointerPosition.y],
          stroke: color,
          strokeWidth: thickness,
          type: 'arrow',
        };
        onShapeUpdate(arrowNode);
      } else if (selectedTool === 'rectangle') {
        const rectNode = {
          x: Math.min(startPoint.x, pointerPosition.x),
          y: Math.min(startPoint.y, pointerPosition.y),
          width: Math.abs(pointerPosition.x - startPoint.x),
          height: Math.abs(pointerPosition.y - startPoint.y),
          stroke: color,
          strokeWidth: thickness,
          type: 'rectangle',
        };
        onShapeUpdate(rectNode);
      }
    }
  }, [isDrawing, selectedTool, color, thickness, startPoint, onShapeUpdate, stageRef]);

  const handleMouseUp = useCallback(() => {
    if (isDrawing) {
      const stage = stageRef.current;
      if (stage) {
        const pointerPosition = stage.getPointerPosition();
        let finalShape;

        if (selectedTool === 'arrow') {
          finalShape = {
            points: [startPoint.x, startPoint.y, pointerPosition.x, pointerPosition.y],
            stroke: color,
            strokeWidth: thickness,
            type: 'arrow',
          };
        } else if (selectedTool === 'rectangle') {
          finalShape = {
            x: Math.min(startPoint.x, pointerPosition.x),
            y: Math.min(startPoint.y, pointerPosition.y),
            width: Math.abs(pointerPosition.x - startPoint.x),
            height: Math.abs(pointerPosition.y - startPoint.y),
            stroke: color,
            strokeWidth: thickness,
            type: 'rectangle',
          };
        }

        if (finalShape) {
          onAnnotationAdd(finalShape);
        }
      }
    }
    setIsDrawing(false);
    onShapeUpdate(null);
  }, [isDrawing, selectedTool, color, thickness, startPoint, onAnnotationAdd, onShapeUpdate, stageRef]);

  useEffect(() => {
    const stage = stageRef.current;
    if (stage) {
      stage.on('mousedown touchstart', handleMouseDown);
      stage.on('mousemove touchmove', handleMouseMove);
      stage.on('mouseup touchend', handleMouseUp);
    }
    return () => {
      if (stage) {
        stage.off('mousedown touchstart', handleMouseDown);
        stage.off('mousemove touchmove', handleMouseMove);
        stage.off('mouseup touchend', handleMouseUp);
      }
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, stageRef]);

  return null;
};

export default ShapeAnnotation;