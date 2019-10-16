import { StyleSheet } from 'react-native';
import colors from '../colors';

export default StyleSheet.create({
  /* Modal stuff */
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  modal: {
    flex: 0.7,
    backgroundColor: colors.white,
    width: '90%',
    shadowColor: colors.black,
    shadowOpacity: 75,
    shadowOffset: {
      height: 7,
    },
    borderRadius: 10,
  },
  leagueList: {
    flex: 0.9,
    display: 'flex',
    flexDirection: 'column',
  },
  cancelBtn: {
    marginTop: 5,
    marginBottom: 10,
    flex: 0.1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  /* List stuff */
  listLeagueItem: {
    padding: 20,
    color: colors.white,
  },
  listLeagueSeparator: {
    height: 1,
    width: '90%',
    backgroundColor: colors.ultraLightGrey,
    marginLeft: '5%',
  },
  listTitle: {
    fontFamily: 'assistant-bold',
    fontSize: 24,

  },
  listDetails: {
    color: colors.grey,
  },
});
