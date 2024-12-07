import { useState } from 'react';
import { runOnJS } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { SkPath, Skia } from '@shopify/react-native-skia';

export default function useSign() {
  const [paths, setPaths] = useState<Array<SkPath>>([]);
  const [currentPath, setCurrentPath] = useState<SkPath | null>(null);

  const onDrawingStart = (x: number, y: number) => {
    const path = Skia.Path.Make();
    path.moveTo(x, y);
    setCurrentPath(path);
  };

  const onDrawingActive = (x: number, y: number) => {
    if (currentPath) {
      const newPath = currentPath.copy();
      newPath.lineTo(x, y);
      setCurrentPath(newPath);
    }
  };

  const onDrawingFinished = () => {
    if (currentPath) {
      setPaths((prevPaths) => [...prevPaths, currentPath]);
      setCurrentPath(null);
    }
  };

  const pan = Gesture.Pan()
    .onStart((event) => {
      runOnJS(onDrawingStart)(event.x, event.y);
    })
    .onUpdate((event) => {
      runOnJS(onDrawingActive)(event.x, event.y);
    })
    .onEnd(() => {
      runOnJS(onDrawingFinished)();
    });

  const reset = () => {
    setCurrentPath(null);
    setPaths([]);
  };

  return {
    pan,
    paths,
    reset,
    currentPath,
    setPaths,
  };
}
