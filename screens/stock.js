import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ButtonGroup } from 'react-native-elements';
import styles from '../style/screens/stock';
import StockChart from '../components/stockchart';
import NavBar from '../components/navbar';
import { getStockHistory } from '../api';

const lengthMap = {
  'W': 'week',
  'M': 'month',
  'Y': 'year'
}

export default class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 'W',
      xData: [],
      yData: [],
      isLoading: true,
      currentPrice: ''
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
    }).catch((err) => 
      alert(err)
    );
  }

  formatAndUpdateData = (data, idx) => {
    const selectedLength = Object.keys(lengthMap)[idx];
    var xData = [];
    var yData = [];
    data.forEach((val) => {
      var timeStrArray = val.time.split(" ");
      var date = this.createDateString(timeStrArray);
      xData.push(date);
      yData.push(val.price);
    });
    this.setState({
      xData,
      yData,
      length: selectedLength,
      isLoading: false,
      currentPrice: yData[yData.length - 1].toFixed(2)
    })
  }

  createDateString = (timeStrArray) => {
    var d = new Date(timeStrArray[0]);
    var mo = d.toLocaleString("en-us", { month: "short" });
    var day = d.toLocaleString("en-us", { day: "numeric" });
    return mo + " " + day;
  }

  openModal = () => {
    const { currentPrice } = this.state;
    const { ticker } = this.props;
    Actions.tradingModal({
      ticker: ticker,
      buyingPower: 10,
      total: 0,
      price: currentPrice
    });
  }

  render() {
    const { ticker } = this.props;
    const { currentPrice, xData, yData, isLoading, length } = this.state;
    return (
      <View style={styles.background}>
        <NavBar />
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