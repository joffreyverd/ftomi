import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'native-base';
import * as Animatable from 'react-native-animatable';

export default class ComeBack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pulse: false
    };
  }

  runAnimation() {
    const { pulse } = this.state;
    this.setState({ pulse: !pulse });
  }

  render() {
    const { pulse } = this.state;
    const { erasePreviousResult } = this.props;

    return (
      <Animatable.View
        animation={pulse ? 'pulse' : ''}
        onAnimationEnd={erasePreviousResult}
        duration={200}
      >
        <Button
          style={styles.floatingComeBack}
          onPress={() => this.runAnimation()}
        >
          <Text style={styles.text}>Retour</Text>
        </Button>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  floatingComeBack: {
    width: 140,
    height: 55,
    borderRadius: 15,
    backgroundColor: 'rgb(94,92,230)',
    position: 'absolute',
    bottom: 9,
    right: 9,
  },
  text: {
    color: '#fff',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontFamily: 'Roboto_medium'
  }
});
