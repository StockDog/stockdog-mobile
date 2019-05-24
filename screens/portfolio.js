import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ButtonGroup } from 'react-native-elements';
import styles from '../style/screens/portfolio';
import StockChart from '../components/stockchart';
import NavBar from '../components/navbar';
import PortfolioStockList from '../components/portfolioStockList';

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true
    }
  }

  render() {
    // Handling no portfolios created yet
    if (this.props.portfolios.length == 0) {
      Actions.noPortfolios();
    }

    var stockList;

    // Waiting for league to be chosen
    if (this.props.chosenLeague) {
      stockList = this.props.portfolios[this.props.chosenLeague].items;
    }
    else {
      stockList = []
    }
    
    return (
      <View style={styles.profileBackground}>
        <ScrollView scrollEnabled={this.state.scrollEnabled}>
          <View style={styles.profileBackgroundCircle}></View>
          <NavBar />
          <View style={{ flex: 0.9, alignItems: 'center' }}>
            <View style={styles.portfolioValue}>
              <Text style={styles.value}>$20.05</Text>
            </View>
            <TouchableWithoutFeedback
              onPressIn={() => { this.setState({ scrollEnabled: false }) }}
              onPressOut={() => { this.setState({ scrollEnabled: true }) }}>
              <View>
                <StockChart />
              </View>
            </TouchableWithoutFeedback>
            <ButtonGroup
              // onPress={this.updateIndex.bind(this)}
              selectedIndex={0}
              buttons={['D', 'M', 'Y']}
              containerStyle={styles.dateRangeButtonGroup}
              textStyle={styles.whiteText}
              buttonStyle={styles.transparentBackground}
              selectedButtonStyle={styles.buttonGroupSelected}
              selectedTextStyle={styles.whiteText}
            />
            <PortfolioStockList listType='portfolio' stockList={stockList}/>
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