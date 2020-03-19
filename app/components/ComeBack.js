import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';

export const ComeBack = (props) => {
  const { erasePreviousResult } = props;
  return (
    <>
      <Button style={styles.floatingComeBack} onPress={erasePreviousResult}>
        <Text uppercase={false} style={styles.text}>Accueil</Text>
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  floatingComeBack: {
    width: 140,
    height: 55,
    borderRadius: 15,
    backgroundColor: 'rgb(94,92,230)',
    position: 'absolute',
    bottom: 65,
    right: 9,
  },
  text: {
    color: '#fff',
    marginRight: 'auto',
    marginLeft: 'auto'
  }
});

export default ComeBack;
