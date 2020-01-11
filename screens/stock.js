import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../style/screens/stock';
import StockChart from '../components/stockchart';
import NavBar from '../components/navbar';
import { getStockInfo } from '../api';
import FormInput from '../components/formInput';

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrice: '-',
      exchange: '',
      searchTicker: props.ticker,
      ownedAmt: this.findOwnedAmt(),
    };
  }

  componentDidMount = async () => {
    const { ticker } = this.props;

    const stockInfo = await this.getStockInfo(ticker);

    this.setState({
      currentPrice: stockInfo.currentPrice,
      exchange: stockInfo.exchange,
    });
  };

  getStockInfo = async (ticker) => {
    const { data } = await getStockInfo(ticker);
    return {
      exchange: data.exchange,
      currentPrice: data.currentPrice,
    };
  };

  openModal = () => {
    const { currentPrice, ownedAmt } = this.state;
    const { ticker } = this.props;
    Actions.tradingModal({
      ticker,
      price: currentPrice,
      updateOwnedAmt: (amt) => {
        this.setState({ ownedAmt: ownedAmt + amt });
      },
    });
  };

  findOwnedAmt = () => {
    const { portfolios, chosenLeague, ticker } = this.props;

    const { items } = portfolios[chosenLeague];

    const stockItem = items.find((item) => item.ticker === ticker);

    return (stockItem && stockItem.shareCount) || 0;
  };

  submitSearch = async () => {
    const { searchTicker } = this.state;
    const { ticker } = this.props;

    try {
      if (searchTicker && searchTicker !== ticker) {
        // This actually just updates the props for the current Stock page.
        // That is why we call formatAndUpdateData instead of just updating the props
        const stockInfo = await this.getStockInfo(searchTicker.toUpperCase());

        Actions.stock({
          type: 'replace',
          ticker: searchTicker.toUpperCase(),
          exchange: stockInfo.exchange,
        });
        this.setState({
          ownedAmt: this.findOwnedAmt(),
          currentPrice: stockInfo.currentPrice,
          exchange: stockInfo.exchange,
        });
      }
    } catch (err) {
      alert(`Sorry, ${searchTicker} is not a supported ticker.`);
    }
  };

  render() {
    const { ticker, portfolios, chosenLeague } = this.props;
    const {
      currentPrice, searchTicker, ownedAmt, exchange,
    } = this.state;

    let tradeBtn = (
      <TouchableOpacity style={styles.tradingButton} onPress={this.openModal}>
        <Text style={styles.tradingButtonText}>Trade</Text>
      </TouchableOpacity>
    );

    const todayWithTime = new Date();
    const month = todayWithTime.getMonth();
    const day = todayWithTime.getDay();
    const year = todayWithTime.getFullYear();
    const today = new Date(year, month, day);

    const startDateArr = portfolios[chosenLeague].league.start.split('-');
    const startDate = new Date(
      startDateArr[2],
      startDateArr[0] - 1,
      startDateArr[1],
    );

    const endDateArr = portfolios[chosenLeague].league.end.split('-');
    const endDate = new Date(endDateArr[2], endDateArr[0] - 1, endDateArr[1]);

    if (today < startDate) {
      tradeBtn = (
        <TouchableOpacity style={styles.tradingButtonInvalid}>
          <Text style={styles.tradingButtonText}>League has not begun</Text>
        </TouchableOpacity>
      );
    } else if (endDate < today) {
      tradeBtn = (
        <TouchableOpacity style={styles.tradingButtonInvalid}>
          <Text style={styles.tradingButtonText}>League is done</Text>
        </TouchableOpacity>
      );
    }

    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.background}
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
      >
        <NavBar />
        <View style={styles.searchContainer}>
          <View style={styles.search}>
            <FormInput
              type="search"
              onchange={(newTicker) => {
                this.setState({ searchTicker: newTicker.toUpperCase() });
              }}
              value={searchTicker}
              returnKeyType="done"
              onSubmitEditing={this.submitSearch}
            />
            <TouchableOpacity
              onPress={this.submitSearch}
              style={styles.searchButton}
            >
              <Feather name="search" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.stockContent}>
          <View style={styles.tickerContainer}>
            <Text style={styles.tickerText}>{ticker}</Text>
          </View>
          <StockChart ticker={ticker} exchange={exchange} />
        </View>
        <View style={styles.tradingBox}>
          <View style={styles.stockInfo}>
            <View style={styles.stockInfoNumber}>
              <Text style={styles.number}>{ownedAmt}</Text>
              <Text style={styles.label}>Owned</Text>
            </View>
            <View style={styles.stockInfoNumber}>
              <Text style={styles.number}>
$
                {currentPrice}
              </Text>
              <Text style={styles.label}>Price</Text>
            </View>
          </View>
          <View style={styles.tradingButtonContainer}>{tradeBtn}</View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  portfolios: state.portfolioAndLeague.portfolios,
  chosenLeague: state.portfolioAndLeague.leagueId,
});

export default connect(mapStateToProps, {})(Stock);
