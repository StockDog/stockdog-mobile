import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../style/components/navbar';

const openDrawer = () => {
  Actions.drawerOpen();
};

const NavBar = () => (
  <View style={styles.iconHeaders}>
    <TouchableOpacity onPress={openDrawer}>
      <Icon name="menu" size={30} color="white" />
    </TouchableOpacity>
    <TouchableOpacity>
      <Icon name="settings" size={30} color="white" />
    </TouchableOpacity>
  </View>
);

export default NavBar;
