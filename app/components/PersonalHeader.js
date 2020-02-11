import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Header, Body, Title } from 'native-base';

export default class PersonalHeader extends Component {
    render() {
        return (
            <Header style={styles.header}>
                <Body>
                    <Title style={styles.headerTitle}>Oh ftomi !</Title>
              </Body>
          </Header>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 25,
        height: 80,
        backgroundColor: 'rgb(94,92,230)'
    },
    headerTitle: {
        marginLeft: 30
    }
});
