import { StyleSheet, Dimensions } from 'react-native';
import colors from '../colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.dark,
  },
  buttonContent: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: width * 0.7,
    height: 45,
    backgroundColor: colors.bright,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  homeButton: {
    width: width * 0.7,
    height: 45,
    backgroundColor: colors.lightGrey,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
  },
  // ----------------- Text ------------- //
  buttonText: {
    fontFamily: 'assistant',
    fontSize: 24,
    color: colors.white,
  },
});
