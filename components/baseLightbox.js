import React, { Component } from 'react';
import { View, Animated, PanResponder } from 'react-native';
import { Actions } from 'react-native-router-flux';
import modalStyles from '../style/screens/tradingmodal';

export default class BaseLightbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      top: new Animated.Value(500),
      pan: new Animated.ValueXY
    };

    const { pan } = this.state;

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      // Change dx and dy based on screen press for dragging
      onPanResponderMove: Animated.event([null, {
        dx: pan.x,
        dy: pan.y
      }]),
      // Behavior for when touch is released
      onPanResponderRelease: (e, gesture) => {
        // Close modal only if dragged far enough down
        if (this.isInCloseZone(gesture)) {
          this.closeModal();
        }
        else {
          // Not dragged far enough, will bounce back to center
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 }
          }).start();
        }
      }
    });
  }

  componentDidMount() {
    const { top } = this.state;

    // Sliding modal in from the bottom of screen
    Animated.timing(top, {
      duration: 100,
      toValue: 0,
    }).start();
  }

   // Determines the distance lightbox needs to be dragged
   isInCloseZone = (gesture) => {
     return gesture.dy > 200;
   }

   closeModal = () => {
     const { top } = this.state;

     // Sliding modal out to the bottom of the screen
     Animated.timing(top, {
       duration: 100,
       toValue: 500,
     }).start(Actions.pop);
   }

   _renderLightBox = () => {
     const { children } = this.props;
     const { pan } = this.state;
     return (
       <Animated.View
         {...this.panResponder.panHandlers}
         style={[pan.getLayout(), modalStyles.baseModal]}
       >
         <View style={modalStyles.outerModal}>
           <View style={modalStyles.modalHeaders}>
             <View style={modalStyles.swipeline} />
           </View>
           {children}
         </View>
       </Animated.View>
     );
   }

   render() {
     const { top } = this.state;
     return (
       <Animated.View 
         style={[modalStyles.outermostBaseContainer, 
           { top: top }]}
       >
         {this._renderLightBox()}
       </Animated.View>
     );
   }
}