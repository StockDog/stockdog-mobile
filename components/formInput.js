import React, { Component } from 'react';
import { TextInput } from 'react-native';
import styles from '../style/screens/loginRegister';
import colors from '../style/colors';

// Input component for form pages like Login and Register
// Props:
//    type: string indicating what type of input and the placeholder
//    onchange: function that will update the state of parent component
//    value: model for the input value
//    returnKeyType: what the return key will look like
//    refer: reference for tab control if necessary
//    onSubmitEditing: behavior for submitting input value
export default class FormInput extends Component {
  render() {
    const {
      type,
      onchange,
      value,
      returnKeyType,
      refer,
      onSubmitEditing,
    } = this.props;
    const secure = type === 'password';
    return (
      <TextInput
        style={styles.roundedInput}
        autoCorrect={false}
        placeholder={type}
        secureTextEntry={secure}
        placeholderTextColor={colors.placeholders}
        onChangeText={onchange}
        value={value}
        blurOnSubmit={false}
        returnKeyType={returnKeyType}
        ref={refer}
        onSubmitEditing={onSubmitEditing}
        autoCapitalize="none"
      />
    );
  }
}
