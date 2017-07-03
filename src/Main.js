import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import axios from 'axios';
import timer from 'react-native-timer';

import Camera from './Camera';

// import OneSignal from 'react-native-onesignal';
// Import package from node modules
import packageJSON from '../package.json';

import Response from './Response';

import AnimatedSelect from './AnimatedSelect';

// Endpoints
const cloudVision = `https://vision.googleapis.com/v1/images:annotate?key=${packageJSON.cloudAPI}`;
const translateApi = `https://translation.googleapis.com/language/translate/v2?key=${packageJSON.cloudAPI}`;

export default class main extends Component<void, *, void> {
  constructor(props) {
    super(props);
    this.state = {
      captureText: '...',
      targetLanguage: 'de',
      activeIndex: 0,
      count: 0
    };
    this.takePicture = this.takePicture.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.toggleLogoVisibility = this.toggleLogoVisibility.bind(this);
    timer.setInterval(this, 'takePicture', () => this.takePicture(), 1000);
    timer.setInterval(this, 'clearInterval', () => this.clearInterval(), 30000);
    timer.setInterval(this, 'logovisible', () => this.toggleLogoVisibility(), 800);
  }
  componentWillUnmount() {
    timer.clearInterval(this);
  }
  toggleLogoVisibility() {
    this.setState({
      toggleLogoVisibility: !this.state.toggleLogoVisibility
    });
  }
  changeLanguage({ activeIndex, targetLanguage }) {
    this.setState({
      activeIndex,
      targetLanguage,
      captureText: '',
      done: false
    });
  }
  async clearInterval() {
    timer.clearInterval(this);
    this.setState({
      done: true,
      captureText: '',
    });
  }
  async takePicture() {
    const self = this;
    try {
      const image64 = await this.camera.capture();

      const response = await axios.post(cloudVision, {
        requests: [
          {
            image: {
              content: image64.data,
            },
            features: [{
              type: 'TEXT_DETECTION',
              maxResults: 1,
            }],
          },
        ],
      });
      // move to the @google-cloud-platform API!
      if (response.data.responses[0] && response
          .data
          .responses[0]
          .textAnnotations) {
        const textAnnotations = response
          .data
          .responses[0]
          .textAnnotations[0];

        const { description: captureText } = textAnnotations;

        try {
          const translationResponse = await axios.post(translateApi, {
            q: captureText,
            target: self.state.targetLanguage
          });

          if (!this.state.done) {
            self.setState({
              captureText: translationResponse
                .data
                .data
                .translations[0]
                .translatedText
            });
          }
        } catch (ex) {
          // show the text without translation
          self.setState({
            captureText
          });
          // console.log(ex);
        }
      }
    } catch (ex) {
      // console.log(ex);

    }
  }

  render() {
    return (
      <Camera
        setCam={(cam) => {
          this.camera = cam;
        }}
      >
        {!this.state.done && this.state.toggleLogoVisibility && <Image
          style={[styles.imageOnAir]}
          source={require('../assets/onair.png')}
        />}
        <Text style={styles.version}>v{packageJSON.version}</Text>
        <Image
          style={[styles.cloudLogo]}
          source={require('../assets/cloud_logo.png')}
        />
        <Response>
          {!this.state.done && <Text style={styles.descriptionText}>
              {this.state.captureText}
          </Text>}
          {this.state.done && <Image style={styles.image} source={require('../assets/demo.jpg')} />}
        </Response>
        {!this.state.done && <View style={styles.selectorContainer}>
          <AnimatedSelect
            changeLanguage={this.changeLanguage}
            activeIndex={this.state.activeIndex}
          />
        </View>}
      </Camera>
    );
  }
}

const styles = StyleSheet.create({
  descriptionText: {
    elevation: 1,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'yellow',
  },
  image: {
    opacity: 0.9,
    height: 300,
    width: 350
  },
  imageOnAir: {
    position: 'absolute',
    top: 100,
    width: 60,
    opacity: 0.3,
    height: 40,
    left: (Dimensions.get('window').width / 2) - 30,
  },
  version: {
    color: 'yellow',
    fontSize: 12,
    position: 'absolute',
    top: 0,
    opacity: 0.7,
    right: 10
  },
  time: {
    color: 'yellow',
    fontSize: 36,
    padding: 22,
    alignSelf: 'center',
    textAlign: 'center'
  },
  notification: {
    color: 'yellow',
    fontSize: 16,
    alignSelf: 'center',
    padding: 22
  },
  cloudLogo: {
    position: 'absolute',
    top: 0,
    width: 160,
    height: 100,
    left: (Dimensions.get('window').width / 2) - 80,
    opacity: 0.6
  },
  selectorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    right: 10,
  },
});
