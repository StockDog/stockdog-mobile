import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../colors';

const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
  // ----------------- Containers ------------- //
  chartContainer: {
    height: height * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grey,
    width: width * 0.85,
    opacity: 0.95,
    borderRadius: 10,
  },
  chart: {
    height: height * 0.3,
    width: width * 0.8,
    backgroundColor: 'transparent'
  }
});