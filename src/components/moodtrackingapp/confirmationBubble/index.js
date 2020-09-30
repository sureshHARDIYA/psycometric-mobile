import React from 'react';
import { StyleSheet, View } from 'react-native';
import Dialog from 'react-native-dialog';

export class ConfirmationBubble extends React.Component {
  constructor(props) {
    super(props);
  }

  showConfirmationDialog(){
    // Check to prevent null exception.
    this.props.showConfirmationDialog?.(); // Same as this.props.onPress && this.props.onPress();
  }

  confirmMoodTracking(){
    // set sliderValue to 4
    //set selectedMood to 'selectedMood: 'No mood selected'
    //set showMoodOverview in main menu to  false.
    //set showConfirmationBubble to  false.

    //set showFeedbackBubble to  true.
    //send in data.

  }

  render() {
    return (
      <View>
        <Dialog.Container visible={this.props.showConfirmationBubble}>
          <Dialog.Title>Would you like to track</Dialog.Title>
          <Dialog.Description>
            Emotion: {this.props.emojiDescription} {'\n'}
            Degree/intensity: {this.props.degree}
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={() => {this.showConfirmationDialog('false')}} color={'#DE6465'} />
          <Dialog.Button label="Confirm" onPress={() => {this.confirmMoodTracking}} color={'#3CBB75'} />
        </Dialog.Container>
      </View>
    );
  }
};