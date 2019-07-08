import React, { Component } from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../style/screens/search';
import NavBar from '../components/navbar';
import FormInput from '../components/formInput';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      top: new Animated.Value(300)
    };

  }

  submitSearch = () => {
    const { text, top } = this.state;
    if (text) {
      Animated.timing(top, {
        duration: 300,
        toValue: 0,
      }).start(() => Actions.stock({
        type: 'replace',
        ticker: text.toUpperCase()
      }));
    }
  }

  render() {
    const { text, top } = this.state;
    return (
      <View style={styles.background}>
        <NavBar />
        <View style={styles.content}>
          <Animated.View style={[styles.horizontal, { top: top }]}>
            <FormInput
              type="search"
              onchange={(newText) => { this.setState({ text: newText }) }}
              value={text}
              returnKeyType="done"
              onSubmitEditing={this.submitSearch}
            />
            <TouchableOpacity onPress={this.submitSearch} style={styles.searchButton}>
              <Icon name='search' size={24} color='white' />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    );
  }
}