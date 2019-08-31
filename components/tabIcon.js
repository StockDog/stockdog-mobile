import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { View } from 'react-native';

const TabIcon = ({ iconName }) => (
  <View style={{
    flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center',
  }}
  >
    <Icon style={{ color: 'white' }} name={iconName || 'circle'} size={25} />
  </View>
);

export default TabIcon;
