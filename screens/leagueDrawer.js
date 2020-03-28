import React, { Component } from 'react';
import {
  Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import styles from '../style/screens/leagueDrawer';
import {
  chooseLeague,
  updatePortfolios,
  updateLeague,
} from '../actions/portfolioAndLeagueActions';

class LeagueDrawer extends Component {
  componentDidMount() {
    const { chosenLeague, choose, portfolios } = this.props;
    if (!chosenLeague) {
      choose(Object.keys(portfolios)[0]);
    }
    this.pollPortfoliosAndChosenLeague();
  }

  pollPortfoliosAndChosenLeague = () => {
    const {
      updatePortfoliosAction,
      updateLeagueAction,
      chosenLeague,
    } = this.props;
    updatePortfoliosAction();
    updateLeagueAction(chosenLeague);
    setTimeout(this.pollPortfoliosAndChosenLeague.bind(this), 10000);
  };

  renderPortfolio = (portfolioItem) => {
    const { chosenLeague } = this.props;
    const portfolio = portfolioItem.item;
    return (
      <TouchableOpacity
        style={styles.portfolioListItem}
        onPress={() => this.setSelected(portfolio.league.id)}
      >
        <View style={
          portfolio.league.id === parseInt(chosenLeague, 10) ?
            styles.chosenMark :
            styles.regularMark
        }
        />
        <View style={styles.portfolioText}>
          {
            portfolio.league.status === "active" ?
              (
                <View>
                  <Text style={styles.portfolioTitle}>{portfolio.league.name}</Text>
                  <Text style={styles.portfolioValue}>
                    {`$${portfolio.value.toFixed(2, 10)}`}
                  </Text>
                </View>
              ) :
              (
                <View>
                  <Text style={styles.portfolioTitleInactive}>{portfolio.league.name}</Text>
                </View>
              )
          }
        </View>
      </TouchableOpacity>
    );
  };

  setSelected = (id) => {
    const { choose, updateLeagueAction } = this.props;
    choose(id);
    updateLeagueAction(id);
  };

  keyExtractor = (item, index) => index.toString();

  navToAddLeague = () => {
    Actions.noLeagues({ type: 'replace', homeable: true });
  };

  render() {
    const { portfolios } = this.props;
    const portfolioValues = Object.values(portfolios);
    portfolioValues[0].league.status = 'active';
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

const mapStateToProps = (state) => ({
  portfolios: state.portfolioAndLeague.portfolios,
  chosenLeague: state.portfolioAndLeague.leagueId,
});

export default connect(mapStateToProps, {
  choose: chooseLeague,
  updatePortfoliosAction: updatePortfolios,
  updateLeagueAction: updateLeague,
})(LeagueDrawer);
