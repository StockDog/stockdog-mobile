import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View } from 'react-native';

const TabIcon = ({ iconName }) => (
  <View style={{
    flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center',
  }}
  >
    <Feather style={{ color: 'white' }} name={iconName || 'circle'} size={25} />
  </View>
);

export default TabIcon;
