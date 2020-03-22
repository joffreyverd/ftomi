import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

import ComeBack from '../components/ComeBack';
import BreadCrumb from '../components/BreadCrumb';
import Item from '../components/Item';

export default class Result extends Component {
    getTramList = (trams, lineColor) => trams.map((object) => (
      <Item
        key={object.id}
        lineColor={lineColor}
        direction={object.direction}
        arrival={object.arrival}
      />
    ))

    render() {
      const {
        hip, hop, lineColor, erasePreviousResult, selectedLine, selectedStop
      } = this.props;

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
                  <Text style={styles.categorieText}>{`Direction ${hip[0].direction}`}</Text>
                  {this.getTramList(hip, lineColor)}
                </>
              )}
              {hop.length > 0 && (
                <>
                  <Text style={styles.categorieText}>{`Direction ${hop[0].direction}`}</Text>
                  {this.getTramList(hop, lineColor)}
                </>
              )}
            </Animatable.View>
          </ScrollView>

          <ComeBack erasePreviousResult={erasePreviousResult} />
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
    fontFamily: 'Roboto_light'
  }
});
