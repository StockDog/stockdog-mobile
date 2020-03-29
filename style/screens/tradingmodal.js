import { StyleSheet, Dimensions } from 'react-native';
import colors from '../colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  // ----------------- Containers ------------- //
  outermostBaseContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseModal: {
    flex: 0.6,
    right: 0,
    left: 0,
  },
  modalHeaders: {
    flex: 0.1,
    width: '90%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  innerModal: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  outerModal: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.grey,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOpacity: 75,
    shadowOffset: {
      height: 3,
    },
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
    backgroundColor: colors.ultraLightGrey,
    borderColor: colors.grey,
    borderRadius: 8,
    paddingLeft: 20,
  },
  total: {
    flex: 0.1,
    justifyContent: 'center',
  },
  executeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bright,
    borderRadius: 8,
    height: '40%',
    width: '100%',
  },
  disabledExecuteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 8,
    height: '40%',
    width: '100%',
  },
  execute: {
    flex: 0.2,
    width: '60%',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
