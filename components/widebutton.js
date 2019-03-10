import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../style/components/widebutton';

export default class WideButton extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      var buttonText = "";
      var style = styles.loginButton;
      switch (this.props.type) {
         case 'login':
            buttonText = 'LOGIN';
            break;
         case 'register':
            buttonText = 'REGISTER';
            break;
         case 'buy':
            buttonText = 'BUY';
            break;
         case 'sell':
            buttonText = 'SELL';
            style = styles.sellModalButton;
            break;
         case 'portfolio':
            buttonText = 'Next';
            break;
         case 'join':
            buttonText = 'Join league!';
            break;
         case 'cancel':
            buttonText = 'Cancel';
            style = styles.cancelButton;
            break;
         case 'logout':
            buttonText = 'LOGOUT';
            break;
      }

      if (this.props.disabled) {
         style = styles.disabledLoginButton;
      };

      return (
         <TouchableOpacity
            style={style}
            onPress={this.props.onpress}
            disabled={this.props.disabled}
         >
            <Text style={styles.wideButton}>{buttonText}</Text>
         </TouchableOpacity>
      );
   }
};