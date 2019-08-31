import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../style/components/widebutton';

const WideButton = ({ type, disabled, onpress }) => {
  let buttonText = '';
  let style = styles.loginButton;
  switch (type) {
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
  case 'addLeague':
    buttonText = 'Create league';
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
  default:
    buttonText = 'CLICK';
    break;
  }

  if (disabled) {
    style = styles.disabledLoginButton;
  }

  return (
    <TouchableOpacity
      style={style}
      onPress={onpress}
      disabled={disabled}
    >
      <Text style={styles.wideButton}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default WideButton;
