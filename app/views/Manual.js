import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';

import Search from './Search';
import Location from './Location';
import PersonalHeader from '../components/PersonalHeader';
import PersonalFooter from '../components/PersonalFooter';

export default class Manual extends Component {
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
          <PersonalHeader />

          { manualSearch ? (
            <Search />
          ) : (
            <Location />
          )}

          <PersonalFooter manualSearch={manualSearch} switchTabs={this.switchTabs} />
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
