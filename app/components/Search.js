import React, { Component } from 'react';
import { StyleSheet, Alert, Text } from 'react-native';
import { Grid, Row, ActionSheet } from 'native-base';

import SearchButton from './SearchButton';
import Result from './Result';
import api from '../helpers/http';
import stopPoints from '../data/stopPoints.json';
import lines from '../data/lines.json';

export default class Search extends Component {
  static formatData(tramFirstDirection, selectedStop) {
    const trams = [];
    const now = new Date();
    now.setHours(now.getHours() + 1);
    for (let i = 0; i < Object.keys(tramFirstDirection).length; i += 1) {
      for (let n = 0; n < Object.keys(tramFirstDirection[i].EstimatedCalls).length; n += 1) {
        const arrival = new Date(tramFirstDirection[i].EstimatedCalls[n].ExpectedArrivalTime);
        if (tramFirstDirection[i].EstimatedCalls[n].StopPointName === selectedStop
          && arrival > now) {
          trams.push({
            id: `${i}-${n}`,
            arrival,
            direction: tramFirstDirection[i].EstimatedCalls[n].DestinationName
          });
        }
        if (trams.length === 5) {
          trams.sort((a, b) => a.arrival - b.arrival);
          return trams;
        }
      }
    }
    trams.sort((a, b) => a.arrival - b.arrival);
    return trams;
  }

  constructor(props) {
    super(props);
    this.state = {
      hip: [],
      hop: [],
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
        if (buttonIndex) {
          this.setState({
            lineColor: lines[buttonIndex].RouteColor
          });
        }
      });
    }

    getStops = (typeOf) => {
      let stopPointsToDisplay = [];
      const { selectedLine } = this.state;
      const lineRef = selectedLine.charAt(0);

      switch (lineRef) {
          case 'A':
            stopPointsToDisplay = stopPoints.A;
            break;
          case 'B':
            stopPointsToDisplay = stopPoints.B;
            break;
          case 'C':
            stopPointsToDisplay = stopPoints.C;
            break;
          case 'D':
            stopPointsToDisplay = stopPoints.D;
            break;
          case 'E':
            stopPointsToDisplay = stopPoints.E;
            break;
          case 'F':
            stopPointsToDisplay = stopPoints.F;
            break;
          default:
            break;
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
        const td = data.ServiceDelivery.EstimatedTimetableDelivery[0].EstimatedJourneyVersionFrame;
        this.setState({
          hip: Search.formatData(td[0].EstimatedVehicleJourney, selectedStop),
          hop: Search.formatData(td[1].EstimatedVehicleJourney, selectedStop)
        });
      }).catch(() => {
        Alert.alert('Aucun tram disponible.');
      });
    }

    erasePreviousResult = () => {
      this.setState({
        selectedLine: null,
        selectedStop: null,
        hip: [],
        hop: []
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
      const {
        selectedLine, selectedStop, buttonTitles, hip, hop, lineColor
      } = this.state;

      return (
        <>
          { hip.length > 0 && hop.length > 0 && (
            <Result
              hip={hip}
              hop={hop}
              lineColor={lineColor}
              erasePreviousResult={this.erasePreviousResult}
            />
          )}

          { hip.length === 0 && hop.length === 0 && (
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
          )}
        </>
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
