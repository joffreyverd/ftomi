import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon } from 'native-base';

export const ComeBack = (props) => {
  const { erasePreviousResult } = props;
  return (
    <>
      <Button style={styles.floatingComeBack} onPress={erasePreviousResult}>
        <Icon name='arrow-back' style={styles.arrowIcon} />
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  floatingComeBack: {
    width: 80,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#ee6e73',
    position: 'absolute',
    bottom: 65,
    right: 9,
  },
  arrowIcon: {
    color: 'red',
    marginRight: 'auto',
    marginLeft: 'auto'
  }
});

export default ComeBack;
