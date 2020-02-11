import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Main from './app/views/Main';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  async componentDidMount() {
    // wait to load fonts before to display something
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isLoaded: true });
  }

  render() {
    const { isLoaded } = this.state;

    if (!isLoaded) {
      return <AppLoading />;
    }

    return (
      <Main />
    );
  }
}
