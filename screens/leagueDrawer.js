import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import styles from '../style/screens/leagueDrawer';
import { chooseLeague, updatePortfolios } from '../actions/portfolioActions';

class LeagueDrawer extends Component {
   constructor(props) {
      super(props);
   }

   componentDidMount() {
      if (!this.props.chosenLeague) {
         this.props.chooseLeague(Object.keys(this.props.portfolios)[0]);
      }
      this.pollPortfolios();
   }

   pollPortfolios = () => {
      this.props.updatePortfolios();
      setTimeout(this.pollPortfolios.bind(this), 10000);
   }

   renderPortfolio = (portfolio) => {
      portfolio = portfolio.item;
      return (
         <TouchableOpacity style={styles.portfolioListItem} 
            onPress={() => this.setSelected(portfolio.id)}>
            {
               portfolio.leagueId === parseInt(this.props.chosenLeague) ? 
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
      this.props.chooseLeague(id);
   }

   keyExtractor = (item, index) => index.toString();

   navToAddLeague = () => {
      Actions.addportfolio();
   }

   render() {
      var portfolios = Object.values(this.props.portfolios);
      return (
         <View style={styles.background}>
            <FlatList
               keyExtractor={this.keyExtractor}
               data={portfolios}
               renderItem={this.renderPortfolio}
               style={styles.portfolioList}/>
               
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
   chosenLeague: state.portfolio.leagueID
});

export default connect(mapStateToProps, { chooseLeague, updatePortfolios })(LeagueDrawer);