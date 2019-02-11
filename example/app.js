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
    overflow: 'hidden',
  },
});

class App extends React.Component {
  state = {
    moveData: null,
    endData: null,
    eventName: null,
  };
  render() {
    const {
      state: {
        moveData,
        endData,
        eventName,
      },
    } = this;
    const myPanResponderProps = {
      onMove: data => this.setState({ moveData: data }),
      onEnd: data => this.setState({ endData: data }),
      onPress: () => this.setState({ eventName: 'onPress' }),
      onLongPress: () => this.setState({ eventName: 'onLongPress' }),
      onDoublePress: () => this.setState({ eventName: 'onDoublePress' }),
    };
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <View style={styles.wrapper}>
          <RNGesture {...myPanResponderProps} />
        </View>
        <Text style={styles.instructions}>moveData: {JSON.stringify(moveData)}</Text>
        <Text style={styles.instructions}>endData: {JSON.stringify(endData)}</Text>
        <Text style={styles.instructions}>eventName: {eventName}</Text>
      </View>
    );
  }
}

export default App;
