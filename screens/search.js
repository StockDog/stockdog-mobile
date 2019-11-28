import React, { Component } from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../style/screens/search';
import NavBar from '../components/navbar';
import FormInput from '../components/formInput';


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
  }

  render() {
    const { ticker, top } = this.state;
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.background}
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
      >
        <NavBar />
        <View style={styles.content}>
          <Animated.View style={[styles.horizontal, { top }]}>
            <FormInput
              type="search"
              onchange={(newTicker) => { this.setState({ ticker: newTicker.toUpperCase() }); }}
              value={ticker}
              returnKeyType="done"
              onSubmitEditing={this.submitSearch}
            />
            <TouchableOpacity onPress={this.submitSearch} style={styles.searchButton}>
              <Feather name="search" size={24} color="white" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default Search;
