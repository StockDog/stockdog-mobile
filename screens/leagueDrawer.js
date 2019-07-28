import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import styles from '../style/screens/leagueDrawer';
import { chooseLeague, updatePortfolios } from '../actions/portfolioActions';

class LeagueDrawer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { chosenLeague, choose, portfolios } = this.props;
    if (!chosenLeague) {
      choose(Object.keys(portfolios)[0]);
    }
    this.pollPortfolios();
  }

  pollPortfolios = () => {
    const { update } = this.props;
    update();
    setTimeout(this.pollPortfolios.bind(this), 10000);
  }

  renderPortfolio = (portfolio) => {
    const { chosenLeague } = this.props;
    portfolio = portfolio.item;
    return (
      <TouchableOpacity
        style={styles.portfolioListItem}
        onPress={() => this.setSelected(portfolio.id)}
      >
        {
          portfolio.leagueId === parseInt(chosenLeague) ?
            <View style={styles.chosenMark} /> :
            <View style={styles.regularMark} />
        }
        <View style={styles.portfolioText}>
          <Text style={styles.portfolioTitle}>{portfolio.name}</Text>
          <Text style={styles.portfolioValue}>
            $
            {portfolio.value}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  setSelected = (id) => {
    const { choose } = this.props;
    choose(id);
  }

  keyExtractor = (item, index) => index.toString();

  navToAddLeague = () => {
    Actions.noLeagues();
  }

  render() {
    const { portfolios } = this.props;
    var portfolioValues = Object.values(portfolios);
    return (
      <View style={styles.background}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={portfolioValues}
          renderItem={this.renderPortfolio}
          style={styles.portfolioList}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.addLeagueButton}
            onPress={this.navToAddLeague}
          >
            <Text style={styles.buttonText}>Add League</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => ({
  portfolios: state.portfolio.portfolios,
  chosenLeague: state.portfolio.leagueID
});

export default connect(mapStateToProps, { choose: chooseLeague, update: updatePortfolios })(LeagueDrawer);