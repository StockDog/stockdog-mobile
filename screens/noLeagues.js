import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../style/screens/noLeagues';
import NavBar from '../components/navbar';
import WideButton from '../components/widebutton';

export default class NoLeagues extends Component {
  navToNewLeague = () => {
    Actions.newLeague();
  };

  navToJoinLeague = () => {
    Actions.joinLeague();
  };

  navToHome = () => {
    Actions.portfolio();
  };

  render() {
    const { homeable } = this.props;
    return (
      <View style={styles.background}>
        <NavBar />
        <View style={styles.buttonContent}>
          <TouchableOpacity style={styles.button} onPress={this.navToNewLeague}>
            <Text style={styles.buttonText}>Create A League</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.navToJoinLeague}
          >
            <Text style={styles.buttonText}>Join A League</Text>
          </TouchableOpacity>
          {homeable ? (
            <WideButton type="cancel" onpress={this.navToHome} />
          ) : null}
        </View>
      </View>
    );
  }
}
