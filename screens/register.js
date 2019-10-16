import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import PopoverTooltip from 'react-native-popover-tooltip';
import styles from '../style/screens/loginRegister';
import colors from '../style/colors';
import WideButton from '../components/widebutton';
import FormInput from '../components/formInput';
import { registerUser } from '../actions/authActions';
import { register } from '../api';

const validatePassword = (password) => password.length >= 8 && password.match('.*[0-9].*');

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    };

    this.inputs = {};
  }

  navToLogin = () => {
    const { navigation } = this.props;
    navigation.goBack(null);
  }

  submitRegister = () => {
    const {
      email, firstname, lastname, password,
    } = this.state;
    const { registerUserAction } = this.props;
    if (!email.includes('@')) {
      alert('Please enter a valid email address.');
    } else {
      register(firstname,
        lastname,
        email,
        password).then(() => {
        registerUserAction(email);
        alert('Registration successful! Please log in.');
        Actions.login({ email });
      }).catch(() => {
        alert('Invalid registration. '
            + 'Please enter all fields and '
            + 'follow password instructions.');
      });
    }
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  render() {
    const {
      firstname, lastname, email, password,
    } = this.state;
    const disabled = !(firstname && lastname
      && email && validatePassword(password));
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.background}
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
      >
        <LinearGradient
          colors={['transparent', colors.lightBackground]}
          style={styles.gradientBackground}
        >
          <Text style={styles.title}>StockDog</Text>
          <FormInput
            type="first name"
            onchange={(newName) => this.setState({ firstname: newName })}
            value={firstname}
            returnKeyType="next"
            onSubmitEditing={() => { this.focusNextField('last name'); }}
          />
          <FormInput
            type="last name"
            onchange={(newName) => this.setState({ lastname: newName })}
            value={lastname}
            returnKeyType="next"
            refer={(input) => { this.inputs['last name'] = input; }}
            onSubmitEditing={() => { this.focusNextField('email'); }}
          />
          <FormInput
            type="email"
            onchange={(newEmail) => this.setState({ email: newEmail })}
            value={email}
            returnKeyType="next"
            refer={(input) => { this.inputs.email = input; }}
            onSubmitEditing={() => { this.focusNextField('password'); }}
          />
          <View style={styles.horizontal}>
            <FormInput
              type="password"
              onchange={(newPass) => this.setState({ password: newPass })}
              value={password}
              returnKeyType="done"
              refer={(input) => { this.inputs.password = input; }}
              onSubmitEditing={() => {
                if (disabled) {
                  alert('Invalid registration. '
                    + 'Please enter all fields and '
                    + 'follow password instructions.');
                } else {
                  this.submitRegister();
                }
              }}
            />
            <PopoverTooltip
              buttonComponent={(
                <View style={styles.popoverButton}>
                  <Feather name="info" size={30} color="white" />
                </View>
              )}
              items={[{
                label: 'Password must be at least 8 characters long, '
                  + 'contain a capital letter '
                  + 'and contain at least 1 number.',
                onPress: () => { },
              }]}
            />
          </View>
          <WideButton
            type="register"
            disabled={disabled}
            onpress={this.submitRegister}
          />
          <TouchableOpacity
            style={styles.smallTextButton}
          >
            <Text
              style={styles.smallText}
              onPress={this.navToLogin}
            >
              Return to log in
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(null, { registerUserAction: registerUser })(Register);
