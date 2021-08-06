import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';

export default class Geolocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView>
        <Text style={styles.text}>Fonctionnalité en cours de développement :)</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    width: 300,
    height: 40,
    textAlign: 'center',
    paddingBottom: '10%',
    paddingTop: '10%',
    marginTop: '50%',
    marginBottom: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 15,
    backgroundColor: '#fff',
    color: 'rgb(9, 7, 23)',
    fontSize: 20,
    fontFamily: 'RobotoLight'
  }
});
