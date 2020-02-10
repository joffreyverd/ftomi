import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Root, Button, Text } from 'native-base';

export default class ChooseOption extends Component {

  // get(typeOf) {
  //   if (getLines && !getDirections && !getStops) {
  //     () => getLines(typeOf);
  //   }
  //   if (getDirections && !getStops) {
  //     () => getDirections(typeOf);
  //   }
  //   if (getStops) {
  //     () => getStops(typeOf);
  //   }
  // }

  getData = (typeOf, getLines, getDirections, getStops) => {
    if (typeOf === 'Lignes') {
      getLines(typeOf);
    }
    if (typeOf === 'Directions') {
      getDirections(typeOf);
    }
    if (typeOf === 'Arrêts') {
      getStops(typeOf);
    }
  }

  render() {

    const { typeOf, getLines, getDirections, getStops } = this.props;

    return (
      <Root>
        <Button
          block
          style={styles.button}
          onPress={() => this.getData(typeOf, getLines, getDirections, getStops)}>
          <Text>{typeOf}</Text>
        </Button>
      </Root>
    );
  }

}

const styles = StyleSheet.create({
  button:{
    width: 150,
    backgroundColor: 'rgb(94,60,230)'
  }
});
