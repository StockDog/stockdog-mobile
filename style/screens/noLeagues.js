import { StyleSheet, PixelRatio, Dimensions } from 'react-native';
import { colors } from '../colors.js';

const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
   background: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: colors.dark,
   },
   buttonContent: {
      flex: 0.9,
      justifyContent: 'center',
      alignItems: 'center'
   },
   button: {
      width: width * 0.7,
      height: 45,
      backgroundColor: colors.bright,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 25
   },
   // ----------------- Text ------------- //
   buttonText: {
      fontFamily: 'assistant',
      fontSize: 24,
      color: colors.white
   }
});