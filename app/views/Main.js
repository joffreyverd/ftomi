import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';

import Search from '../components/Search';
import PersonalHeader from '../components/PersonalHeader';
import PersonalFooter from '../components/PersonalFooter';

export const Main = () => (
  <Container style={styles.container}>
    <PersonalHeader />
    <Search />
    <PersonalFooter />
  </Container>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(244, 244, 244)'
  }
});

export default Main;
