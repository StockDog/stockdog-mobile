import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from '../style/screens/feed';

export default class FeedHeader extends Component {

   getHeaderStatusStyle = (chosenFeedType) => {
     const { feedType } = this.props;
     return feedType === chosenFeedType ? 
       styles.chosenHeader : 
       styles.notChosenHeader;
   }

   render() {
     const { switchFeedType } = this.props;
     return (
       <View style={styles.headerRow}>
         <TouchableOpacity 
           style={this.getHeaderStatusStyle('activity')}
           onPress={() => switchFeedType('activity')}
         >
           <Text style={styles.headerText}>Activity</Text>
         </TouchableOpacity>
         <TouchableOpacity 
           style={this.getHeaderStatusStyle('ideas')}
           onPress={() => switchFeedType('ideas')}
         >
           <Text style={styles.headerText}>Ideas</Text>
         </TouchableOpacity>
       </View>
     );
   }
}