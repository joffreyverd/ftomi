import React, { Component } from 'react';
import { StyleSheet, Alert, Text } from 'react-native';
import { Grid, Row, ActionSheet } from 'native-base';

import SearchButton from './SearchButton';
import api from '../helpers/http';
import stopPoints from '../data/stopPoints.json';
import lines from '../data/lines.json';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLine: null,
      selectedStop: null,
      buttonTitles: ['Lignes', 'Arrêts', 'Rechercher']
    };
  }

    getLines = (typeOf) => {
      const names = [];
      for (let i = 0; i < Object.keys(lines).length; i += 1) {
        names[i] = `${lines[i].LineRef} - ${lines[i].LineName}`;
      }
      ActionSheet.show({
        options: names,
        title: typeOf
      },
      (buttonIndex) => {
        this.loadData(names[buttonIndex], null);
      });
    }

    getStops = (typeOf) => {
      let stopPointsToDisplay = [];
      const { selectedLine } = this.state;
      const lineRef = selectedLine.charAt(0);

      if (lineRef === 'A') {
        stopPointsToDisplay = stopPoints.A;
      }
      if (lineRef === 'B') {
        stopPointsToDisplay = stopPoints.B;
      }
      if (lineRef === 'C') {
        stopPointsToDisplay = stopPoints.C;
      }
      if (lineRef === 'D') {
        stopPointsToDisplay = stopPoints.D;
      }
      if (lineRef === 'E') {
        stopPointsToDisplay = stopPoints.E;
      }
      if (lineRef === 'F') {
        stopPointsToDisplay = stopPoints.F;
      }

      ActionSheet.show({
        options: stopPointsToDisplay,
        title: typeOf
      },
      (buttonIndex) => {
        this.loadData(null, stopPointsToDisplay[buttonIndex]);
      });
    }

    getResult = () => {
      const { selectedLine, selectedStop } = this.state;

      api.get(`v1/siri/2.0/estimated-timetable?LineRef=${selectedLine.charAt(0)}`).then((data) => {
        console.log(data.ServiceDelivery.EstimatedTimetableDelivery[0].EstimatedJourneyVersionFrame[0].EstimatedVehicleJourney[0]);
      }).catch(() => {
        Alert.alert('An error occured.');
      });
    }

    loadData(newLine, newStop) {
      if (newLine) {
        this.setState({
          selectedLine: newLine,
          selectedStop: null
        });
      }
      if (newStop) {
        this.setState({
          selectedStop: newStop
        });
      }
    }

    render() {
      const { selectedLine, selectedStop, buttonTitles } = this.state;

      return (
        <Grid>
          <Row style={styles.row}>
            <SearchButton
              typeOf={buttonTitles[0]}
              getLines={this.getLines}
            />
            <Text style={styles.text}>{selectedLine || ''}</Text>
          </Row>
          { selectedLine && (
            <Row style={styles.row}>
              <SearchButton
                typeOf={buttonTitles[1]}
                selectedLine={selectedLine}
                getStops={this.getStops}
              />
              <Text style={styles.text}>{selectedStop || ''}</Text>
            </Row>
          )}

          { selectedLine && selectedStop && (
            <Row style={styles.row}>
              <SearchButton
                typeOf={buttonTitles[2]}
                selectedLine={selectedLine}
                selectedStop={selectedStop}
                getResult={this.getResult}
              />
            </Row>
          )}
        </Grid>
      );
    }
}

const styles = StyleSheet.create({
  row: {
    height: '18%',
    paddingTop: 30,
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'column'
  },
  text: {
    color: '#fff'
  }
});
