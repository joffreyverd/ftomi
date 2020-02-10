import React, { Component } from 'react';
import { StyleSheet, Alert, Text } from 'react-native';
import { Grid, Row, ActionSheet } from 'native-base';

import ChooseOption from './ChooseOption';
import api from '../helpers/http';

export default class Content extends Component {

    state = {
        linesToDisplay: {},
        directionsToDisplay: {},
        stopsToDisplay: {},
        selectedLine: null,
        selectedDirection: null,
        selectedStop: null,
        buttonTitles: ['Lignes', 'Destinations', 'Arrêts']
    };

    getLines = (typeOf) => {
        api.get('v1/siri/2.0/lines-discovery').then((data) => {
          const lines = data.LinesDelivery.AnnotatedLineRef;
          const myLines = {};
          let index = 0;
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].Extension.RouteType === 'tram') {
                myLines[index] = {
                LineRef: lines[i].LineRef,
                LineName: lines[i].LineName,
                RouteColor: lines[i].Extension.RouteColor
              };
              index++;
            }
           };
            this.setState({
                linesToDisplay: myLines 
            });
    
          const { linesToDisplay } = this.state;
          const names = [];
          for (let i = 0; i < Object.keys(linesToDisplay).length; i++) {
            names[i] = linesToDisplay[i].LineRef + ' - ' + linesToDisplay[i].LineName;
          }

          ActionSheet.show({
              options: names,
              title: typeOf
            },
            buttonIndex => {
                this.selectLine(names[buttonIndex]);
            });
        }).catch(() => {
          Alert.alert('An error occured.');
        });
      }

    selectLine(newLine) {
        if (newLine) {
            this.setState({
                selectedLine: newLine,
                selectedDirection: null,
                selectedStop: null
            });
        }
    }

    getDirections = (typeOf) => {
        Alert.alert('Destinations');
    }

    getStops = (typeOf) => {
        Alert.alert('Arrêts');
    }

    render() {

        const { selectedLine, selectedDirection, buttonTitles } = this.state;

        return (
            <Grid>
                <Row style={styles.row}>
                    <ChooseOption
                        typeOf={buttonTitles[0]}
                        getLines={this.getLines}/>
                    <Text style={styles.text}>{selectedLine ? selectedLine : ''}</Text>
                </Row>
                { selectedLine &&
                    <Row style={styles.row}>
                        <ChooseOption
                            typeOf={buttonTitles[1]}
                            getDirections={this.getDirections}
                            selectedLine={selectedLine}/>

                    </Row>
                }
                { selectedDirection &&
                    <Row style={styles.row}>
                        <ChooseOption
                            typeOf={buttonTitles[2]}  
                            getStops={this.getStops}  
                            selectedLine={selectedLine}
                            selectedDirection={selectedDirection}/>
                    </Row>
                }
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
