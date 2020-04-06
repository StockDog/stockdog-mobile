import { StyleSheet, Dimensions } from 'react-native';
import colors from '../colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  // ----------------- Containers ------------- //
  outermostBaseContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  baseModal: {
    flex: 0.7,
    backgroundColor: colors.grey,
    width: '90%',
    shadowColor: colors.black,
    shadowOpacity: 75,
    shadowOffset: {
      height: 7,
    },
    borderRadius: 10,
  },
  modalHeaders: {
    flex: 0.1,
    width: '90%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  tradingButtonGroup: {
    height: height * 0.05,
    width: '60%',
    borderWidth: 2,
    borderColor: colors.bright,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  buttonGroupSelected: {
    backgroundColor: colors.bright,
  },
  buyingPower: {
    flex: 0.2,
  },
  inputs: {
    flex: 0.3,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  amountInput: {
    width: width * 0.3,
    height: 48,
    borderColor: colors.ultraLightGrey,
    borderBottomWidth: 1,
    borderRadius: 8
  },
  total: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  executeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bright,
    borderRadius: 8,
    height: '40%',
    width: '60%',
  },
  disabledExecuteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 8,
    height: '40%',
    width: '60%',
  },
  execute: {
    flex: 0.2,
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successMessage: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 10
  },
  // ----------------- Text ------------- //
  buyingPowerText: {
    textAlign: 'center',
    fontFamily: 'assistant',
    fontSize: 20,
    color: colors.white,
    paddingBottom: 5,
  },
  totalText: {
    fontFamily: 'assistant',
    fontSize: 36,
    color: colors.white,
  },
  buttonText: {
    color: colors.white
  },
  executeButtonText: {
    fontFamily: 'assistant',
    fontSize: 20,
    color: colors.white,
  },
  disabledExecuteButtonText: {
    fontFamily: 'assistant',
    fontSize: 20,
    color: colors.white,
  },
  successMessageText: {
    textAlign: 'center',
    fontFamily: 'assistant',
    fontSize: 36,
    color: colors.white,
  },
});
