import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import styles from '../style/screens/league';
import NavBar from '../components/navbar';
import RankingList from '../components/rankingList';
import { getLeague } from '../api';

class League extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      members: []
    };
  }

  componentDidMount = async () => {
    const { chosenLeague } = this.props;
    this.updateMembers(chosenLeague);
  }

  componentDidUpdate = (prevProps) => {
    const { chosenLeague } = this.props;
    if (prevProps.chosenLeague !== chosenLeague) {
      this.updateMembers(chosenLeague);
    }
  }

  updateMembers = async (leagueId) => {
    try {
      let league = await getLeague(leagueId);
      let members = league.data.portfolios.map((portfolio) => {
        return {
          'name': portfolio.name,
          'value': portfolio.value
        }
      }).sort((portfolio1, portfolio2) => {
        return portfolio1.value < portfolio2.value
      });
      
      this.setState({
        title: league.data.name,
        members
      })
    }
    catch (err) {
      alert(err);
    }
  }

  render() {
    const { members, title } = this.state;

    return (
      <View style={styles.background}>
        <NavBar />
        <View style={styles.horizontal}>
          <View style={styles.leagueHeader}>
            <Text style={styles.leagueTitle}>
              {title ? `${title[0].toUpperCase()}${title.substring(1, title.length)}` : ''}
            </Text>
          </View>
        </View>
        <RankingList members={members} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  chosenLeague: state.portfolio.leagueId
});

export default connect(mapStateToProps)(League);