import { StyleSheet, Dimensions } from 'react-native';
import colors from '../colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.dark,
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
  iconHeaders: {
    flex: 0.1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    flex: 0.55,
    marginTop: height * 0.05,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  formBuffer: {
    flex: 0.1,
  },
  submitButton: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datepicker: {
    width: width * 0.7,
  },
  dateInput: {
    flex: 0.7,
    alignItems: 'flex-start',
    borderWidth: 0,
  },
  // ----------------- Text ------------- //
  title: {
    fontFamily: 'assistant',
    fontSize: 42,
    color: colors.white,
  },
  datePlaceholderText: {
    fontFamily: 'assistant',
    fontSize: 18,
    textAlign: 'left',
    color: colors.lightGrey,
  },
  dateText: {
    fontFamily: 'assistant',
    textAlign: 'left',
    fontSize: 18,
    color: colors.lightGrey,
  },
});
