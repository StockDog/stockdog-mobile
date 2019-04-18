import React, { Component } from 'react';
import { Text, View, Animated, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../style/screens/search';
import NavBar from '../components/navbar';
import FormInput from '../components/formInput';
import Icon from 'react-native-vector-icons/Feather';

export default class Search extends Component {
   constructor(props) {
      super(props);
      this.state = {
         text: "",
         top: new Animated.Value(300)
      };

   };

   submitSearch = () => {
      if (this.state.text) {
         Animated.timing(this.state.top, {
            duration: 300,
            toValue: 0,
         }).start(() => Actions.stock({
            type: 'replace', 
            ticker: this.state.text.toUpperCase()
         }));
      }
   }

   render() {
      return (
         <View style={styles.background}>
            <NavBar/>
            <View style={styles.content}>
               <Animated.View style={[styles.horizontal, {top: this.state.top}]}>
                  <FormInput
                     type="search"
                     onchange={(text) => {this.setState({text: text})}}
                     value={this.state.text}
                     returnKeyType="done"
                     onSubmitEditing={this.submitSearch}
                  />
                  <TouchableOpacity onPress={this.submitSearch} style={styles.searchButton}>
                     <Icon name='search' size={24} color='white' />
                  </TouchableOpacity>
               </Animated.View>
            </View>
         </View>
      );
   }
}