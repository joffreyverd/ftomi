import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Root, Button, Text } from 'native-base';

export default class SearchButton extends Component {
  getData = (typeOf, getLines, getDirections, getStops) => {
      if (typeOf === 'Lignes') {
          getLines(typeOf);
      }
      if (typeOf === 'Destinations') {
          getDirections(typeOf);
      }
      if (typeOf === 'Arrêts') {
          getStops(typeOf);
      }
  }

  render() {
      const {
          typeOf, getLines, getDirections, getStops
      } = this.props;

      return (
          <Root>
              <Button
                  block
                  style={styles.button}
                  onPress={() => this.getData(typeOf, getLines, getDirections, getStops)}
            >
                  <Text>{typeOf}</Text>
            </Button>
        </Root>
      );
  }
}

const styles = StyleSheet.create({
    button: {
        width: 150,
        backgroundColor: 'rgb(94,60,230)'
    }
});
