import React from "react";
import { View, Dimensions } from "react-native";
import LineChart from "react-native-responsive-linechart";
import styles from "../style/components/portfoliochart";
import colors from "../style/colors";

interface PortfolioChartProps {
  history: HistoryItem[];
  currentValue: number;
}

interface HistoryItem {
  id: string;
  portfolioId: string;
  datetime: string;
  value: number;
}

const PortfolioChart = (props: PortfolioChartProps) => {
  const labels: Array<string> = [];
  const values: Array<number> = [];

  props.history.forEach(dataPoint => {
    labels.push(dataPoint["datetime"].slice(0, 5));
    values.push(dataPoint["value"]);
  });

  // The linechart is currently crashing if there is less than 2 points
  // For now we will just add extra initial values
  if (values.length < 2) {
    const initialDate = labels[0];
    const initialVal = values[0];

    while (values.length < 2) {
      labels.unshift(initialDate);
      values.unshift(initialVal);
    }
  }

  const config = {
    line: {
      visible: true,
      strokeWidth: 2,
      strokeColor: colors.bright
    },
    area: {
      visible: false
    },
    tooltip: {
      visible: true,
      labelFontSize: 10,
      labelFormatter: (value: string) => `$${value}`
    },
    yAxis: {
      labelColor: colors.dark,
      labelFormatter: (value: string) => {
        const valNum = parseFloat(value);
        if (valNum > 999) {
          return `$${(valNum / 1000).toFixed(2)}k`;
        } else {
          return `$${valNum}`;
        }
      }
    },
    grid: {
      visible: false
    },
    insetY: 10,
    insetX: 20,
    backgroundColor: "transparent"
  };

  return (
    <View style={styles.portfolioChart}>
      <LineChart
        style={{
          height: Dimensions.get("window").height * 0.3,
          width: Dimensions.get("window").width * 0.9
        }}
        config={config}
        data={values}
      />
    </View>
  );
};

export default PortfolioChart;
