import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Lightbox from '../components/baseLightbox';
import colors from '../style/colors';
import styles from '../style/screens/tradingmodal';
import { tradeStock } from '../api';

export default class TradingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: '',
      amount: '',
      complete: false
    };
  }

  executeTrade = () => {
    const { amount, action } = this.state;
    const { navigation } = this.props;
    const props = navigation.state.params;
    tradeStock(
      parseInt(amount),
      props.ticker,
      action.toUpperCase()
    ).then(() => {
      this.setState({ complete: true });
    }).catch((err) => {
      alert(Object.values(err.response.data)[0]);
    });
  }

  onChangeAction = (actionIndex) => {
    const actions = ['Buy', 'Sell'];
    this.setState({
      actionIndex: actionIndex,
      action: actions[actionIndex]
    });
  }

  render() {
    const { navigation } = this.props;
    const { buyingPower, price, ticker } = navigation.state.params;
    const { complete, action, amount, actionIndex } = this.state;

    if (complete) {
      return (
        <Lightbox verticalPercent={0.5} horizontalPercent={0.8}>
          <View style={styles.outermostBaseContainer}>
            <Text style={styles.successMessageText}>
              {`Nice trade!\n You just $${action === 'Buy' ? 'bought ' : 'sold '} $${amount} shares of ${ticker}.`}
            </Text>
          </View>
        </Lightbox>
      )
    }
    var total = amount ? price * parseInt(amount) : 0;
    total = total.toFixed(2);

    var isDisabled = !(amount && action)
      || amount <= 0;
    var buttonStyle = isDisabled ?
      styles.disabledExecuteButton :
      styles.executeButton;
    var buttonTextStyle = isDisabled ?
      styles.disabledExecuteButtonText :
      styles.executeButtonText;

    return (
      <Lightbox verticalPercent={0.5} horizontalPercent={0.8}>
        <View style={styles.buyingPower}>
          <Text style={styles.buyingPowerText}>
            Buying Power: $
            {buyingPower.toFixed(2)}
          </Text>
        </View>
        <View style={styles.inputs}>
          <Text style={styles.buyingPowerText}>
            Current Price: $
            {price}
          </Text>
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
            onChangeText={(amt) => { this.setState({ amount: amt }) }}
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
