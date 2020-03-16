import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Footer, FooterTab, Button, Icon, Text
} from 'native-base';

export const PersonalFooter = () => (
  <Footer>
    <FooterTab style={styles.footer}>
      <Button active style={styles.button}>
        <Icon name='search' />
        <Text uppercase={false}>Recherche</Text>
      </Button>
      <Button>
        <Icon name='pin' />
        <Text uppercase={false}>Localisation</Text>
      </Button>
    </FooterTab>
  </Footer>
);

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'rgb(105,92,230)'
  },
  button: {
    backgroundColor: 'rgb(105,92,230)'
  }
});


export default PersonalFooter;
