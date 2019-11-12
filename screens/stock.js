import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ButtonGroup } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import styles from '../style/screens/stock';
import StockChart from '../components/stockchart';
import NavBar from '../components/navbar';
import { getStockHistory } from '../api';
import FormInput from '../components/formInput';

const lengthMap = {
  W: 'week',
  M: 'month',
  Y: 'year',
};

export default class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 'W',
      xData: [],
      yData: [],
      isLoading: true,
      currentPrice: '',
      searchTicker: props.ticker,
    };
  }

  componentDidMount() {
    const { initStockHistory } = this.props;
    this.formatAndUpdateData(initStockHistory, 0);
  }

  updateIndex = (idx) => {
    const { ticker } = this.props;
    const selectedLength = Object.keys(lengthMap)[idx];
    getStockHistory(ticker, lengthMap[selectedLength]).then((res) => {
      this.formatAndUpdateData(res.data, idx);
    }).catch((err) => alert(err));
  }

  formatAndUpdateData = (data, idx) => {
    const selectedLength = Object.keys(lengthMap)[idx];
    const xData = [];
    const yData = [];
    data.forEach((val) => {
      const timeStrArray = val.time.split(' ');
      const date = this.createDateString(timeStrArray);
      xData.push(date);
      yData.push(val.price);
    });
    this.setState({
      xData,
      yData,
      length: selectedLength,
      isLoading: false,
      currentPrice: yData[yData.length - 1].toFixed(2),
    });
  }

  createDateString = (timeStrArray) => {
    const d = new Date(timeStrArray[0]);
    const mo = d.toLocaleString('en-us', { month: 'short' });
    const day = d.toLocaleString('en-us', { day: 'numeric' });
    return `${mo} ${day}`;
  }

  openModal = () => {
    const { currentPrice } = this.state;
    const { ticker } = this.props;
    Actions.tradingModal({
      ticker,
      buyingPower: 10,
      total: 0,
      price: currentPrice,
    });
  }

  submitSearch = async () => {
    const { searchTicker } = this.state;
    const { ticker } = this.props;

    try {
      if (searchTicker && searchTicker !== ticker) {
        const initStockHistory = await getStockHistory(searchTicker, 'week');

        // This actually just updates the props for the current Stock page.
        // That is why we call formatAndUpdateData instead of just updating the props
        Actions.stock({
          type: 'replace',
          ticker: searchTicker.toUpperCase(),
        });
        this.formatAndUpdateData(initStockHistory.data, 0);
      }
    } catch (err) {
      alert(`Sorry, ${searchTicker} is not a supported ticker.`);
    }
  }

  render() {
    const { ticker } = this.props;
    const {
      currentPrice, xData, yData, isLoading, length, searchTicker,
    } = this.state;
    return (
      <View style={styles.background}>
        <NavBar />
        <View style={styles.searchContainer}>
          <View style={styles.search}>
            <FormInput
              type="search"
              onchange={(newTicker) => { this.setState({ searchTicker: newTicker }); }}
              value={searchTicker}
              returnKeyType="done"
              onSubmitEditing={this.submitSearch}
            />
            <TouchableOpacity onPress={this.submitSearch} style={styles.searchButton}>
              <Feather name="search" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.stockContent}>
          <View style={styles.tickerContainer}>
            <Text style={styles.tickerText}>{ticker}</Text>
            <Text style={styles.currentPriceText}>
              $
              {currentPrice}
            </Text>
          </View>
          <StockChart
            xData={xData}
            yData={yData}
            isLoading={isLoading}
          />
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={
              Object.keys(lengthMap).indexOf(length)
            }
            buttons={Object.keys(lengthMap)}
            containerStyle={styles.dateRangeButtonGroup}
            textStyle={styles.whiteText}
            buttonStyle={styles.transparentBackground}
            selectedButtonStyle={styles.buttonGroupSelected}
            selectedTextStyle={styles.whiteText}
          />
        </View>
        <View style={styles.tradingBox}>
          <View style={styles.stockInfo}>
            <View style={styles.stockInfoNumber}>
              <Text style={styles.number}>13</Text>
              <Text style={styles.label}>Owned</Text>
            </View>
            <View style={styles.stockInfoNumber}>
              <Text style={styles.number}>$20.15</Text>
              <Text style={styles.label}>Price</Text>
            </View>
            <View style={styles.stockInfoNumber}>
              <Text style={styles.number}>20M</Text>
              <Text style={styles.label}>Volume</Text>
            </View>
          </View>
          <View style={styles.tradingButtonContainer}>
            <TouchableOpacity
              style={styles.tradingButton}
              onPress={this.openModal}
            >
              <Text style={styles.tradingButtonText}>Trade</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
