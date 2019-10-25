import { StyleSheet } from 'react-native';
import colors from '../colors';

export default StyleSheet.create({
  // ----------------- Containers ------------- //
  loginButton: {
    height: 45,
    width: 250,
    borderColor: colors.bright,
    borderWidth: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  sellModalButton: {
    height: 45,
    width: 250,
    backgroundColor: colors.red,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  disabledLoginButton: {
    height: 45,
    width: 250,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  cancelButton: {
    height: 45,
    width: 250,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  darkCancelButton: {
    height: 45,
    // width: 250,
    borderColor: colors.lightGrey,
    backgroundColor: colors.lightGrey,
    color: colors.green,
    borderWidth: 1,
    borderRadius: 25,
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ----------------- Text ------------- //
  wideButton: {
    fontSize: 20,
    color: colors.white,
    fontFamily: 'assistant',
  },
});
