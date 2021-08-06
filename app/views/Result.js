import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

import ComeBack from '../components/ComeBack';
import BreadCrumb from '../components/BreadCrumb';
import Item from '../components/Item';

export default class Result extends Component {
  getTramList = (trams, selectedLineColor) => trams.map((object) => (
    <Item
      key={object.id}
      selectedLineColor={selectedLineColor}
      direction={object.direction}
      arrival={object.arrival}
    />
  ))

  render() {
    const {
      hip, hop, selectedLineColor, eraseResult, selectedLine, selectedStop, lineDirections
    } = this.props;
    const directions = lineDirections.split('- ');

    return (
      <>
        <BreadCrumb
          message={`Ligne ${selectedLine} - ${selectedStop}`}
        />

        <ScrollView style={styles.scrollView}>
          <Animatable.View
            animation='bounceInDown'
            duration={1000}
          >
            {hip.length > 0 && (
              <>
                <Text style={styles.categorieText}>{`Direction ${directions[1]}`}</Text>
                {this.getTramList(hip, selectedLineColor)}
              </>
            )}
            {hop.length > 0 && (
              <>
                <Text style={styles.categorieText}>{`Direction ${directions[0]}`}</Text>
                {this.getTramList(hop, selectedLineColor)}
              </>
            )}
          </Animatable.View>
        </ScrollView>

        <ComeBack eraseResult={eraseResult} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 50
  },
  categorieText: {
    marginLeft: 15,
    marginTop: 10,
    fontSize: 15,
    fontFamily: 'RobotoLight'
  }
});
