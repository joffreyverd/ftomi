import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';

import Search from '../components/Search';
import PersonalHeader from '../components/PersonalHeader';

export const Main = () => (
  <Container style={styles.container}>
    <PersonalHeader />
    <Search />
  </Container>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c2c2e'
  }
});

export default Main;
