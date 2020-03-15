import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Grid, Content, Button, ListItem, Text, Icon, Left, Body, Right
} from 'native-base';

export default class Result extends Component {
    getTramList = (hip, lineColor) => hip.map((object) => (
      <React.Fragment key={object.id}>
        <ListItem icon>
          <Left>
            <Button style={{ backgroundColor: `#${lineColor}` }}>
              <Icon active name='train' />
            </Button>
          </Left>
          <Body>
            <Text style={styles.individualDirection}>{object.direction}</Text>
          </Body>
          <Right>
            <Text>{object.arrival.toISOString().substr(11, 5)}</Text>
          </Right>
        </ListItem>
      </React.Fragment>
    ))

    render() {
      const {
        hip, hop, lineColor, erasePreviousResult
      } = this.props;

      return (
        <>
          <Grid style={styles.grid}>
            <Content>
              <ListItem itemDivider style={styles.itemDivider}>
                <Text style={styles.itemDividerText}>{hip[0].direction}</Text>
              </ListItem>
              {this.getTramList(hip, lineColor)}
              <ListItem itemDivider style={styles.itemDivider}>
                <Text style={styles.itemDividerText}>{hop[0].direction}</Text>
              </ListItem>
              {this.getTramList(hop, lineColor)}
            </Content>
          </Grid>

          <Grid style={(styles.grid, styles.button)}>
            <Button
              light
              onPress={erasePreviousResult}
            >
              <Icon name='arrow-back' />
              <Text>Nouvelle Recherche</Text>
            </Button>
          </Grid>
        </>
      );
    }
}

const styles = StyleSheet.create({
  grid: {
    minHeight: 400
  },
  itemDivider: {
    backgroundColor: '#2c2c2e'
  },
  itemDividerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    marginLeft: 20
  },
  individualDirection: {
    color: '#fff',
    fontSize: 15
  }
});
