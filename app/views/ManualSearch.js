import React, { Component } from 'react';
import { ScrollView, Alert } from 'react-native';
import { Row, Spinner } from 'native-base';

import Result from './Result';
import NoResult from './NoResult';
import ComeBack from '../components/ComeBack';
import BreadCrumb from '../components/BreadCrumb';
import SearchBar from '../components/SearchBar';
import PressableItem from '../components/PressableItem';
import api from '../helpers/http';
import stopPoints from '../data/stopPoints.json';
import lines from '../data/lines.json';

export default class ManualSearch extends Component {
  static formatData(allTrams, selectedStop) {
    const trams = [];
    const now = new Date();

    if (allTrams[0].EstimatedCalls[0].DestinationName === selectedStop) {
      return trams;
    }

    for (let i = 0; i < Object.keys(allTrams).length; i += 1) {
      for (let n = 0; n < Object.keys(allTrams[i].EstimatedCalls).length; n += 1) {
        const arrival = new Date(allTrams[i].EstimatedCalls[n].ExpectedArrivalTime);
        arrival.setHours(arrival.getHours() + 1);
        if (allTrams[i].EstimatedCalls[n].StopPointName === selectedStop
           && arrival > now) {
          trams.push({
            id: `${i}-${n}`,
            arrival,
            direction: allTrams[i].EstimatedCalls[n].DestinationName
          });
        }
        if (trams.length === 5) {
          trams.sort((a, b) => a.arrival - b.arrival);
          return trams;
        }
      }
    }
    if (trams.length === 0) {
      throw new Error('Aucun tram ne correspond à votre recherche.');
    }
    trams.sort((a, b) => a.arrival - b.arrival);
    return trams;
  }

  constructor(props) {
    super(props);
    this.state = {
      searchedStops: [],
      hip: [],
      hop: []
    };
  }

  getStops = (newLine, selectedLineColor) => {
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
    let lineDirections = '';
    for (let i = 0; i < Object.keys(lines.allLines).length; i += 1) {
      if (newLine === lines.allLines[i].LineRef) {
        lineDirections = lines.allLines[i].LineName;
      }
    }
    this.setState({
      selectedLine: newLine,
      lineDirections,
      selectedLineColor,
      stopPointsToDisplay,
      searchedStops: []
    });
  }

    getResult = (selectedStop) => {
      this.setState({
        selectedStop
      });
      const { selectedLine } = this.state;
      api.get(`v1/siri/2.0/estimated-timetable?LineRef=${selectedLine.charAt(0)}`).then((data) => {
        const td = data.ServiceDelivery.EstimatedTimetableDelivery[0].EstimatedJourneyVersionFrame;
        if (!td) {
          throw new Error('Aucun tram n\'est disponible.');
        }
        this.setState({
          hip: ManualSearch.formatData(td[0].EstimatedVehicleJourney, selectedStop),
          hop: ManualSearch.formatData(td[1].EstimatedVehicleJourney, selectedStop)
        });
      }).catch(() => {
        this.setState({
          noResult: true
        });
      });
    }

    eraseResult = () => {
      this.setState({
        selectedLine: null,
        selectedStop: null,
        lineDirections: '',
        searchedStops: [],
        typoSearchStopPoints: false,
        noResult: false,
        hip: [],
        hop: []
      });
    }

    typoSearch = (newValue) => {
      const { stopPointsToDisplay, selectedLine, selectedLineColor } = this.state;
      if (!newValue) {
        this.getStops(selectedLine, selectedLineColor);
        return;
      }
      const searchedStops = [];
      for (let i = 0; i < Object.keys(stopPointsToDisplay).length; i += 1) {
        if (stopPointsToDisplay[i].toLowerCase().includes(newValue.toLowerCase())) {
          searchedStops.push(stopPointsToDisplay[i]);
        }
      }
      this.setState({
        searchedStops,
        typoSearchStopPoints: !(searchedStops.length > 0)
      });
    }

    displayLines = () => lines.allLines.map((object) => (
      <Row key={object.id}>
        <PressableItem
          LineRef={object.LineRef}
          LineName={object.LineName}
          RouteColor={object.RouteColor}
          getStops={this.getStops}
        />
      </Row>
    ))

    displayStops = (stopPointsToDisplay) => stopPointsToDisplay.map((stop, i) => (
      // String(i) is used to avoid eslint warning `Do not use Array index in keys`
      <Row key={String(i)}>
        <PressableItem
          stop={stop}
          getResult={this.getResult}
        />
      </Row>
    ))

    render() {
      const {
        selectedLine, stopPointsToDisplay, searchedStops, typoSearchStopPoints,
        selectedStop, hip, hop, selectedLineColor, lineDirections, noResult
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
              <BreadCrumb
                message={`Ligne ${selectedLine}`}
              />
              <SearchBar
                typoSearch={this.typoSearch}
              />
              <ScrollView>
                {searchedStops.length > 0 || typoSearchStopPoints ? (
                  this.displayStops(searchedStops)
                ) : (
                  this.displayStops(stopPointsToDisplay)
                )}

              </ScrollView>
              <ComeBack eraseResult={this.eraseResult} />
            </>
          )}

          {selectedLine && selectedStop && hip.length === 0 && hop.length === 0 && !noResult && (
            <ScrollView>
              <BreadCrumb message={`Ligne ${selectedLine} - ${selectedStop}`} />
              <Spinner color='rgb(105,92,230)' />
            </ScrollView>
          )}

          {selectedStop && (hip.length > 0 || hop.length > 0) && (
            <Result
              hip={hip}
              hop={hop}
              selectedLineColor={selectedLineColor}
              lineDirections={lineDirections}
              selectedLine={selectedLine}
              selectedStop={selectedStop}
              eraseResult={this.eraseResult}
            />
          )}

          {noResult && (
            <NoResult
              selectedLine={selectedLine}
              selectedStop={selectedStop}
              eraseResult={this.eraseResult}
            />
          )}
        </>
      );
    }
}
