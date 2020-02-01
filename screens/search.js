import React, { Component } from "react";
import { View, Animated, TouchableOpacity, FlatList, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createFilter } from "react-native-search-filter";
import styles from "../style/screens/search";
import NavBar from "../components/navbar";
import FormInput from "../components/formInput";

const stocks = [
  { name: "Avaya Holdings Corp.", ticker: "AVH" },
  { name: "Abraxas Petroleum Corporation", ticker: "APX" },
  { name: "Axalta Coating Systems Ltd.", ticker: "ACS" },
  { name: "Baidu, Inc.", ticker: "BIDU" },
  { name: "Franklin Resources, Inc.", ticker: "FRI" },
  { name: "Best Buy Co., Inc.", ticker: "BB" },
  { name: "BioCryst Pharmaceuticals, Inc.", ticker: "BPI" },
  { name: "Citigroup Inc", ticker: "C" },
  { name: "Conagra Brands Inc", ticker: "CBI" },
  { name: "Cango Inc ADR", ticker: "ADR" },
  { name: "Companhia Brasileira DE Distribuicao", ticker: "CBDD" },
  { name: "Community Bank System", ticker: "CBS" },
  { name: "Compania Cervecerias Unidas S.A.", ticker: "CCU" }
];

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: "",
      top: new Animated.Value(300),
      showStockSearch: false
    };
  }

  submitSearch = async ticker => {
    const { top } = this.state;
    try {
      if (ticker) {
        this.setState({ showStockSearch: false });
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

  truncateStockName = stockName => {
    const lengthLimit = 20;

    if (stockName.length < lengthLimit) {
      return stockName;
    }

    return `${stockName.slice(0, lengthLimit)}...`;
  };

  render() {
    const { ticker, top, showStockSearch } = this.state;
    const filteredStocks = stocks.filter(
      createFilter(ticker, ["name", "ticker"])
    );
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
              onchange={newTicker => {
                this.setState({
                  ticker: newTicker.toUpperCase(),
                  showStockSearch: true
                });
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
          {showStockSearch ? (
            <View style={styles.stockList}>
              <FlatList
                data={filteredStocks}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    key={item.name}
                    onPress={() => {
                      this.submitSearch(item.ticker);
                    }}
                    style={styles.stockListStock}
                  >
                    <Text style={styles.stockListText}>
                      {this.truncateStockName(item.name)}
                    </Text>
                    <Text style={styles.stockListSubtext}>
                      {this.truncateStockName(item.ticker)}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={stock => stock.name}
              />
            </View>
          ) : null}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default Search;
