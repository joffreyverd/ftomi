import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Root, Button, ActionSheet, Text } from 'native-base';

import api from '../helpers/http';

export default class ChooseOption extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      linesToDisplay: {},
      selectedLine: ''
    };
  }

  async getTramLines() {
    
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
      const { text } = this.props;
      const names = [];
      for (let i = 0; i < Object.keys(linesToDisplay).length; i++) {
        names[i] = linesToDisplay[i].LineRef + ' - ' + linesToDisplay[i].LineName;
      }

      ActionSheet.show({
          options: names,
          title: text
        },
        buttonIndex => {
          this.selectLine(names[buttonIndex]);
        });
    }).catch(() => {
      Alert.alert('An error occured.');
    });
  }

  selectLine = (selectedLine) => {
    Alert.alert(JSON.stringify(selectedLine));
    this.setState({ selectedLine });
   
  }

  render() {

    const { text } = this.props;

    return (
      <Root>
        <Button
          block
          style={styles.button}
          onPress={() => this.getTramLines()}>
          <Text>{text}</Text>
        </Button>
      </Root>
    );
  }

}

const styles = StyleSheet.create({
  button:{
    width: 150,
    backgroundColor: 'rgb(94,60,230)'
  }
});
