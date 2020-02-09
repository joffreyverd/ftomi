import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Title, Button, Icon } from 'native-base';

export default class PersonalHeader extends Component {

  render() {

    return (
      <Container>
        <Header style={styles.header}>
          <Left>
          <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Ftomi</Title>
          </Body>
          <Right/>
        </Header>
      </Container>
    );

  }
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: 'rgb(94,92,230)',
  },
});
