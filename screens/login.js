import React, { Component } from 'react';
import Constants from 'expo-constants';
import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import { TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../style/colors';
import styles from '../style/screens/loginRegister';
import { loginUser } from '../actions/authActions';
import { initializePortfolios } from '../actions/portfolioActions';
import { loginGoogle, loginApple } from '../api';

import logoImage from '../assets/logo.png';
import googleLoginImg from '../assets/google-login.png';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { appleAuth: false };
  }

  async componentDidMount() {
    AppleAuthentication.isAvailableAsync().then((res) => {
      this.setState({ appleAuth: res });
    });
  }

  googleLogin = async () => {
    // Get information from google
    const { type, idToken } = await Google.logInAsync({
      iosClientId:
        '802147424875-0m4910jl4g5lt7m0u5dmdnsjkmrav517.apps.googleusercontent.com',
      // androidClientId: `<YOUR_ANDROID_CLIENT_ID_FOR_EXPO>`,
      iosStandaloneAppClientId:
        '802147424875-3m21ehg25eaja2g1tgdp95ml3o1l993e.apps.googleusercontent.com',
      // androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`,
    });

    if (type !== 'success') {
      alert('Google login failed');
      return;
    }

    // Perform login with StockDog API
    const appType = Constants.appOwnership === 'standalone' ? 'standalone' : 'expo';
    const platform = Object.keys(Constants.platform).includes('ios')
      ? 'ios'
      : 'android';

    const { loginUserAction } = this.props;

    const res = await loginGoogle(idToken, appType, platform);
    loginUserAction(res.data.userId, res.data.token);
    Actions.loading();
  };

  appleLogin = async () => {
    const appType = Constants.appOwnership === 'standalone' ? 'standalone' : 'expo';
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // signed in
      const { loginUserAction } = this.props;

      const res = await loginApple(
        credential.identityToken,
        appType,
        credential.fullName.givenName,
        credential.fullName.familyName,
      );
      loginUserAction(res.data.userId, res.data.token);
      Actions.loading();
    } catch (e) {
      if (e.code === 'ERR_CANCELED') {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };

  render() {
    const { appleAuth } = this.state;
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
          <Image source={logoImage} style={styles.logo} />
          {!appleAuth ? null : (
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
              }
              buttonStyle={
                AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
              }
              cornerRadius={5}
              style={styles.appleLoginBtn}
              onPress={this.appleLogin}
            />
          )}
          <TouchableOpacity onPress={this.googleLogin}>
            <Image source={googleLoginImg} style={styles.googleLogin} />
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
