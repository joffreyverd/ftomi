import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Header, Body } from 'native-base';

export const Headr = () => (
  <Header style={styles.header}>
    <Body>
      <Image style={styles.headerTitle} source={require('../assets/tramway-header.png')} />
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
    width: 35,
    height: 35
  }
});

export default Headr;
