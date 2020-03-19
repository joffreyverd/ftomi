import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Body, Icon } from 'native-base';

export const Headr = () => (
  <Header style={styles.header}>
    <Body>
      <Icon name='train' style={styles.headerTitle} />
    </Body>
  </Header>
);

const styles = StyleSheet.create({
  header: {
    paddingTop: 25,
    height: 80,
    backgroundColor: 'rgb(94,92,230)'
  },
  headerTitle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#fff'
  }
});

export default Headr;
