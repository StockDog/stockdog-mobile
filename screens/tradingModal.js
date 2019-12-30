import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text, TouchableOpacity, View, TextInput,
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Lightbox from '../components/baseLightbox';
import colors from '../style/colors';
import styles from '../style/screens/tradingmodal';
import { tradeStock } from '../api';

class TradingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: '',
      amount: '',
      complete: false,
    };
  }

  executeTrade = async () => {
    const { amount, action } = this.state;
    const {
      navigation, portfolios, chosenLeague, updateOwnedAmt,
    } = this.props;
    const props = navigation.state.params;
    try {
      await tradeStock(
        parseInt(amount, 10),
        props.ticker,
        action.toUpperCase(),
        portfolios[chosenLeague].id,
      );
      this.setState({ complete: true });
      // Give negative amount if selling
      updateOwnedAmt(
        action === 'Buy' ? parseInt(amount, 10) : parseInt(amount, 10) * -1,
      );
    } catch (err) {
      alert(Object.values(err.response.data)[0]);
    }
  };

  onChangeAction = (actionIndex) => {
    const actions = ['Buy', 'Sell'];
    this.setState({
      actionIndex,
      action: actions[actionIndex],
    });
  };

  render() {
    const {
      price, ticker, portfolios, chosenLeague,
    } = this.props;

    const {
      complete, action, amount, actionIndex,
    } = this.state;

    const buyingPower = portfolios[chosenLeague].buyPower;

    if (!buyingPower && !price && !ticker) {
      return <Lightbox verticalPercent={0.5} horizontalPercent={0.8} />;
    }

    if (complete) {
      return (
        <Lightbox verticalPercent={0.5} horizontalPercent={0.8}>
          <View style={styles.outermostBaseContainer}>
            <Text style={styles.successMessageText}>
              {`You just ${
                action === 'Buy' ? 'bought ' : 'sold '
              } ${amount} shares of ${ticker}.`}
            </Text>
          </View>
        </Lightbox>
      );
    }
    let total = amount ? price * parseInt(amount, 10) : 0;
    total = total.toFixed(2);

    const isDisabled = !(amount && action) || amount <= 0;
    const buttonStyle = isDisabled
      ? styles.disabledExecuteButton
      : styles.executeButton;
    const buttonTextStyle = isDisabled
      ? styles.disabledExecuteButtonText
      : styles.executeButtonText;

    const tickerInPortfolio = portfolios[chosenLeague].items.filter(
      (portfolioItem) => portfolioItem.ticker === ticker,
    );

    const numShares = tickerInPortfolio ? tickerInPortfolio[0].shareCount : 0;

    return (
      <Lightbox verticalPercent={0.5} horizontalPercent={0.8}>
        <View style={styles.buyingPower}>
          <Text style={styles.buyingPowerText}>
            Buying Power: $
            {buyingPower.toFixed(2)}
          </Text>
          <Text style={styles.buyingPowerText}>
            {`Current Price: $${price}`}
          </Text>
          <Text style={styles.buyingPowerText}>
            {`Currently Owned: ${numShares} shares`}
          </Text>
        </View>
        <View style={styles.inputs}>
          <ButtonGroup
            onPress={this.onChangeAction}
            selectedIndex={actionIndex}
            buttons={['Buy', 'Sell']}
            containerStyle={styles.tradingButtonGroup}
            textStyle={styles.buttonText}
            buttonStyle={styles.transparentBackground}
            selectedButtonStyle={styles.buttonGroupSelected}
            selectedTextStyle={{ color: 'white' }}
          />
          <TextInput
            style={styles.amountInput}
            keyboardType="number-pad"
            placeholder="Amount"
            placeholderColor={colors.grey}
            value={amount}
            onChangeText={(amt) => {
              this.setState({ amount: amt });
            }}
            returnKeyType="done"
          />
        </View>
        <View style={styles.total}>
          <Text style={styles.totalText}>
Total: $
            {total}
          </Text>
        </View>
        <TouchableOpacity style={buttonStyle} onPress={this.executeTrade}>
          <Text style={buttonTextStyle}>Execute</Text>
        </TouchableOpacity>
      </Lightbox>
    );
  }
}

const mapStateToProps = (state) => ({
  portfolios: state.portfolio.portfolios,
  chosenLeague: state.portfolio.leagueId,
});

export default connect(mapStateToProps)(TradingModal);
