import React, { useState } from "react";
import { View, TouchableOpacity, FlatList, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { createFilter } from "react-native-search-filter";

// @ts-ignore
import FormInput from "./formInput";
import styles from "../style/components/stockSearch";

interface StockSearchProps {
  stockList: Array<StockListElement>;
  submit: (input: string) => {};
}

interface StockListElement {
  name: string;
  ticker: string;
}

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

const truncateStockName = (stockName: string) => {
  const lengthLimit = 20;

  if (stockName.length < lengthLimit) {
    return stockName;
  }

  return `${stockName.slice(0, lengthLimit)}...`;
};

const StockSearch = (props: StockSearchProps) => {
  const [input, setInput] = useState("");
  const [showFilterList, setShowFilterList] = useState(false);

  const filteredStocks = stocks.filter(createFilter(input, ["name", "ticker"]));

  // Does a check to hide filterList when no text, show when there is text
  const setInputWithCheck = (input: string) => {
    setInput(input);
    if (input.length > 0) setShowFilterList(true);
    else setShowFilterList(false);
  };

  return (
    <View style={styles.searchContent}>
      <View style={styles.searchBar}>
        <FormInput
          type="search"
          onchange={(newInput: string) => {
            setInputWithCheck(newInput.toUpperCase());
          }}
          value={input}
          returnKeyType="done"
          onSubmitEditing={() => {
            setShowFilterList(false);
            props.submit(input);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setShowFilterList(false);
            props.submit(input);
          }}
          style={styles.searchButton}
        >
          <Feather name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {showFilterList ? (
        <View style={styles.stockList}>
          <FlatList
            data={filteredStocks}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.name}
                onPress={() => {
                  setShowFilterList(false);
                  setInput(item.ticker);
                  props.submit(item.ticker);
                }}
                style={styles.stockListStock}
              >
                <Text style={styles.stockListText}>
                  {truncateStockName(item.name)}
                </Text>
                <Text style={styles.stockListSubtext}>
                  {truncateStockName(item.ticker)}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={stock => stock.name}
          />
        </View>
      ) : null}
    </View>
  );
};

export default StockSearch;
