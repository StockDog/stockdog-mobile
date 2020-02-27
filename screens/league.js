import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Actions } from "react-native-router-flux";
import styles from '../style/screens/league';
import NavBar from '../components/navbar';
import RankingList from '../components/rankingList';

class League extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      members: [],
    };
  }

  componentDidMount = async () => {
    this.updateMembers();
  };

  componentDidUpdate = (prevProps) => {
    const { chosenLeagueId, league } = this.props;
    if (
      prevProps.chosenLeagueId !== chosenLeagueId
      || prevProps.league !== league
    ) {
      this.updateMembers();
    }
  };

  updateMembers = async () => {
    const { league } = this.props;

    const members = league.portfolios
      .map((portfolio) => ({
        name: portfolio.name,
        value: portfolio.value,
      }))
      .sort((portfolio1, portfolio2) => portfolio1.value < portfolio2.value);

    this.setState({
      title: league.name,
      members,
    });
  };

  openAddMemberModal = () => {
    Actions.addMemberModal();
  }

  render() {
    const { members, title } = this.state;

    return (
      <View style={styles.background}>
        <NavBar />
        <View style={styles.horizontal}>
          <View style={styles.leagueHeader}>
            <Text style={styles.leagueTitle}>
              {title
                ? `${title[0].toUpperCase()}${title.substring(1, title.length)}`
                : ''}
            </Text>
          </View>
          <View style={styles.addMember}>
            <TouchableOpacity onPress={this.openAddMemberModal}>
              <Feather style={{ color: 'white' }} name='user-plus' size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <RankingList members={members} />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  chosenLeagueId: state.portfolioAndLeague.leagueId,
  league: state.portfolioAndLeague.league,
});

export default connect(mapStateToProps)(League);
