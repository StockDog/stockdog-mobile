import React, { Component } from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../style/colors';
import styles from '../style/screens/loginRegister';
import FormInput from '../components/formInput';
import WideButton from '../components/widebutton';
import { loginUser } from '../actions/authActions';
import { initializePortfolios } from '../actions/portfolioActions';
import { login } from '../api';

import logoImage from '../assets/logo.png';

class Login extends Component {
  constructor(props) {
    super(props);

    const { email } = this.props;
    const user = email || '';
    this.state = {
      email: user,
      password: '',
    };

    this.inputs = {};
  }

  focusNextField = (id) => {
    this.inputs[id].focus();
  };

  navToRegister = () => {
    Actions.register({});
  };

  submitLogin = () => {
    const { email, password } = this.state;
    const { loginUserAction } = this.props;
    login(email, password).then(async (res) => {
      loginUserAction(res.data.userId, res.data.token);
      Actions.loading();
    }).catch((e) => {
      alert(e);
    });
  };

  render() {
    const { email, password } = this.state;
    const disabled = !(email && password);
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
          <Image
            source={logoImage}
            style={styles.logo}
          />
          <FormInput
            type="email"
            value={email}
            onchange={(newEmail) => this.setState({ email: newEmail })}
            returnKeyType="next"
            onSubmitEditing={() => { this.focusNextField('password'); }}
          />
          <FormInput
            type="password"
            value={password}
            onchange={(newPass) => this.setState({ password: newPass })}
            returnKeyType="done"
            onSubmitEditing={this.submitLogin}
            refer={(input) => { this.inputs.password = input; }}
          />
          <WideButton
            type="login"
            disabled={disabled}
            onpress={this.submitLogin}
          />
          {/* <TouchableOpacity
              style={styles.smallTextButton}>
              <Text style={styles.smallText}> Forgot Password? </Text>
            </TouchableOpacity> */}
          <TouchableOpacity style={styles.smallTextButton}>
            <Text
              style={styles.smallText}
              onPress={this.navToRegister}
            >
              Create an account
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.auth.email,
  portfolios: state.portfolio.portfolios,
});

const mapDispatchToProps = {
  loginUserAction: loginUser,
  initializePortfoliosAction: initializePortfolios,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
