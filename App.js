import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import PersonalHeader from './components/PersonalHeader';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  async componentDidMount() {
    StatusBar.setHidden(true);
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isLoaded: true });
  }

  render() {
    if (!this.state.isLoaded) {
      return <AppLoading />;
    }

    return (

      <Container style={styles.container}>
        <PersonalHeader/>
        <Text style={styles.text}>Hello there!</Text>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(72,72,74)',
  },
  text: {
    color: '#fff',
  },
});
