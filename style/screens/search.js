import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../colors.js';


export default styles = StyleSheet.create({
   background: {
      flex: 1,
      backgroundColor: colors.dark,
      alignItems: 'center'
   },
   content: {
      flex: 0.9,
      justifyContent: 'center'
   },
   horizontal: {
      flexDirection: 'row',
      position: 'absolute',
      top: 300,
      bottom: 0,
      // right: -200,
      left: -140
   },
   searchButton: {
      marginTop: 20
   }
});