import React, { PureComponent } from 'react';

import Camera from 'react-native-camera';

import {
  StatusBar,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';

export default class MyCamera extends PureComponent<void, *, void> {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden
        />
        <Camera
          ref={(cam) => {
            this.props.setCam(cam);
          }}
          captureQuality={Camera.constants.CaptureQuality['480p']}
          captureTarget={Camera.constants.CaptureTarget.memory}
          playSoundOnCapture={false}
          jpegQuality={40}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
        />
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});
