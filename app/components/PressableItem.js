import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button, Icon } from 'native-base';
import * as Animatable from 'react-native-animatable';

export default class PressableItem extends Component {
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
    const {
      getStops, getResult, stop, LineRef, LineName, RouteColor
    } = this.props;

    return (
      <>
        {!stop ? (
          <Animatable.View
            style={styles.buttonView}
            animation={pulse ? 'pulse' : ''}
            onAnimationEnd={() => getStops(LineRef, RouteColor)}
            duration={200}
          >
            <Button
              style={styles.button}
              onPress={() => this.runAnimation()}
            >
              <Icon
                name='train'
                style={{ color: RouteColor }}
              />
              <Text style={styles.text}>{`${LineRef} - ${LineName}`}</Text>
            </Button>
          </Animatable.View>

        ) : (
          <Animatable.View
            style={styles.buttonView}
            animation={pulse ? 'pulse' : ''}
            onAnimationEnd={() => getResult(stop)}
            duration={200}
          >
            <Button
              style={styles.button}
              onPress={() => this.runAnimation()}
            >
              <Text style={styles.text}>{stop}</Text>
            </Button>
          </Animatable.View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  buttonView: {
    width: '100%',
    paddingBottom: 10
  },
  button: {
    backgroundColor: '#fff',
    width: '95%',
    marginRight: 'auto',
    marginLeft: 'auto',
    height: 70,
    marginTop: 15,
    borderRadius: 15
  },
  text: {
    width: '100%',
    color: 'rgb(9, 7, 23)',
    fontSize: 13,
    paddingLeft: 10,
    fontFamily: 'Roboto_medium'
  }
});
