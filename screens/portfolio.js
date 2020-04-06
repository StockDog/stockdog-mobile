import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import styles from '../style/screens/portfolio';
import PortfolioChart from '../components/portfolioChart.tsx';
import NavBar from '../components/navbar';
import PortfolioStockList from '../components/portfolioStockList';
import LeagueSummaryModal from './leagueSummaryModal';

const Portfolio = (props) => {
  const { chosenLeague, portfolios } = props;
  const stockList = portfolios[chosenLeague].items;
  const currentValue = portfolios[chosenLeague].value.toFixed(2, 10);
  return (
    <View style={styles.profileBackground}>
      <ScrollView scrollEnabled>
        <View style={styles.profileBackgroundCircle} />
        <NavBar />
        <View style={{ flex: 0.9, alignItems: 'center' }}>
          <View style={styles.portfolioInfo}>
            <Text style={styles.value}>{`$${currentValue}`}</Text>
            <Text style={styles.leagueTitle}>
              {`${portfolios[chosenLeague].league.name}`}
            </Text>
            <Text style={styles.dates}>
              {`${portfolios[chosenLeague].league.start} | ${portfolios[chosenLeague].league.end}`}
            </Text>
          </View>
          <PortfolioChart
            history={portfolios[chosenLeague].history}
            currentValue={currentValue}
          />
          <PortfolioStockList listType="portfolio" stockList={stockList} />
          {/* <PortfolioStockList listType='watchlist' /> */}
        </View>
      </ScrollView>
      {/* <LeagueSummaryModal /> */}
    </View>
  );
};

const mapStateToProps = (state) => ({
  portfolios: state.portfolioAndLeague.portfolios,
  chosenLeague: state.portfolioAndLeague.leagueId,
});

export default connect(mapStateToProps, {})(Portfolio);
