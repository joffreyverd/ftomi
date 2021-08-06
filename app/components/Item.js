import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'native-base';

export const Item = (props) => {
  const { selectedLineColor, direction, arrival } = props;

  return (
    <>
      <View style={styles.card}>
        <Icon
          active
          name='train'
          style={[{ color: selectedLineColor }, styles.cardContent, styles.iconCard]}
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
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row'
  },
  textCard: {
    color: 'rgb(9, 7, 23)',
    fontSize: 13,
    fontFamily: 'RobotoMedium'
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
    paddingRight: 10
  },
});

export default Item;
