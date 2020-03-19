import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Footer, FooterTab, Button, Icon, Text
} from 'native-base';

export const Footr = (props) => {
  const { manualSearch, switchTabs } = props;
  return (
    <>
      <Footer>
        <FooterTab>
          <Button
            style={styles.button}
            active={manualSearch}
            onPress={() => switchTabs(true)}
          >
            <Icon name='search' />
            <Text uppercase={false}>Recherche</Text>
          </Button>
          <Button
            style={styles.button}
            active={!manualSearch}
            onPress={() => switchTabs(false)}
          >
            <Icon name='pin' />
            <Text uppercase={false}>Localisation</Text>
          </Button>
        </FooterTab>
      </Footer>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgb(94,92,230)'
  }
});


export default Footr;
