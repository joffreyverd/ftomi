import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Body, Title } from 'native-base';


export const PersonalHeader = () => (
  <Header style={styles.header}>
    <Body>
      <Title style={styles.headerTitle}>Strambourg</Title>
    </Body>
  </Header>
);

const styles = StyleSheet.create({
  header: {
    paddingTop: 25,
    height: 80,
    backgroundColor: 'rgb(105,92,230)'
  },
  headerTitle: {
    marginLeft: 30
  }
});

export default PersonalHeader;
