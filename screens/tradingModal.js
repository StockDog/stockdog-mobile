import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Lightbox from '../components/baseLightbox';
import { Actions } from 'react-native-router-flux';
import { colors } from '../style/colors';
import styles from '../style/screens/tradingmodal';
import { tradeStock } from '../api';

export default class TradingModal extends Component {
   constructor(props) {
      super(props);
      this.state = {
         action: '',
         price: '',
         amount: '',
         complete: false
      };
   }

   executeTrade = () => {
      const props = this.props.navigation.state.params;
      tradeStock(
         parseInt(this.state.amount), 
         props.ticker, 
         this.state.action.toUpperCase()
      ).then((res) => {
         this.setState({complete: true});
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
      var props = this.props.navigation.state.params;

      if (this.state.complete) {
         return (
            <Lightbox verticalPercent={0.5} horizontalPercent={0.8}>
               <View style={styles.outermostBaseContainer}>
                  <Text style={styles.successMessageText}>
                     Nice trade! {"\n"}
                     You just {this.state.action === 'Buy' ? 'bought ' : 'sold '}  
                     {this.state.amount} shares of {props.ticker}.
                  </Text>
               </View>
            </Lightbox>
         )
      }
      var buyingPower = props.buyingPower.toFixed(2);
      var price = props.price;
      var total = this.state.amount ? price * parseInt(this.state.amount) : 0;
      total = total.toFixed(2);

      var isDisabled = !(this.state.amount && this.state.action) 
         || this.state.amount <= 0;
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
                  Buying Power: ${buyingPower}
               </Text>
            </View>
            <View style={styles.inputs}>
               <Text style={styles.buyingPowerText}>
                  Current Price: ${price}
               </Text>
               <ButtonGroup
                  onPress={this.onChangeAction}
                  selectedIndex={this.state.actionIndex}
                  buttons={['Buy', 'Sell']}
                  containerStyle={styles.tradingButtonGroup}
                  textStyle={styles.buttonText}
                  buttonStyle={styles.transparentBackground}
                  selectedButtonStyle={styles.buttonGroupSelected}
                  selectedTextStyle={{color: 'white'}}/>
               <TextInput
                  style={styles.amountInput}
                  keyboardType="number-pad"
                  placeholder="Amount"
                  placeholderColor={colors.grey}
                  value={this.state.amount}
                  onChangeText={(amt) => {this.setState({amount: amt})}}
                  returnKeyType="done"/>
            </View>
            <View style={styles.total}>
               <Text style={styles.totalText}>Total: ${total}</Text>
            </View>
            <TouchableOpacity style={buttonStyle} onPress={this.executeTrade}>
               <Text style={buttonTextStyle}>Execute</Text>
            </TouchableOpacity>
         </Lightbox>
      );
   }
};
