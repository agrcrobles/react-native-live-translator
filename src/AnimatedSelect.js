import React, { Component } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  PanResponder
} from 'react-native';

const supportedLanguages = [
  {
    key: 'de',
    src: require('../assets/de.png'),
  },
  {
    key: 'ca',
    src: require('../assets/ca.png'),
  },
  {
    key: 'en',
    src: require('../assets/en.png'),
  },
  {
    key: 'es',
    src: require('../assets/es.png'),
  },
];

export default class AnimatedSelect extends Component<*, *, *> {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x,
          // dy: this.state.pan.y
        },
      ]),
      onPanResponderRelease: (e, gesture) => {
        const { dx } = gesture;
        Animated.spring(this.state.pan, {
          toValue: 0,
          // cannot use animated driver because left is not supported by native
          // animated module
          // useNativeDriver: true
        }).start();

        let newIndex;


        if (dx > 0) {
          // SWIPE RIGHT
          if (supportedLanguages.length === this.props.activeIndex + 1) {
            newIndex = 0;
          } else {
            newIndex = this.props.activeIndex + 1;
          }
        } else {
          // SWIPE LEFT
          if (this.props.activeIndex === 0) {
            newIndex = supportedLanguages.length - 1;
          } else {
            newIndex = this.props.activeIndex - 1;
          }
        }

        this.props.changeLanguage({
          activeIndex: newIndex,
          targetLanguage: supportedLanguages[newIndex].key
        });
      },
    });
  }

  renderImage(language, i) {
    if (i === this.props.activeIndex) {
      return <Image key={i} style={styles.image} source={language.src} />;
    }
    return null;
  }
  render() {
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[this.state.pan.getLayout(), styles.container]}
      >
        {supportedLanguages.map((des, i) => this.renderImage(des, i))}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 10
  },
  image: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
});
