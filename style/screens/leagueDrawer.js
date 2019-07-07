import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../colors.js';

const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  portfolioList: {
    flex: 0.75,
    marginTop: height * 0.1,
  },
  portfolioListItem: {
    height: height * 0.1,
    flexDirection: 'row',
  },
  chosenMark: {
    width: 10,
    backgroundColor: colors.bright,
    borderRadius: 10,
  },
  regularMark: {
    width: 10,
    backgroundColor: colors.dark,
    borderRadius: 10,
  },
  portfolioText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 0.1,
    alignItems: 'center',
  },
  addLeagueButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bright,
    width: '80%',
    height: 45,
    borderRadius: 25,
  },
  // ----------------- Text ------------- //
  portfolioTitle: {
    color: colors.white,
    fontFamily: 'assistant',
    fontSize: 28,
  },
  portfolioValue: {
    color: colors.white,
    fontFamily: 'assistant',
    fontSize: 18,
  },
  buttonText: {
    color: colors.white,
    fontFamily: 'assistant-light',
    fontSize: 24,
  },
});
