import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ButtonGroup } from 'react-native-elements';
import styles from '../style/screens/stock';
import StockChart from '../components/stockchart';
import NavBar from '../components/navbar';
import { getStockHistory } from '../api';

const lengthMap = {
   'D': 'day',
   'M': 'month',
   'Y': 'year'
}

export default class Stock extends Component {
   constructor(props) {
      super(props);
      this.state = {
         length: 'M',
         xData: [],
         yData: [],
         isLoading: true
      };

   };

   componentDidMount() {
      var xData = [];
      var yData = [];
      getStockHistory('AMD', lengthMap[this.state.length]).then((res) => {
         res.data.forEach((val) => {
            var timeStrArray = val.time.split(" ");
            var date = this.state.length === 'D' ? 
               timeStrArray[1].split(":")[0] + ":" + timeStrArray[1].split(":")[1] :
               this.createDateString(timeStrArray)
            xData.push(date);
            yData.push(val.price);
         });
         this.setState({xData, yData, isLoading: false})
      }).catch((err) => console.log(err));
   }

   createDateString = (timeStrArray) => {
      var d = new Date(timeStrArray[0]);
      var mo = d.toLocaleString("en-us", {month: "short"});
      var day = d.toLocaleString("en-us", {day: "numeric"});
      return mo + " " + day;
   }

   openModal() {
      Actions.tradingmodal({ 
         buyingPower: 10,
         total: 0,
         price: 2
      });
   }

   updateIndex(selectedIndex) {

   }

   render() {
      return (
         <View style={styles.background}>
            <NavBar/>
            <View style={styles.stockContent}>
               <View style={styles.tickerContainer}>
                  <Text style={styles.tickerText}>GRPN</Text>
               </View>
               <StockChart xData={this.state.xData} yData={this.state.yData} isLoading={this.state.isLoading}/>
               <ButtonGroup
                  // onPress={this.updateIndex.bind(this)}
                  selectedIndex={0}
                  buttons={['D', 'M', 'Y']}
                  containerStyle={styles.dateRangeButtonGroup}
                  textStyle={text.whiteText}
                  buttonStyle={styles.transparentBackground}
                  selectedButtonStyle={styles.buttonGroupSelected}
                  selectedTextStyle={styles.whiteText}
               />
            </View>
            <View style={styles.tradingBox}>
               <View style={styles.stockInfo}>
                  <View style={styles.stockInfoNumber}>
                     <Text style={styles.number}>13</Text>
                     <Text style={styles.label}>Owned</Text>
                  </View>
                  <View style={styles.stockInfoNumber}>
                     <Text style={styles.number}>$20.15</Text>
                     <Text style={styles.label}>Price</Text>
                  </View>
                  <View style={styles.stockInfoNumber}>
                     <Text style={styles.number}>20M</Text>
                     <Text style={styles.label}>Volume</Text>
                  </View>
               </View>
               <View style={styles.tradingButtonContainer}>
                  <TouchableOpacity style={styles.tradingButton} onPress={this.openModal}>
                     <Text style={styles.tradingButtonText}>Trade</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      );
   }
}