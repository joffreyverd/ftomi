import React from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import Main from './app/views/Main';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFontLoaded: false,
    };
  }

  async componentDidMount() {
    // wait to load fonts before to display something
    await Font.loadAsync({
      RobotoMedium: require('./app/assets/fonts/Roboto-Medium.ttf'),
      RobotoRegular: require('./app/assets/fonts/Roboto-Regular.ttf'),
      RobotoLight: require('./app/assets/fonts/Roboto-Light.ttf')
    });
    this.setState({ isFontLoaded: true });
  }

  render() {
    const { isFontLoaded } = this.state;

    if (!isFontLoaded) {
      return <AppLoading />;
    }

    return (
      <Main />
    );
  }
}
