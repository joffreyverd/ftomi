import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';

export const BreadCrumb = (props) => {
  const { message } = props;
  return (
    <>
      <Text style={styles.process}>{message}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  process: {
    padding: 15,
    backgroundColor: '#fff',
    color: 'rgb(9, 7, 23)',
    fontSize: 15,
    fontFamily: 'Roboto_medium'
  }
});

export default BreadCrumb;
