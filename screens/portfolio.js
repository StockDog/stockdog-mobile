import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { ButtonGroup } from 'react-native-elements';
import styles from '../style/screens/portfolio';
import StockChart from '../components/stockchart';
import NavBar from '../components/navbar';
import PortfolioStockList from '../components/portfolioStockList';
import LoadingPortfolio from '../components/loadingPortfolio';

const timeframes = ['M', 'Y'];

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true,
      selectedTimeframe: timeframes[0],
      xData: [],
      yData: []
    }
  }

  updateIndex = (index) => {
    this.setState({selectedTimeframe: timeframes[index]})
  }

  getData = () => {
    // TODO: Add portfolio history endpoint when ready
  }

  render() {
    var stockList;
    const { chosenLeague, portfolios } = this.props;
    const { scrollEnabled, selectedTimeframe, xData, yData } = this.state;

    if (!portfolios[chosenLeague]) {
      return <LoadingPortfolio />
    }

    // Waiting for league to be chosen
    stockList = chosenLeague ? portfolios[chosenLeague].items : [];

    return (
      <View style={styles.profileBackground}>
        <ScrollView scrollEnabled={scrollEnabled}>
          <View style={styles.profileBackgroundCircle} />
          <NavBar />
          <View style={{ flex: 0.9, alignItems: 'center' }}>
            <View style={styles.portfolioValue}>
              <Text style={styles.value}>{`$${portfolios[chosenLeague].value}`}</Text>
            </View>
            <TouchableWithoutFeedback
              onPressIn={() => { this.setState({ scrollEnabled: false }) }}
              onPressOut={() => { this.setState({ scrollEnabled: true }) }}
            >
              <View>
                <StockChart xData={xData} yData={yData} />
              </View>
            </TouchableWithoutFeedback>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={timeframes.indexOf(selectedTimeframe)}
              buttons={['M', 'Y']}
              containerStyle={styles.dateRangeButtonGroup}
              textStyle={styles.whiteText}
              buttonStyle={styles.transparentBackground}
              selectedButtonStyle={styles.buttonGroupSelected}
              selectedTextStyle={styles.whiteText}
            />
            <PortfolioStockList listType='portfolio' stockList={stockList} />
            {/* <PortfolioStockList listType='watchlist' /> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  portfolios: state.portfolio.portfolios,
  chosenLeague: state.portfolio.leagueID
});

export default connect(mapStateToProps, {})(Portfolio);