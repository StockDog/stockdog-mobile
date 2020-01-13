import { StyleSheet } from 'react-native';
import colors from '../colors';

export default StyleSheet.create({
  // ----------------- Containers ------------- //
  background: {
    flex: 1,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
  },
  logo: {
    width: 305,
    height: 260,
  },
  googleLogin: {
    width: 250,
    resizeMode: 'contain',
  },
  smallTextButton: {
    height: 25,
    backgroundColor: 'transparent',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popoverButton: {
    width: 48,
    height: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: -15,
  },
  roundedInput: {
    color: '#fff',
    height: 45,
    width: 250,
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderColor: colors.placeholders,
    margin: 10,
    fontFamily: 'assistant',
    fontSize: 18,
  },
  appleLoginBtn: {
    marginTop: 20,
    width: 245,
    height: 55,
  },
  // ----------------- Text ------------- //
  title: {
    color: colors.bright,
    fontFamily: 'assistant',
    fontSize: 56,
    backgroundColor: 'transparent',
  },
  smallText: {
    fontSize: 16,
    fontFamily: 'assistant',
    color: colors.bright,
    textDecorationLine: 'underline',
  },
});
