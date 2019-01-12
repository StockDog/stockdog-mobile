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
   backgroundCircle: {
      flex: 0,
      backgroundColor: colors.bright,
      width: width * 4,
      height: height * 1.82,
      position: 'absolute',
      top: height * -1.55,
      right: width * -1.1,
      zIndex: -1,
      borderBottomLeftRadius: 1978/2,
      borderBottomRightRadius: 1978/2
   },
   iconHeaders: {
      flex: 0.1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingLeft: 20,
      paddingRight: 20,
   },
   titleContainer: {
      flex: 0.15,
      // backgroundColor: 'pink',
      justifyContent: 'center',
      alignItems: 'center'
   },
   form: {
      flex: 0.75,
      // backgroundColor: 'yellow',
      marginTop: height * 0.05,
      justifyContent: 'space-between'
   },
   // ----------------- Text ------------- //
   title: {
      fontFamily: 'assistant',
      fontSize: 42,
      color: colors.white
   },
   
});