import React, {useRef} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {ImageFormat, makeImageFromView} from '@shopify/react-native-skia';
import useSign from '../hooks/use-sign';
import Sign from './sign';

type Props = {
  isOpen: boolean;
  onAccept: (image: string) => void;
  onSetIsOpen: (isOpen: boolean) => void;
};

export default function SignModal(props: Props) {
  const {isOpen, onSetIsOpen, onAccept} = props;
  const {pan, paths, currentPath, setPaths} = useSign();
  const viewRef = useRef(null);

  async function handleAccept() {
    if (viewRef?.current) {
      const image = await makeImageFromView(viewRef);
      const base64Image = image?.encodeToBase64(ImageFormat.PNG, 100);

      if (base64Image) {
        onAccept(`data:image/png;base64,${base64Image}`);
        setPaths([]);
        onSetIsOpen(false);
      }
    }
  }

  function handleCancel() {
    setPaths([]);
    onSetIsOpen(!isOpen);
  }

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={handleCancel}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View
            ref={viewRef}
            collapsable={false}
            style={styles.canvasContainer}>
            <Sign currentPath={currentPath} paths={paths} pan={pan} />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={handleCancel}
              style={{...styles.button, ...styles.cancelButton}}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAccept}
              disabled={paths.length <= 0}
              style={{
                ...styles.button,
                ...styles.acceptButton,
                ...(paths.length <= 0 && {...styles.disabledButton}),
              }}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: 'white',
    width: '80%',
    height: '60%',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  canvasContainer: {
    width: '100%',
    height: '80%',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    width: '40%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#94a3b8',
  },
  acceptButton: {
    backgroundColor: '#3b82f6',
  },
  buttonText: {
    fontSize: 20,
    color: '#f1f5f9',
    fontWeight: 600,
  },
  disabledButton: {
    opacity: 0.4,
  },
});
