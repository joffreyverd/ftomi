import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Grid, Row, Text } from 'native-base';

export default class Content extends Component {

  render() {
    return (
        <Grid>
            <Row style={styles.row}>
                <Text style={styles.font}>Ligne</Text>
            </Row>
            <Row style={styles.row}>
                <Text style={styles.font}>Direction</Text>
            </Row>
            <Row style={styles.row}>
                <Text style={styles.font}>Arrêt</Text>
            </Row>
        </Grid>
    );
  }

}

const styles = StyleSheet.create({
    row: {
        paddingTop: 20,
        paddingLeft: 20
    },
    font: {
        color: '#fff'
    }
});
