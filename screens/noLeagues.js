import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import FormInput from '../components/formInput';
import WideButton from '../components/widebutton';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../style/screens/noLeagues';
import NavBar from '../components/navbar';

export default class NoLeagues extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  navToNewLeague = () => {
    Actions.newleague();
  }

  navToJoinLeague = () => {
    Actions.joinleague();
  }

  render() {
    return (
      <View style={styles.background}>
        <NavBar/>
        <View style={styles.buttonContent}>
          <TouchableOpacity style={styles.button} onPress={this.navToNewLeague}>
            <Text style={styles.buttonText}>CREATE A LEAGUE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.navToJoinLeague}>
          <Text style={styles.buttonText}>JOIN A LEAGUE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};
