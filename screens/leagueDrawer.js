import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import styles from '../style/screens/leagueDrawer';
import WideButton from '../components/widebutton';
import { chooseLeague } from '../actions/portfolioActions';

class LeagueDrawer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         portfolios: [
            {
               id: 1,
               name: 'Weekend League',
               value: 2301.59
            },
            {
               id: 2,
               name: 'Monthly League',
               value: 9512.31
            },
            {
               id: 3,
               name: 'Big Risk League',
               value: 5281.54
            }
         ],
         chosenPortfolio: 2
         // chosenPortfolio: this.props.chosenPortfolio
      }
   }

   renderPortfolio = (portfolio) => {
      portfolio = portfolio.item;
      return (
         <TouchableOpacity style={styles.portfolioListItem} 
            onPress={() => this.setSelected(portfolio.id)}>
            {
               portfolio.id === this.state.chosenPortfolio ? 
                  <View style={styles.chosenMark}/> :
                  <View style={styles.regularMark}/>
            }
            <View style={styles.portfolioText}>
               <Text style={styles.portfolioTitle}>{portfolio.name}</Text>
               <Text style={styles.portfolioValue}>${portfolio.value}</Text>
            </View>
         </TouchableOpacity>
      );
   }

   setSelected = (id) => {
      this.setState({chosenPortfolio: id});
      chooseLeague(id);
   }

   keyExtractor = (item, index) => index.toString();

   navToAddLeague = () => {
      Actions.addportfolio();
   }

   render() {
      return (
         <View style={styles.background}>
            <FlatList
               keyExtractor={this.keyExtractor}
               data={this.state.portfolios}
               // data={this.props.portfolios}
               renderItem={this.renderPortfolio}
               style={styles.portfolioList}
               extraDate={this.state}/>
            <View style={styles.buttonContainer}>
               <TouchableOpacity style={styles.addLeagueButton}
                  onPress={this.navToAddLeague}>
                  <Text style={styles.buttonText}>Add League</Text>
               </TouchableOpacity>
            </View>
         </View>
      );
   }
};


const mapStateToProps = state => ({
   portfolios: state.portfolio.portfolios,
   chosenPortfolio: state.portfolio.leagueID
});

export default connect(mapStateToProps, { chooseLeague })(LeagueDrawer);