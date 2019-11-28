import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  // ----------------- Containers ------------- //
  chartContainer: {
    height: height * 0.3,

    width: width * 0.85,
    opacity: 0.95,
    borderRadius: 10,
  },
  webView: {
    borderRadius: 10,
  },
});
