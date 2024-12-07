import React, { useState } from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import SignModal from '../components/sign-modal';

export default function SignScreen(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSignature, setCurrentSignature] = useState<string | null>(null);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.signatureContainer}>
          {currentSignature ? (
            <Image style={styles.image} source={{ uri: currentSignature }} />
          ) : (
            <Text style={styles.signaturePlaceholder}>
              No current signature
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.signButton}
          onPress={() => setIsModalOpen(true)}>
          <Text style={styles.buttonText}>Sign here!</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <SignModal
        isOpen={isModalOpen}
        onSetIsOpen={setIsModalOpen}
        onAccept={setCurrentSignature}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signatureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '50%',
    borderWidth: 2,
    borderColor: '#94a3b8',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  signaturePlaceholder: {
    fontSize: 24,
    fontWeight: '600',
    color: '#94a3b8',
  },
  signButton: {
    width: '80%',
    height: 48,
    backgroundColor: '#075985',
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#f8fafc',
    fontWeight: '600',
    fontSize: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
