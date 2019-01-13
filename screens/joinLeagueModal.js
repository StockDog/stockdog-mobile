import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import FormInput from '../components/formInput';
import WideButton from '../components/widebutton';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../style/screens/joinLeague';
import NavBar from '../components/navbar';
import { joinLeague } from '../api';

export default class JoinLeagueModal extends Component {
   constructor(props) {
      super(props);
      this.state = {
         inviteCode: "",
         buyPower: "",
         nickname: ""
      };
   }

   close = () => {
      Actions.pop();
   }

   submitJoinLeague = () => {
      joinLeague(this.state.inviteCode, parseInt(this.state.buyPower), 'sigal\'s league').then((res) => {
         if (res.valid) {
            Actions.setnickname({ league: res.league, inviteCode: this.state.inviteCode });
         }
         else {
            alert("Invite code not found.");
         }
      }).catch((err) => {
         console.log(err.response);
      });
   }

   render() {
      var notFound;
      if (this.state.notFound) {
         notFound = <Text style={styles.joinLeagueWarning}> League Not Found </Text>
      }
      return (
         <View style={styles.background}>
            <View style={styles.backgroundCircle}></View>
            <NavBar />
            <View style={styles.titleContainer}>
               <Text style={styles.title}> Join a League </Text>
            </View>
            <View style={styles.contentContainer}>
               <FormInput
                  type="Invite Code"
                  onchange={(code) => { this.setState({ inviteCode: code }) }}
                  value={this.state.inviteCode} />
               <FormInput
                  type="Buy Power"
                  onchange={(bp) => { this.setState({ buyPower: bp }) }}
                  value={this.state.buyPower} />
               <FormInput
                  type="Your nickname"
                  onchange={(name) => { this.setState({ nickname: name }) }}
                  value={this.state.nickname} />
               <WideButton type="portfolio" onpress={this.submitJoinLeague} />
               {notFound}
            </View>
         </View>
      );
   }
};
