import React from 'react';
import { View } from 'react-native';
import SpinningLoader from './spinningloader';
import NavBar from './navbar';

//------------------------------STILL AN OLD FILE-------------------------------------//
const LoadingProfile = () => {
  return (
    <View>
      <NavBar />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <SpinningLoader />
      </View>
    </View>
  )
};

export default LoadingProfile;