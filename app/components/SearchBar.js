import React from 'react';
import { StyleSheet } from 'react-native';
import { Item, Icon, Input } from 'native-base';

export const SearchBar = () => (
  <>
    <Item style={styles.searchBar}>
      <Icon name='search' style={styles.searchIcon} />
      <Input placeholder='Arrêt' />
    </Item>
  </>
);

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#fff'
  },
  searchIcon: {
    paddingLeft: 15
  }
});

export default SearchBar;
