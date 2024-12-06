import React from 'react';
import SignScreen from './screens/sign-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

export default function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SignScreen />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
