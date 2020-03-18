import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from 'native-base';

export const SingleResult = (props) => {
  const { lineColor, direction, arrival } = props;

  return (
    <>
      <View style={styles.card}>
        <Icon
          active
          name='train'
          style={[{ color: lineColor }, styles.cardContent, styles.iconCard]}
        />
        <Text
          uppercase={false}
          style={[styles.textCard, styles.cardContent, styles.directionCard]}
        >
          {direction}
        </Text>
        <Text
          uppercase={false}
          style={[styles.textCard, styles.cardContent, styles.timeCard]}
        >
          {arrival.toISOString().substr(11, 5)}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    height: 70,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row'
  },
  textCard: {
    color: '#2c2c2e',
    fontSize: 13
  },
  cardContent: {
    marginBottom: 'auto',
    marginTop: 'auto',

  },
  iconCard: {
    width: '15%',
    paddingLeft: 15
  },
  directionCard: {
    width: '60%',
    textAlign: 'left'
  },
  timeCard: {
    width: '25%',
    textAlign: 'right',
    fontWeight: 'bold',
    paddingRight: 10
  },
});

export default SingleResult;
