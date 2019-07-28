import {
  StyleSheet, Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  // ----------------- Containers ------------- //
  iconHeaders: {
    height: height * 0.1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
