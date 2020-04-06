import React from 'react';
import { connect } from 'react-redux';
import {
  Text, TouchableOpacity, View, Modal
} from 'react-native';
import * as SMS from 'expo-sms';
import { Feather } from '@expo/vector-icons';
import styles from '../style/screens/addMemberModal';

const AddMemberModal = ({ league, visible, toggleModal }) => {
  const openTextMessage = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const bodyText = `Join my league on StockDog! Use invite code ${league.inviteCode} to join the ${league.name} league.`;
      await SMS.sendSMSAsync([], bodyText);
    } else {
      alert("Text messaging unavailable on this device");
    }
  }

  return (
    <View>
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.baseModalContainer}>
          <View style={styles.baseModal}>
            <View style={styles.modalHeaders}>
              <TouchableOpacity onPress={toggleModal}>
                <Feather name="x" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.inviteCodeText}>
                Invite Code
              </Text>
              <Text style={styles.inviteCodeText} selectable>
                {league.inviteCode}
              </Text>
              <TouchableOpacity style={styles.inviteButton} onPress={openTextMessage}>
                <Text style={styles.buttonText}>
                  Send to friends
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}


const mapStateToProps = (state) => ({
  league: state.portfolioAndLeague.league
});

export default connect(mapStateToProps)(AddMemberModal);
