import React from 'react';
import { StyleSheet, Text } from 'react-native';

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
    fontFamily: 'RobotoMedium'
  }
});

export default BreadCrumb;
