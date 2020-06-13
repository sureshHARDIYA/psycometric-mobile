import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from '../themes';

export const Tag = ({ title, type, onPress }) => {
  const number = ([1, 2, 3, 4, 5, 6].indexOf(type) % 7) + 1 || 1;

  return (
    <TouchableOpacity
      style={[styles.captionAddon, styles[`group${number}BG`]]}
      onPress={onPress}>
      <Text style={[styles.caption, styles[`group${number}Text`]]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  captionAddon: {
    flexGrow: 0,
    margin: 5,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  caption: {
    padding: 3,
    fontSize: 10,
  },
  group1Text: {
    color: '#FF3D71',
  },
  group1BG: {
    backgroundColor: '#FFEFF3',
  },
  group2Text: {
    color: '#00D68F',
  },
  group2BG: {
    backgroundColor: '#CCFCE3',
  },
  group3Text: {
    color: '#0095FF',
  },
  group3BG: {
    backgroundColor: '#C7E2FF',
  },
  group4Text: {
    color: '#FF8900',
  },
  group4BG: {
    backgroundColor: '#FFD5A4',
  },
  group5Text: {
    color: '#79D5FF',
  },
  group5BG: {
    backgroundColor: '#F4FDFF',
  },
  group6Text: {
    color: '#2E3A59',
  },
  group6BG: {
    backgroundColor: '#E4E9F2',
  },
});
