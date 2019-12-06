import React from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import styles from "../style/components/portfoliochart";
import colors from "../style/colors";

interface PortfolioChartProps {
  history: HistoryItem[];
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

  return (
    <View style={styles.portfolioChart}>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: values
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={Dimensions.get("window").height * 0.3}
        // withDots={false}
        withInnerLines={false}
        withOuterLines={false}
        withShadow={false}
        chartConfig={{
          backgroundGradientFrom: colors.white,
          backgroundGradientTo: colors.white,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: () => colors.bright,
          labelColor: () => colors.dark,
          style: {
            borderRadius: 10
          }
        }}
        // bezier
        style={{
          borderRadius: 16,
          paddingLeft: 10
        }}
        formatYLabel={value => {
          const valNum = parseFloat(value);
          if (valNum > 999) {
            return `$${(valNum / 1000).toFixed(2)}k`;
          } else {
            return `$${valNum}`;
          }
        }}
      />
    </View>
  );
};

export default PortfolioChart;
