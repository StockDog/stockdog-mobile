import React, { Component } from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../style/screens/search';
import NavBar from '../components/navbar';
import FormInput from '../components/formInput';
import { getStockHistory } from '../api';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: '',
      top: new Animated.Value(300),
    };
  }

  submitSearch = async () => {
    const { ticker, top } = this.state;
    try {
      if (ticker) {
        const initStockHistory = await getStockHistory(ticker, 'week');
        Animated.timing(top, {
          duration: 300,
          toValue: 0,
        }).start(() => Actions.stock({
          type: 'replace',
          ticker: ticker.toUpperCase(),
          initStockHistory: initStockHistory.data,
        }));
      }
    } catch (err) {
      alert(`Sorry, ${ticker} is not a supported ticker.`);
    }
  }

  render() {
    const { ticker, top } = this.state;
    return (
      <View style={styles.background}>
        <NavBar />
        <View style={styles.content}>
          <Animated.View style={[styles.horizontal, { top }]}>
            <FormInput
              type="search"
              onchange={(newTicker) => { this.setState({ ticker: newTicker }); }}
              value={ticker}
              returnKeyType="done"
              onSubmitEditing={this.submitSearch}
            />
            <TouchableOpacity onPress={this.submitSearch} style={styles.searchButton}>
              <Icon name="search" size={24} color="white" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    );
  }
}

export default Search;
