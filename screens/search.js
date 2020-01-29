import React, { Component } from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createFilter } from 'react-native-search-filter';
import styles from '../style/screens/search';
import NavBar from '../components/navbar';
import FormInput from '../components/formInput';

const stocks = [
  { name: 'Avaya Holdings Corp.', ticker: 'AVH' },
  { name: 'Abraxas Petroleum Corporation' },
  { name: 'Axalta Coating Systems Ltd.' },
  { name: 'Baidu, Inc.', ticker: 'BIDU' },
  { name: 'Franklin Resources, Inc.' },
  { name: 'Best Buy Co., Inc.' },
  { name: 'BioCryst Pharmaceuticals, Inc.' },
  { name: 'Citigroup Inc' },
  { name: 'Conagra Brands Inc' },
  { name: 'Cango Inc ADR' },
  { name: 'Companhia Brasileira DE Distribuicao' },
  { name: 'Community Bank System' },
  { name: 'Compania Cervecerias Unidas S.A.' },
];

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: '',
      top: new Animated.Value(300),
    };
  }

  submitSearch = async (ticker) => {
    const { top } = this.state;
    try {
      if (ticker) {
        Animated.timing(top, {
          duration: 300,
          toValue: 0,
        }).start(() => Actions.stock({
          type: 'replace',
          ticker,
        }));
      }
    } catch (err) {
      alert(`Sorry, ${ticker} is not a supported ticker.`);
    }
  };

  truncateStockName = (stockName) => {
    const lengthLimit = 25;

    if (stockName.length < lengthLimit) {
      return stockName;
    }

    return `${stockName.slice(0, lengthLimit)}...`;
  };

  render() {
    const { ticker, top } = this.state;
    const filteredStocks = stocks.filter(createFilter(ticker, ['name']));
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.background}
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
      >
        <NavBar />
        <View style={styles.content}>
          <Animated.View style={[styles.horizontal, { top }]}>
            <FormInput
              type="search"
              onchange={(newTicker) => {
                this.setState({ ticker: newTicker.toUpperCase() });
              }}
              value={ticker}
              returnKeyType="done"
              onSubmitEditing={() => {
                this.submitSearch(ticker);
              }}
            />
            <TouchableOpacity
              onPress={this.submitSearch}
              style={styles.searchButton}
            >
              <Feather name="search" size={24} color="white" />
            </TouchableOpacity>
          </Animated.View>
          <ScrollView style={styles.stockList}>
            {filteredStocks.map((stock) => (
              <TouchableOpacity
                key={stock.name}
                onPress={() => {
                  this.submitSearch(stock.ticker);
                }}
              >
                <Text style={styles.stockListText}>
                  {this.truncateStockName(stock.name)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default Search;
