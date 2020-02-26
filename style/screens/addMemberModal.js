import { StyleSheet } from 'react-native';
import colors from '../colors';

export default StyleSheet.create({
  // ----------------- Containers ------------- //
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inviteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bright,
    width: '80%',
    height: 45,
    borderRadius: 25,
  },
  // ----------------- Text ------------- //
  inviteCodeText: {
    textAlign: 'center',
    fontFamily: 'assistant',
    fontSize: 20,
    color: colors.black,
    paddingBottom: 10,
  },
  inviteCodeDescription: {
    textAlign: 'center',
    fontFamily: 'assistant',
    fontSize: 15,
    color: colors.black,
    paddingBottom: 5,
    padding: 10
  },
  buttonText: {
    color: colors.white,
    fontFamily: 'assistant-light',
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15
  }
});
