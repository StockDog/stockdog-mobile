import { StyleSheet } from 'react-native';
import colors from '../colors';

export default StyleSheet.create({
  // ----------------- Containers ------------- //
  baseModalContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  baseModal: {
    flex: 0.3,
    backgroundColor: colors.grey,
    width: '80%',
    shadowColor: colors.trueBlack,
    shadowOpacity: 75,
    shadowOffset: {
      height: 3,
    },
    borderRadius: 10,
  },
  modalHeaders: {
    flex: 0.2,
    width: '90%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  modalBody: {
    flex: 0.8,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'flex-start'
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
    color: colors.white,
    paddingBottom: 10,
  },
  inviteCodeDescription: {
    textAlign: 'center',
    fontFamily: 'assistant',
    fontSize: 15,
    color: colors.white,
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
