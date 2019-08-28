import React from 'react';
import { View } from 'react-native';
import SpinningLoader from './spinningloader';
import styles from '../style/components/loadingPortfolio';

const LoadingPortfolio = () => {
  return (
    <View style={styles.background}>
      <SpinningLoader />
    </View>
  )
};

export default LoadingPortfolio;