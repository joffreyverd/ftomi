import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Root, Button, Text } from 'native-base';

export default class SearchButton extends Component {
  getData = (typeOf, getLines, getStops, getResult) => {
    if (typeOf === 'Lignes') {
      getLines(typeOf);
    }
    if (typeOf === 'Arrêts') {
      getStops(typeOf);
    }
    if (typeOf === 'Rechercher') {
      getResult(typeOf);
    }
  }

  render() {
    const {
      typeOf, getLines, getStops, getResult
    } = this.props;

    return (
      <Root>
        <Button
          block
          style={styles.button}
          onPress={() => this.getData(typeOf, getLines, getStops, getResult)}
        >
          <Text style={styles.text}>{typeOf}</Text>
        </Button>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 50,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
