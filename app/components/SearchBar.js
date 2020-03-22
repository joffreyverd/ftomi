import React from 'react';
import { StyleSheet } from 'react-native';
import { Item, Icon, Input } from 'native-base';

export const SearchBar = (props) => {
  const { typoSearch } = props;
  return (
    <Item style={styles.searchBar}>
      <Icon name='search' style={styles.searchIcon} />
      <Input
        placeholder='Arrêt'
        onChangeText={(newValue) => typoSearch(newValue)}
      />
    </Item>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#fff'
  },
  searchIcon: {
    paddingLeft: 15
  }
});

export default SearchBar;
