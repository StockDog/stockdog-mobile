import { StyleSheet } from 'react-native';
import colors from '../colors';

export default StyleSheet.create({
  // ----------------- Containers ------------- //
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  // ----------------- Text ------------- //
  inviteCodeText: {
    textAlign: 'center',
    fontFamily: 'assistant',
    fontSize: 20,
    color: colors.black,
    paddingBottom: 10,
  }
});
