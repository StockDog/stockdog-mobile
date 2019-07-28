import {
  StyleSheet, PixelRatio, Dimensions, Platform,
} from 'react-native';
import colors from '../colors';

const { height, width } = Dimensions.get('window');
const isX = !!(Platform.OS === 'ios' && (height > 800 || width > 800));

export default StyleSheet.create({
  // ----------------- Containers ------------- //
  background: {
    flex: 1,
    backgroundColor: 'gray',
  },
  tabBar: {
    borderTopColor: colors.grey,
    borderTopWidth: 1 / PixelRatio.get(),
    height: isX ? 70 : 50,
    backgroundColor: colors.activeTab,
  },
  tabStyle: {
    paddingBottom: isX ? 20 : 0,
    paddingTop: 10,
  },
  // ----------------- Text ------------- //
  tabLabel: {
    color: colors.white,
    fontSize: 12,
    fontFamily: 'assistant',
  },
});
