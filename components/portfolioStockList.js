import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from "react-native-router-flux";
import styles from '../style/screens/portfolio';

class PortfolioStockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockList: [],
    };
  }

  componentDidMount = () => {
    const { listType } = this.props;
    if (listType === 'watchlist') {
      this.setState({
        stockList: [{
          ticker: 'RADW', companyName: 'Rite Aid Corporation', value: 200.53, gain: 27.21,
        },
        {
          ticker: 'CAMTW', companyName: 'Camtek LTD', value: 4021.21, gain: -120.23,
        },
        {
          ticker: 'WMTW', companyName: 'Walmart Inc', value: 142.23, gain: 21.82,
        },
        {
          ticker: 'ZNGAW', companyName: 'Zinga Inc', value: 6.23, gain: -0.52,
        }],
      });
    }
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.stockList !== state.stockList) {
      return {
        stockList: props.stockList,
      };
    }
    return null;
  };

  navToTicker = (ticker) => {
    Actions.stock({
      type: "replace",
      ticker
    });
  }

  renderStockListingItem = (item, index) => {
    const difference = item.gain >= 0
      ? (
        <Text style={styles.greenValue}>
          {`(+${item.gain.toFixed(2, 10)})`}
        </Text>
      )
      : (
        <Text style={styles.redValue}>
          {`(${item.gain.toFixed(2, 10)})`}
        </Text>
      );

    return (
      <View style={styles.listingItem} key={index}>
        <View style={styles.horizontalEdges}>
          <TouchableOpacity onPress={() => this.navToTicker(item.ticker)}>
            <Text style={styles.listingTickerAndValue}>{item.ticker}</Text>
          </TouchableOpacity>
          <View style={styles.horizontal}>
            <Text style={styles.listingTickerAndValue}>
              {`$${item.avgCost.toFixed(2, 10)} `}
            </Text>
            {difference}
          </View>
        </View>
        <View style={styles.horizontalEdges}>
          <Text style={styles.smallListingText}>{item.companyName}</Text>
          {item.shareCount ? (
            <Text style={styles.smallListingText}>
              {`${item.shareCount} shares`}
            </Text>
          ) : null}
        </View>
      </View>
    );
  }

  render() {
    const { listType } = this.props;
    const { stockList } = this.state;
    return (
      <View style={styles.portfolioStockList}>
        <View style={styles.portfolioStockListHeader}>
          <Text style={styles.portfolioStockListHeaderText}>
            {listType === 'portfolio' ? 'Portfolio' : 'Watchlist'}
          </Text>
        </View>
        <View style={styles.portfolioListGroup}>
          {stockList.map((item, index) => this.renderStockListingItem(item, index))}
        </View>
      </View>
    );
  }
}

export default PortfolioStockList;
