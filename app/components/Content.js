import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Grid, Row, ActionSheet } from 'native-base';

import ChooseOption from './ChooseOption';
import api from '../helpers/http';

export default class Content extends Component {

    state = {
        linesToDisplay: {},
        selectedLine: 'lol',
        buttonTitles: ['Lignes', 'Directions', 'Arrêts']
    };

    getTramLines = () => {
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
    
          const { linesToDisplay, buttonTitles } = this.state;
          const names = [];
          for (let i = 0; i < Object.keys(linesToDisplay).length; i++) {
            names[i] = linesToDisplay[i].LineRef + ' - ' + linesToDisplay[i].LineName;
          }

          ActionSheet.show({
              options: names,
              title: buttonTitles[0]
            },
            buttonIndex => {
                this.selectLine(names[buttonIndex]);
            });
        }).catch(() => {
          Alert.alert('An error occured.');
        });
      }

    selectLine(selectedLine) {
        this.setState({
            selectedLine
        });
        Alert.alert(JSON.stringify(selectedLine));
    }

    render() {

        const { selectedLine, buttonTitles } = this.state;

        return (
            <Grid>
                <Row style={styles.row}>
                    <ChooseOption
                        text={buttonTitles[0]}
                        getTramLines={this.getTramLines}
                        selectedLine= {selectedLine}/>
                </Row>
                <Row style={styles.row}>
                    <ChooseOption
                        text={buttonTitles[1]}
                        getTramLines={this.getTramLines}
                        selectedLine= {selectedLine}/>
                </Row>
                <Row style={styles.row}>
                    <ChooseOption
                        text={buttonTitles[2]}
                        getTramLines={this.getTramLines}
                        selectedLine= {selectedLine}/>
                </Row>
            </Grid>
        );
    }

}

const styles = StyleSheet.create({
    row: {
        paddingTop: 30,
        paddingLeft: 20
    },
    font: {
        color: '#fff'
    }
});
