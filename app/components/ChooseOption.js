import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Root, Button, Text } from 'native-base';

export default class ChooseOption extends Component {

  render() {

    const { text, getTramLines } = this.props;

    return (
      <Root>
        <Button
          block
          style={styles.button}
          onPress={() => getTramLines()}>
          <Text>{text}</Text>
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
