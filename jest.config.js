module.exports = {
  preset: 'react-native',
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './node_modules/@shopify/react-native-skia/jestSetup.js',
  ],
  testEnvironment: 'node',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@shopify/react-native-skia|react-native-reanimated|react-native-gesture-handler)/)',
  ],
};
