import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text, TouchableOpacity, View,
} from 'react-native';
import Lightbox from '../components/baseLightbox';
import styles from '../style/screens/addMemberModal';

class LeagueSummaryModal extends Component {

  render() {
    const { league } = this.props;
    return (
      <Lightbox verticalPercent={0.3} horizontalPercent={0.8} verticalPadding={100}>
        <View style={styles.background}>
          <Text style={styles.inviteCodeText}>
            hi
          </Text>
        </View>
      </Lightbox>
    );
  }
}

const mapStateToProps = (state) => ({
  league: state.portfolioAndLeague.league
});

export default connect(mapStateToProps)(LeagueSummaryModal);
