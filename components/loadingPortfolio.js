import React, { useEffect } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import SpinningLoader from './spinningloader';
import styles from '../style/components/loadingPortfolio';
import { getPortfolios } from '../api';
import { initializePortfolios } from '../actions/portfolioActions';

const LoadingPortfolio = ({ initializePortfoliosAction }) => {
  useEffect(() => {
    const initPortfolios = async () => {
      try {
        const portfolios = await getPortfolios();
        if (Object.keys(portfolios.data).length > 0) {
          initializePortfoliosAction(portfolios.data);
          Actions.portfolioMain();
        } else {
          Actions.leagueManagement();
        }
      } catch (err) {
        alert('Error loading portfolios: ', err);
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

export default connect(
  null, 
  { initializePortfoliosAction: initializePortfolios }
)(LoadingPortfolio);
