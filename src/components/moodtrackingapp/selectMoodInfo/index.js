import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Color } from '../../../constants';

export class SelectMoodInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Text
          onBackdropPress={() => {
            this.props.showMustSelectMoodText(false);
          }}
          style={styles.selectMoodText}>
          Select the mood you want to track first
        </Text>
    );
  }
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
    borderRadius: 15
  },
});