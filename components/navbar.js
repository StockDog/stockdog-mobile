import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Feather } from '@expo/vector-icons';
import styles from '../style/components/navbar';

const openDrawer = () => {
  Actions.drawerOpen();
};

const NavBar = () => (
  <View style={styles.iconHeaders}>
    <TouchableOpacity onPress={openDrawer}>
      <Feather name="menu" size={30} color="white" />
    </TouchableOpacity>
    <TouchableOpacity>
      <Feather name="settings" size={30} color="white" />
    </TouchableOpacity>
  </View>
);

export default NavBar;
