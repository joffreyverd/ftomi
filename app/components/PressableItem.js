import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button, Icon } from 'native-base';

export const PressableItem = (props) => {
  const {
    getStops, getResult, stop, LineRef, LineName, RouteColor
  } = props;

  return (
    <>
      {!stop ? (

        <Button
          style={styles.button}
          onPress={() => getStops(LineRef, RouteColor)}
        >
          <Icon
            name='train'
            style={{ color: RouteColor }}
          />
          <Text style={styles.textButton}>
            {`${LineRef} - ${LineName}`}
          </Text>
        </Button>

      ) : (

        <Button
          style={styles.button}
          onPress={() => getResult(stop)}
        >
          <Text style={styles.textButton}>{stop}</Text>
        </Button>

      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    width: '95%',
    height: 70,
    marginTop: 15,
    borderRadius: 15
  },
  textButton: {
    width: '100%',
    color: 'rgb(9, 7, 23)',
    paddingLeft: 10,
    fontSize: 13,
    fontFamily: 'Roboto_medium'
  }
});

export default PressableItem;
