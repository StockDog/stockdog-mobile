import React, { Component } from 'react';
import { View } from 'react-native';
import ChartView  from 'react-native-highcharts';
import colors from '../style/colors';
import styles from '../style/components/stockchart';
import SpinningLoader from './spinningloader';

export default class StockChart extends Component {
  constructor(props) {
    super(props);
  }

  createChart() {
    const { xData, yData } = this.props;
    var Highcharts = 'Highcharts';
    var conf = {
      chart: {
        type: 'spline',
        marginRight: 10,
        animation: Highcharts.svg,
        lineColor: colors.white,
        backgroundColor: 'transparent',
        gridLineColor: colors.white
      },
      title: { text: '' },
      xAxis: {
        visible: false,
        type: 'category',
        categories: xData
      },
      yAxis: {
        title: { text: '' },
        lineWidth: 0,
        gridLineColor: colors.grey,
        plotLines: [{
          value: 0,
          width: 1,
          color: colors.white
        }],
        labels: {
          style: {
            color: colors.white
          }
        },
      },
      tooltip: {
        formatter: function () {
          return this.x + '<br/>$' + this.y;
        }
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        data: yData
      }],
      plotOptions: {
        series: {
          color: colors.white,
          marker: {
            enabled: false
          }
        }
      },
      credits: {
        enabled: false
      }
    };

    const options = {
      global: {
        useUTC: false
      },
      lang: {
        decimalPoint: '.',
        thousandsSep: ','
      }
    };

    return (
      <ChartView style={styles.chart} config={conf} options={options} originWhitelist={['']} />
    );
  }

  render() {
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <View style={styles.chartContainer}>
          <SpinningLoader />
        </View>
      );
    }
    return (
      <View>
        <View style={styles.chartContainer}>
          {this.createChart()}
        </View>
      </View>
    );
  }
}