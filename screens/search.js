import React, { Component } from "react";
import { View, Animated } from "react-native";
import { Actions } from "react-native-router-flux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../style/screens/search";
import NavBar from "../components/navbar";
import StockSearch from "../components/stockSearch";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: new Animated.Value(300)
    };
  }

  submitSearch = async ticker => {
    const { top } = this.state;
    try {
      if (ticker) {
        Animated.timing(top, {
          duration: 300,
          toValue: 0
        }).start(() =>
          Actions.stock({
            type: "replace",
            ticker
          })
        );
      }
    } catch (err) {
      alert(`Sorry, ${ticker} is not a supported ticker.`);
    }
  };

  render() {
    const { top } = this.state;
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
            <StockSearch submit={this.submitSearch} />
          </Animated.View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default Search;
