import { StyleSheet, Dimensions } from 'react-native';
import colors from '../colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  // ----------------- Containers ------------- //
  profileBackground: {
    flex: 1,
    backgroundColor: colors.dark,
    justifyContent: 'flex-start',
  },
  profileBackgroundCircle: {
    flex: 0,
    backgroundColor: colors.bright,
    width: width * 4,
    height: height * 1.82,
    position: 'absolute',
    top: height * -1.25,
    right: width * -1.1,
    zIndex: -1,
    borderBottomLeftRadius: 1978 / 2,
    borderBottomRightRadius: 1978 / 2,
  },
  portfolioInfo: {
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateRangeButtonGroup: {
    marginTop: 10,
    height: height * 0.05,
    width: width * 0.8,
    borderWidth: 1,
    borderColor: colors.bright,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  buttonGroupSelected: {
    backgroundColor: colors.bright,
  },
  listingItem: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 15,
  },
  horizontalEdges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  portfolioStockList: {
    flex: 0.4,
    justifyContent: 'flex-start',
    width: '90%',
    alignItems: 'flex-start',
  },
  portfolioStockListHeader: {
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  portfolioListGroup: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
  // ----------------- Text ------------- //
  value: {
    color: colors.white,
    fontFamily: 'assistant',
    fontSize: 36,
    textAlign: 'center',
  },
  leagueTitle: {
    color: colors.white,
    fontFamily: 'assistant',
    fontSize: 24,
    textAlign: 'center',
  },
  dates: {
    color: colors.white,
    fontFamily: 'assistant',
    fontSize: 14,
    textAlign: 'center',
  },
  whiteText: {
    color: colors.white,
  },
  greenValue: {
    color: colors.green,
    fontFamily: 'assistant',
    fontSize: 18,
    textAlign: 'left',
  },
  redValue: {
    color: colors.red,
    fontFamily: 'assistant',
    fontSize: 18,
    textAlign: 'left',
  },
  listingTickerAndValue: {
    color: colors.white,
    fontFamily: 'assistant',
    fontSize: 18,
    textAlign: 'left',
  },
  smallListingText: {
    color: colors.darkGrey,
    fontFamily: 'assistant',
    fontSize: 10,
    textAlign: 'left',
  },
  portfolioStockListHeaderText: {
    color: colors.bright,
    fontFamily: 'assistant',
    fontSize: 20,
    textAlign: 'left',
  },
});
