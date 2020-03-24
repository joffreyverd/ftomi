import React from 'react';
import {
  StyleSheet, ScrollView, Text, Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import ComeBack from '../components/ComeBack';
import BreadCrumb from '../components/BreadCrumb';

export const NoResult = (props) => {
  const { eraseResult, selectedLine, selectedStop } = props;
  return (
    <>
      <BreadCrumb
        message={`Ligne ${selectedLine} - ${selectedStop}`}
      />

      <ScrollView style={styles.view}>
        <Image style={styles.image} source={require('../assets/error.gif')} />
        <Animatable.View
          animation='shake'
          duration={800}
        >
          <Text style={styles.text}>
            Aucun passage n&apos;est prévu à cet arrêt pour le moment.
          </Text>
        </Animatable.View>
      </ScrollView>

      <ComeBack eraseResult={eraseResult} />
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fff'
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  text: {
    width: 300,
    height: 120,
    textAlign: 'center',
    paddingBottom: '10%',
    paddingTop: '10%',
    paddingRight: 20,
    paddingLeft: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 15,
    color: 'rgb(9, 7, 23)',
    fontSize: 20,
    fontFamily: 'Roboto_light'
  }
});

export default NoResult;
