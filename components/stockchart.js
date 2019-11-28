import React, { Component } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from '../style/components/stockchart';

const formatExchange = (exchange) => {
  if (exchange === 'New York Stock Exchange') return 'NYSE';
  return exchange;
};

export default class StockChart extends Component {
  createChart() {
    const { ticker, exchange } = this.props;

    const formattedExchange = formatExchange(exchange);

    const htmlContent = `
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0">
      <div class="tradingview-widget-container">
        <div id="tradingview_a1a38"></div>
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
        <script type="text/javascript">
        new TradingView.widget(
        {
        "width": "100%",
        "height": "100%",
        "symbol": "${formattedExchange}:${ticker}",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "Light",
        "style": "2",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_top_toolbar": true,
        "hide_legend": true,
        "save_image": false,
        "container_id": "tradingview_a1a38"
      }
        );
        </script>
      </div>
      <style>body {margin: 0;} .tradingview-widget-copyright {display: hidden}</style>
    `;

    return (
      <WebView
        style={styles.webView}
        originWhitelist={[
          'https://s.tradingview.com*',
          'https://www.google.com',
        ]}
        source={{ html: htmlContent }}
        scrollEnabled={false}
      />
    );
  }

  render() {
    return (
      <View>
        <View style={styles.chartContainer}>{this.createChart()}</View>
      </View>
    );
  }
}
