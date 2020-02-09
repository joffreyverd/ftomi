import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Grid, Row } from 'native-base';

import ChooseOption from './ChooseOption';

export default class Content extends Component {

    render() {
        return (
            <Grid>
                <Row style={styles.row}>
                    <ChooseOption text='Lignes'/>
                </Row>
                <Row style={styles.row}>
                    <ChooseOption text='Directions'/>
                </Row>
                <Row style={styles.row}>
                    <ChooseOption text='Arrêts'/>
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
