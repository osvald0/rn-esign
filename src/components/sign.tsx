import React from 'react';
import {StyleSheet} from 'react-native';
import {Canvas, Path, SkPath} from '@shopify/react-native-skia';
import {GestureDetector, PanGesture} from 'react-native-gesture-handler';

type Props = {
  pan: PanGesture;
  paths: Array<SkPath>;
  currentPath: SkPath | null;
};

export default function Sign(props: Props) {
  const {pan, paths, currentPath} = props;

  return (
    <GestureDetector gesture={pan}>
      <Canvas style={styles.canvas}>
        {paths.map((path: SkPath, index: number) => (
          <Path
            key={index}
            path={path}
            strokeWidth={2}
            style="stroke"
            color="#000000"
          />
        ))}
        {currentPath && (
          <Path
            path={currentPath}
            strokeWidth={2}
            style="stroke"
            color="#000000"
          />
        )}
      </Canvas>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  canvas: {
    width: '100%',
    height: '100%',
  },
});
