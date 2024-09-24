import React, { useState, useRef, useCallback } from 'react';
import { Stage, Layer, Image, Arrow, Rect, Text } from 'react-konva';
import ImageImport from './components/ImageImport';
import AnnotationTools from './components/AnnotationTools';
import TextAnnotation from './components/TextAnnotation';
import ShapeAnnotation from './components/ShapeAnnotation';
import DownloadButton from './components/DownloadButton';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [annotationHistory, setAnnotationHistory] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [color, setColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(16);
  const [thickness, setThickness] = useState(2);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const stageRef = useRef(null);

  const handleImageLoad = useCallback((img, width, height) => {
    setImage(img);
    setOriginalWidth(width);
    setOriginalHeight(height);
  }, []);

  const handleAnnotationAdd = useCallback((annotation) => {
    setAnnotations((prevAnnotations) => {
      const newAnnotations = [...prevAnnotations, annotation];
      setAnnotationHistory((prevHistory) => [...prevHistory, newAnnotations]);
      return newAnnotations;
    });
    setCurrentShape(null);
  }, []);

  const handleUndo = useCallback(() => {
    if (annotationHistory.length > 1) {
      const newHistory = annotationHistory.slice(0, -1);
      setAnnotationHistory(newHistory);
      setAnnotations(newHistory[newHistory.length - 1]);
    } else if (annotationHistory.length === 1) {
      setAnnotationHistory([]);
      setAnnotations([]);
    }
  }, [annotationHistory]);

  const handleShapeUpdate = useCallback((shape) => {
    setCurrentShape(shape);
  }, []);

  const maxWidth = 800;
  const maxHeight = 600;

  const getScaledDimensions = (width, height) => {
    if (width > maxWidth || height > maxHeight) {
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      return { width: width * ratio, height: height * ratio };
    }
    return { width, height };
  };

  return (
    <div className="App">
      <h1>Image Annotation App</h1>
      <div className="app-container">
        <div className="toolbar">
          <ImageImport onImageLoad={handleImageLoad} />
          <AnnotationTools
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
            color={color}
            setColor={setColor}
            fontSize={fontSize}
            setFontSize={setFontSize}
            thickness={thickness}
            setThickness={setThickness}
            onUndo={handleUndo}
            canUndo={annotationHistory.length > 0}
            hasImage={!!image}
          />
          <DownloadButton 
            stageRef={stageRef} 
            isImageLoaded={!!image} 
            originalWidth={originalWidth}
            originalHeight={originalHeight}
          />
        </div>
        <div className="canvas-container">
          {image && (
            <Stage
              {...getScaledDimensions(originalWidth, originalHeight)}
              ref={stageRef}
            >
              <Layer>
                <Image
                  image={image}
                  width={getScaledDimensions(originalWidth, originalHeight).width}
                  height={getScaledDimensions(originalWidth, originalHeight).height}
                />
                {annotations.map((annotation, i) => {
                  if (annotation.type === 'text') {
                    return <Text key={i} {...annotation} />;
                  } else if (annotation.type === 'arrow') {
                    return <Arrow key={i} {...annotation} />;
                  } else if (annotation.type === 'rectangle') {
                    return <Rect key={i} {...annotation} />;
                  }
                  return null;
                })}
                {currentShape && (
                  currentShape.type === 'arrow' ? (
                    <Arrow {...currentShape} />
                  ) : currentShape.type === 'rectangle' ? (
                    <Rect {...currentShape} />
                  ) : null
                )}
              </Layer>
            </Stage>
          )}
        </div>
      </div>
      <TextAnnotation
        stageRef={stageRef}
        selectedTool={selectedTool}
        color={color}
        fontSize={fontSize}
        onAnnotationAdd={handleAnnotationAdd}
      />
      <ShapeAnnotation
        stageRef={stageRef}
        selectedTool={selectedTool}
        color={color}
        thickness={thickness}
        onAnnotationAdd={handleAnnotationAdd}
        onShapeUpdate={handleShapeUpdate}
      />
    </div>
  );
}

export default App;
