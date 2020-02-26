import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text, TouchableOpacity, View,
} from 'react-native';
import * as SMS from 'expo-sms';
import Lightbox from '../components/baseLightbox';
import styles from '../style/screens/addMemberModal';

class AddMemberModal extends Component {

  openTextMessage = async () => {
    const { league } = this.props;
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const bodyText = `Join my league on StockDog! Use invite code ${league.inviteCode} to join the ${league.name} league.`;
      await SMS.sendSMSAsync([], bodyText);
    } else {
      // misfortune... there's no SMS available on this device
      alert("Text messaging unavailable on this device");
    }
  }

  render() {
    const { league } = this.props;
    return (
      <Lightbox verticalPercent={0.3} horizontalPercent={0.8} verticalPadding={100}>
        <View style={styles.background}>
          <Text style={styles.inviteCodeText}>
            Invite Code
          </Text>
          <Text style={styles.inviteCodeText} selectable> 
            { league.inviteCode }
          </Text>
          <TouchableOpacity style={styles.inviteButton} onPress={this.openTextMessage}>
            <Text style={styles.buttonText}>
              Send to friends
            </Text>
          </TouchableOpacity>
        </View>
      </Lightbox>
    );
  }
}

const mapStateToProps = (state) => ({
  league: state.portfolioAndLeague.league
});

export default connect(mapStateToProps)(AddMemberModal);
