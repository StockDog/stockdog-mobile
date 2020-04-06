import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Text, TouchableOpacity, View, TextInput, 
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import colors from '../style/colors';
import styles from '../style/screens/tradingmodal';
import { tradeStock } from '../api';
import SpinningLoader from '../components/spinningloader';

const TradingModal = ({
  portfolios, chosenLeague, updateOwnedAmt, price, ticker, visible, closeModal
}) => {
  const [action, setAction] = useState("");
  const [amount, setAmount] = useState("");
  const [complete, setComplete] = useState(false);
  const [actionIndex, setActionIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const buyingPower = portfolios[chosenLeague].buyPower;

  const exitModal = () => {
    console.log('exiting modal');
    setComplete(false);
    setActionIndex(null);
    setAmount('');
    closeModal();
  }

  const executeTrade = async () => {

    const isDisabled = !(amount && action) || amount <= 0;
    if (isDisabled) {
      alert('Please make sure all required options and fields are complete.');
      return;
    }

    try {
      await tradeStock(
        parseInt(amount, 10),
        ticker,
        action.toUpperCase(),
        portfolios[chosenLeague].id,
      );
      setComplete(true);
      setLoading(false);
      // Give negative amount if selling
      updateOwnedAmt(
        action === 'Buy' ? parseInt(amount, 10) : parseInt(amount, 10) * -1,
      );
    } catch (err) {
      setLoading(false);
      alert(Object.values(err.response.data)[0]);
    }
  };

  const onChangeAction = (actionIndex) => {
    const actions = ['Buy', 'Sell'];
    setActionIndex(actionIndex);
    setAction(actions[actionIndex]);
  };

  if (!buyingPower && !price && !ticker) {
    alert("Please reload the app.");
    return <View />;
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

  const numShares = tickerInPortfolio[0]
    ? tickerInPortfolio[0].shareCount
    : 0;

  let modalContents;

  if (complete) {
    modalContents = (
      <Fragment>
        <Text style={styles.successMessageText}>
          {`You just ${
            action === 'Buy' ? 'bought ' : 'sold '
            } ${amount} shares of ${ticker}.`}
        </Text>
      </Fragment>
    );
  }
  else {
    modalContents = (
      <Fragment>
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
            onPress={onChangeAction}
            selectedIndex={actionIndex}
            buttons={['Buy', 'Sell']}
            containerStyle={styles.tradingButtonGroup}
            textStyle={styles.buttonText}
            // buttonStyle={styles.transparentBackground}
            selectedButtonStyle={styles.buttonGroupSelected}
            selectedTextStyle={{ color: colors.white }}
          />
          <TextInput
            style={styles.amountInput}
            keyboardType="number-pad"
            placeholder="Amount"
            color={colors.white}
            placeholderColor={colors.ultraLightGrey}
            value={amount}
            onChangeText={(amt) => {
              setAmount(amt);
            }}
            returnKeyType="done"
            textAlign="center"
          />
        </View>
        <View style={styles.total}>
          <Text style={styles.totalText}>
            Total: $
          {total}
          </Text>
        </View>
        <View style={styles.execute}>
          {loading ? (
            <SpinningLoader color="grey" />
          ) : (
              <TouchableOpacity style={buttonStyle} onPress={executeTrade}>
                <Text style={buttonTextStyle}>Execute</Text>
              </TouchableOpacity>
            )}
        </View>
      </Fragment>
    )
  }

  return (
    <View>
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.outermostBaseContainer}>
          <View style={styles.baseModal}>
            <View style={styles.modalHeaders}>
              <TouchableOpacity onPress={exitModal}>
                <Feather name="x" size={30} color="white" />
              </TouchableOpacity>
            </View>
            {modalContents}
          </View>
        </View>
      </Modal>
    </View>
  );

}

const mapStateToProps = (state) => ({
  portfolios: state.portfolioAndLeague.portfolios,
  chosenLeague: state.portfolioAndLeague.leagueId,
});

export default connect(mapStateToProps)(TradingModal);
