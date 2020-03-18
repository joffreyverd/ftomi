import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';

import Search from './Search';
import Geolocation from './Geolocation';
import Headr from '../components/Headr';
import Footr from '../components/Footr';

export default class ManualSearch extends Component {
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
            <Search />
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
