import React from 'react';
import {
  Animated,
  StyleSheet,
  Easing,
  ScrollView
} from 'react-native';

import { decorator as sensors } from 'react-native-sensors';

type Props = {
  Accelerometer: Object,
  children: any
}
class ResponseText extends React.PureComponent<void, Props, void> {

  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
  }

  componentWillReceiveProps() {
    // this.spinValue.setValue(0)
    if (this.props.Accelerometer) {
      Animated.timing(
        this.spinValue,
        {
          toValue: -this.props.Accelerometer.z,
          duration: 800,
          easing: Easing.easeInOutQuad
        }).start();
    }
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [-12, 12],
      outputRange: ['-32deg', '32deg']
    });
    return (
      <Animated.View style={[styles.container, {
        transform: [
          {
            rotateX: spin
          }
        ]
      }]
      }
      >
        <ScrollView style={{ height: 300 }}>
          {
          this.props.children
        }
        </ScrollView>
      </Animated.View>
    );
  }
}

export default sensors({
  Accelerometer: {
    updateInterval: 1200, // optional
  },
  Gyroscope: false,
})(ResponseText);


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    opacity: 0.6,
    backgroundColor: '#263238',
    borderWidth: 1,
    borderColor: '#FFECB3',
    bottom: 80,
    left: 12,
    right: 12,
  },
});
