import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import FormInput from '../components/formInput';
import WideButton from '../components/widebutton';
import styles from '../style/screens/joinLeague';
import NavBar from '../components/navbar';
import { joinLeague } from '../api';
import { updatePortfolios, chooseLeague } from '../actions/portfolioActions';

class JoinLeague extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inviteCode: '',
      nickname: '',
      notFound: false,
    };
  }

  close = () => {
    Actions.pop();
  }

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
  }

  render() {
    const { notFound, inviteCode, nickname } = this.state;
    let notFoundComponent;
    if (notFound) {
      notFoundComponent = <Text style={styles.joinLeagueWarning}> League Not Found </Text>;
    }
    return (
      <View style={styles.background}>
        <View style={styles.backgroundCircle} />
        <NavBar />
        <View style={styles.titleContainer}>
          <Text style={styles.title}> Join a League </Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.inputsContainer}>
            <FormInput
              type="Invite Code"
              onchange={(code) => { this.setState({ inviteCode: code }); }}
              value={inviteCode}
            />
            <FormInput
              type="Your nickname"
              onchange={(name) => { this.setState({ nickname: name }); }}
              value={nickname}
            />
          </View>
        </View>
        <WideButton type="join" onpress={this.submitJoinLeague} />
        <WideButton type="cancel" onpress={Actions.pop} />
        {notFoundComponent}
      </View>
    );
  }
}

export default connect(null, { update: updatePortfolios, choose: chooseLeague })(JoinLeague);
