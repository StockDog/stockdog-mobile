import { StyleSheet, Dimensions } from 'react-native';
import colors from '../colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.dark,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconHeaders: {
    flex: 0.1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  backgroundCircle: {
    flex: 0,
    backgroundColor: colors.bright,
    width: width * 4,
    height: height * 1.82,
    position: 'absolute',
    top: height * -1.55,
    right: width * -1.1,
    zIndex: -1,
    borderBottomLeftRadius: 1978 / 2,
    borderBottomRightRadius: 1978 / 2,
  },
  titleContainer: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 0.75,
    paddingTop: height * 0.05,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputsContainer: {
    flex: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  // ----------------- Text ------------- //
  title: {
    fontFamily: 'assistant-semibold',
    fontSize: 36,
    color: colors.white,
  },
  joinLeagueWarning: {
    color: colors.red,
    fontFamily: 'assistant',
    fontSize: 14,
    paddingTop: 10,
  },
  smallTextButton: {
    height: 25,
    backgroundColor: 'transparent',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallText: {
    fontSize: 16,
    fontFamily: 'assistant',
    color: colors.bright,
    textDecorationLine: 'underline',
  },
});
