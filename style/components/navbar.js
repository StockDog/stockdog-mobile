import { StyleSheet, PixelRatio, Dimensions, Platform } from 'react-native';
import { colors } from '../colors';

const { height, width } = Dimensions.get("window");

export default tabStyle = StyleSheet.create({
  // ----------------- Containers ------------- //
  iconHeaders: {
    height: height * 0.1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  }
});