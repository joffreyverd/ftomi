import React, { Component } from 'react';
import {
  StyleSheet, Text, ScrollView, Alert
} from 'react-native';
import {
  Row, Button, Icon, Spinner
} from 'native-base';

import Result from './Result';
import ComeBack from '../components/ComeBack';
import BreadCrumb from '../components/BreadCrumb';
import SearchBar from '../components/SearchBar';
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
    if (trams.length === 0) {
      throw new Error('Aucun tram ne correspond à votre recherche.');
    }
    return trams;
  }

  constructor(props) {
    super(props);
    this.state = {
      hip: [],
      hop: []
    };
  }

  getStops(newLine, lineColor) {
    let stopPointsToDisplay = [];
    switch (newLine) {
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
    this.setState({
      selectedLine: newLine,
      lineColor,
      stopPointsToDisplay
    });
  }

    getResult = (selectedStop) => {
      this.setState({
        selectedStop
      });
      const { selectedLine } = this.state;
      api.get(`v1/siri/2.0/estimated-timetable?LineRef=${selectedLine.charAt(0)}`).then((data) => {
        const td = data.ServiceDelivery.EstimatedTimetableDelivery[0].EstimatedJourneyVersionFrame;
        this.setState({
          hip: Search.formatData(td[0].EstimatedVehicleJourney, selectedStop),
          hop: Search.formatData(td[1].EstimatedVehicleJourney, selectedStop)
        });
      }).catch((e) => {
        this.erasePreviousResult();
        Alert.alert(e.message);
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

    searchStopPoint = (newValue) => {
      const { stopPointsToDisplay, selectedLine, lineColor } = this.state;
      const searchedStops = [];

      if (!newValue) {
        this.getStops(selectedLine, lineColor);
        return;
      }

      for (let i = 0; i < Object.keys(stopPointsToDisplay).length; i += 1) {
        if (stopPointsToDisplay[i].toLowerCase().includes(newValue.toLowerCase())) {
          searchedStops.push(stopPointsToDisplay[i]);
        }
      }

      this.setState({
        stopPointsToDisplay: searchedStops,
      });
    }

    displayLines = () => lines.allLines.map((object) => (
      <Row style={styles.row} key={object.id}>
        <Button
          style={styles.button}
          onPress={() => this.getStops(object.LineRef, object.RouteColor)}
        >
          <Icon name='train' style={{ color: object.RouteColor }} />
          <Text style={styles.textButton}>{`${object.LineRef} - ${object.LineName}`}</Text>
        </Button>
      </Row>
    ))

    displayStops = (stopPointsToDisplay) => stopPointsToDisplay.map((stop, index) => (
      <Row style={styles.row} key={index}>
        <Button
          style={styles.button}
          onPress={() => this.getResult(stop)}
        >
          <Text style={styles.textButton}>{stop}</Text>
        </Button>
      </Row>
    ))

    render() {
      const {
        selectedLine, stopPointsToDisplay, selectedStop, hip, hop, lineColor
      } = this.state;

      return (
        <>
          {!selectedLine && !selectedStop && (
            <>
              <ScrollView>
                {this.displayLines()}
              </ScrollView>
            </>
          )}

          { selectedLine && !selectedStop && (
            <>
              <BreadCrumb message={`Ligne ${selectedLine}`} />
              <SearchBar
                searchStopPoint={this.searchStopPoint}
              />
              <ScrollView>
                {this.displayStops(stopPointsToDisplay)}
              </ScrollView>
              <ComeBack erasePreviousResult={this.erasePreviousResult} />
            </>
          )}

          {selectedLine && selectedStop && hip.length === 0 && hop.length === 0 && (
            <ScrollView>
              <BreadCrumb message={`Ligne ${selectedLine} - ${selectedStop}`} />
              <Spinner color='rgb(105,92,230)' />
            </ScrollView>
          )}

          {selectedStop && hip.length > 0 && hop.length > 0 && (
            <Result
              hip={hip}
              hop={hop}
              lineColor={lineColor}
              selectedLine={selectedLine}
              selectedStop={selectedStop}
              erasePreviousResult={this.erasePreviousResult}
            />
          )}
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
  }
});
