import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text } from 'native-base';

import ComeBack from '../components/ComeBack';
import BreadCrumb from '../components/BreadCrumb';
import SingleResult from '../components/SingleResult';

export default class Result extends Component {
    getTramList = (trams, lineColor) => trams.map((object) => (
      <SingleResult
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
          <BreadCrumb message={`Ligne ${selectedLine} - ${selectedStop}`} />
          <ScrollView>
            <Text style={styles.categorieText}>{`Direction ${hip[0].direction}`}</Text>
            {this.getTramList(hip, lineColor)}
            <Text style={styles.categorieText}>{`Direction ${hop[0].direction}`}</Text>
            {this.getTramList(hop, lineColor)}
          </ScrollView>

          <ComeBack erasePreviousResult={erasePreviousResult} />
        </>
      );
    }
}

const styles = StyleSheet.create({
  categorieText: {
    marginLeft: 15,
    marginTop: 15,
    fontSize: 14
  }
});
