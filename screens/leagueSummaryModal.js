import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  // TouchableOpacity, 
  View,
} from 'react-native';
import styles from '../style/screens/addMemberModal';

const LeagueSummaryModal = () => {
  return (
    <View style={styles.background}>
      <Text style={styles.inviteCodeText}>
        hello!
      </Text>
    </View>
  )
}

const mapStateToProps = (state) => ({
  league: state.portfolioAndLeague.league
});

export default connect(mapStateToProps)(LeagueSummaryModal);
