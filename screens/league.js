import React, { Component } from 'react';
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
    try {
      let league = await getLeague();
      let members = league.data.portfolios.map((portfolio) => {
        return {
          'name': portfolio.name,
          'value': portfolio.value
        }
      })
      this.setState({
        // title: league.data.name,
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
            <Text style={styles.leagueTitle}>Week League {title}</Text>
          </View>
        </View>
        <RankingList members={members} />
      </View>
    );
  }
}

export default League;