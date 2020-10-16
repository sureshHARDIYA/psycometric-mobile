import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { Color } from '../../../constants';

export const SelectMoodInfo = (props) => {
  return (
    <Text
      style={styles.selectMoodText}
      onBackdropPress={() => {
        props.showMustSelectMoodText(false);
      }}>
      Select the mood you want to track first
    </Text>
  );
};

const styles = StyleSheet.create({
  selectMoodText: {
    textAlign: 'center',
    position: 'absolute',
    backgroundColor: Color.white,
    width: 150,
    height: 85,
    padding: 15,
    top: 30,
    zIndex: 2,
    borderRadius: 15,
  },
});
