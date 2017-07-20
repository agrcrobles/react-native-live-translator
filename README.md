# react-native-live-translator

> An augmented reality experiment in react native

![Image of googleplay](https://lh3.googleusercontent.com/fhR9eIkBWnbDZJQXRGRbRndG9b80ZwxzjL19DBqddH4AAZS-y3huZy7w10bk8WxB1JI=w200)

**Try beta release:** https://play.google.com/apps/testing/com.livetranslator

## Overview

A simple and small app that translates in real time what you see from your mobile.

Augmented reality is an overlay of content on the real world, it means to add enhancements to the existing reality in order to make it more meaningful.

With the help of advanced Google Cloud technology such as Cloud Vision, the information and the environment surrounding can become interactive.

It is inspired from [Google's "Giorgio Cam" AI](https://www.youtube.com/watch?v=eKeI63VSpto) and [react-native-camera-translator](https://github.com/DjordjePetrovic/react-native-camera-translator) experiments.

For a thorough discussion, please read the following [blog post](https://blog.hellojs.org/an-augmented-reality-experiment-in-react-native-fc473f6c1b5c) about it.


## Selecting a language.
I created the language selector using snack expo using Animated and PanResponder from react native.

https://snack.expo.io/SkhJOy4B-

## Rotating the dialog

I am also using the mobile accelerometer to create an animated transition in order to improve the user experience when rotating the mobile.

https://snack.expo.io/B1jDvJEH-

https://snack.expo.io/Bk0aqeTSZ

## Quick start

Clone the repository
```
git clone https://github.com/agrcrobles/react-native-live-translator.git
cd react-native-live-translator
```

Run the app
```
react-native run-android # only on android
react-native run-ios # only on ios
```

Prerequisites: Node version 6.0 or higher and npm version 3.0 or higher as well as android or ios running.

More info see: https://facebook.github.io/react-native/docs/getting-started.html

## Configure Google API yourself

* Enable the Cloud Vision API, for doing that, take a look at this [quickstart guide](https://cloud.google.com/vision/docs/quickstart)

* Enable Translate API as explained [here](https://cloud.google.com/translate/docs/translating-text) 

For further information look into [getting started](https://cloud.google.com/translate/docs/getting-started) docs.

* Reminder: After enabling the Google Cloud API, click the Go to Credentials button to set up your Cloud Translation API credentials.

* Finally, add the key in the package.json file of the project

## Supported languages

* en: English
* es: Spanish
* de: Deutsch

## Dependencies

* react-native-camera
* react-native-timer
* [react-native-sensors](https://github.com/react-native-sensors/react-native-sensors#cool-projects-using-react-native-sensors)

## Contribute!! :)

The following improvements and PR could be accepted:

* Improve error handler and encoding
* Move from REST to Google Cloud Translator API. https://cloud.google.com/translate/docs/apis?hl=es-419
* Improved Translate text by using Compute hamming
* An image diff algorithm could be also useful to avoid being overkill when taking and recording a picture.

## Demo

![me playing with the app](https://raw.githubusercontent.com/agrcrobles/react-native-live-translator/master/assets/demo.gif)

## License

MIT
