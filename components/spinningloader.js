import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default class SpinningLoader extends Component {
  constructor(props) {
    super(props);

    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.spin();
  }

  spin = () => {
    this.spinValue.setValue(0);

    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      },
    ).start(() => this.spin());
  };

  render() {
    const { color } = this.props;
    const rotate = this.spinValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

    const spinColor = color || 'white';

    return (
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Feather name="loader" size={48} color={spinColor} />
      </Animated.View>
    );
  }
}
