import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';

import ManualSearch from './ManualSearch';
import Geolocation from './Geolocation';
import Headr from '../components/Headr';
import Footr from '../components/Footr';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manualSearch: true
    };
  }

  switchTabs = (result) => {
    this.setState({ manualSearch: result });
  }

  render() {
    const { manualSearch } = this.state;
    return (
      <>
        <Container style={styles.container}>
          <Headr />

          { manualSearch ? (
            <ManualSearch />
          ) : (
            <Geolocation />
          )}

          <Footr
            manualSearch={manualSearch}
            switchTabs={this.switchTabs}
          />
        </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(244, 244, 244)'
  }
});
