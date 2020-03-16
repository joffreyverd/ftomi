import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {
  Button, Text, Icon, Row
} from 'native-base';

import ComeBack from './ComeBack';

export default class Result extends Component {
    getTramList = (trams, lineColor) => trams.map((object) => (
      <React.Fragment key={object.id}>
        <Row style={styles.row} key={object.id}>
          <Button style={styles.button}>
            <Icon active name='train' style={{ color: lineColor }} />
            <Text style={styles.textButton}>
              {`${object.direction} - ${object.arrival.toISOString().substr(11, 5)}`}
            </Text>
          </Button>
        </Row>
      </React.Fragment>
    ))

    render() {
      const {
        hip, hop, lineColor, erasePreviousResult, selectedLine, selectedStop
      } = this.props;

      return (
        <>
          <Text style={styles.skeleton}>{`Ligne ${selectedLine} > ${selectedStop}`}</Text>
          <ScrollView>
            <Text style={styles.categorieText}>{hip[0].direction}</Text>
            {this.getTramList(hip, lineColor)}
            <Text style={styles.categorieText}>{hop[0].direction}</Text>
            {this.getTramList(hop, lineColor)}
          </ScrollView>

          <ComeBack erasePreviousResult={erasePreviousResult} />
        </>
      );
    }
}

const styles = StyleSheet.create({
  row: {
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingBottom: 10
  },
  button: {
    backgroundColor: '#fff',
    width: '95%',
    height: 70,
    marginTop: 15,
    borderRadius: 15
  },
  textButton: {
    width: '100%',
    color: '#2c2c2e',
    paddingLeft: 10,
    fontSize: 13,
    fontWeight: 'bold'
  },
  categorieText: {
    marginLeft: 15,
    marginTop: 15,
    fontWeight: 'bold'
  },
  skeleton: {
    margin: 15,
    fontWeight: 'bold'
  }
});
