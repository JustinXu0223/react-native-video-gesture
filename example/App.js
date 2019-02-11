/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// components
import RNGesture from 'js-react-native-gesture';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  wrapper: {
    width: '100%',
    height: 400,
    borderWidth: 1,
    borderColor: 'red',
  },
});


class App extends React.Component {
  render() {
    const myPanResponderProps = {
      onStart: data => console.log('@onStart', data),
      onMove: data => console.log('@onMove', data),
      onEnd: data => console.log('@onEnd', data),
      onPress: () => console.log('onPress'),
      onLongPress: () => console.log('onLongPress'),
      onDoublePress: () => console.log('onDoublePress'),
    };
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <View style={styles.wrapper}>
          <RNGesture {...myPanResponderProps} />
        </View>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
      </View>
    );
  }
}

export default App;
