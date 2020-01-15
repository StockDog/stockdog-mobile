import React, { useEffect } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import SpinningLoader from './spinningloader';
import styles from '../style/components/loadingPortfolio';
import { getPortfolios, getLeague } from '../api';
import { initializePortfoliosAndLeague } from '../actions/portfolioAndLeagueActions';

const LoadingPortfolio = ({ initializePortfoliosAndLeagueAction }) => {
  useEffect(() => {
    const initPortfolios = async () => {
      try {
        const portfolios = await getPortfolios();
        if (Object.keys(portfolios.data).length > 0) {
          const league = await getLeague(portfolios.data[0].league.id);
          initializePortfoliosAndLeagueAction(portfolios.data, league.data);
          Actions.portfolioMain();
        } else {
          Actions.leagueManagement();
        }
      } catch (err) {
        alert('Error loading portfolios');
      }
    };
    initPortfolios();
  });
  return (
    <View style={styles.background}>
      <SpinningLoader />
    </View>
  );
};

export default connect(null, {
  initializePortfoliosAndLeagueAction: initializePortfoliosAndLeague,
})(LoadingPortfolio);
