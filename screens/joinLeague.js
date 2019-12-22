import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import FormInput from '../components/formInput';
import WideButton from '../components/widebutton';
import styles from '../style/screens/joinLeague';
import NavBar from '../components/navbar';
import { joinLeague } from '../api';
import { updatePortfolios, chooseLeague } from '../actions/portfolioActions';
import BrowseLeagueModal from './browseLeaguesModal';

class JoinLeague extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inviteCode: '',
      nickname: '',
      notFound: false,
      browseLeaguesModal: false,
    };
  }

  close = () => {
    Actions.pop();
  };

  submitJoinLeague = async () => {
    const { inviteCode, nickname } = this.state;
    const { update, choose } = this.props;
    try {
      const joinRes = await joinLeague(inviteCode, nickname);
      await update();
      await choose(joinRes.data.leagueId);
      Actions.portfolioMain();
    } catch (err) {
      if (Object.keys(err.response.data)[0] === 'InviteCodeMismatch') {
        this.setState({ notFound: true });
      } else {
        alert('Error updating portfolios.');
      }
    }
  };

  toggleBrowseLeagueModal = () => {
    this.setState((prevState) => ({
      browseLeaguesModal: !prevState.browseLeaguesModal,
    }));
  };

  fillInviteCode = (inviteCode) => {
    this.setState({ inviteCode });
  };

  render() {
    const {
      notFound, inviteCode, nickname, browseLeaguesModal,
    } = this.state;
    let notFoundComponent;
    if (notFound) {
      notFoundComponent = (
        <Text style={styles.joinLeagueWarning}> League Not Found </Text>
      );
    }
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.background}
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
      >
        <BrowseLeagueModal
          isOpen={browseLeaguesModal}
          toggle={this.toggleBrowseLeagueModal}
          fillInviteCode={this.fillInviteCode}
        />
        <View style={styles.backgroundCircle} />
        <NavBar />
        <View style={styles.titleContainer}>
          <Text style={styles.title}> Join a League </Text>
        </View>
        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.smallTextButton}>
            <Text
              style={styles.smallText}
              onPress={this.toggleBrowseLeagueModal}
            >
              Browse Leagues
            </Text>
          </TouchableOpacity>
          <View style={styles.inputsContainer}>
            <FormInput
              type="Invite Code"
              onchange={(code) => {
                this.setState({ inviteCode: code });
              }}
              value={inviteCode}
            />
            <FormInput
              type="Your nickname"
              onchange={(name) => {
                this.setState({ nickname: name });
              }}
              value={nickname}
            />
          </View>
        </View>
        <WideButton type="join" onpress={this.submitJoinLeague} />
        <WideButton type="cancel" onpress={Actions.pop} />
        {notFoundComponent}
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(null, {
  update: updatePortfolios,
  choose: chooseLeague,
})(JoinLeague);
