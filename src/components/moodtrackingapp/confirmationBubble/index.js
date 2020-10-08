import React from 'react';
import { View, Text } from 'react-native';
import Dialog from 'react-native-dialog';

export class ConfirmationBubble extends React.Component {

  constructor(props) {
    super(props);
  }

  setShowConfirmationBubble() {
    // Check to prevent null exception.
    this.props.setShowConfirmationBubble?.(); // Same as this.props.onPress && this.props.onPress();
  }


  cancelMoodTracking() {
    this.setShowConfirmationBubble(false);
  }

  confirmMoodTracking() {
    this.setShowConfirmationBubble(false);

    this.props.setShowFeedbackBubble(true);

    //sends in mood tracking data
    this.props.onSubmit({
      emotion: this.props.emojiDescription,
      degree: this.props.sliderValue.toString(),
    });
  }

  render() {
    return (
      <View>
        <Dialog.Container
          visible={this.props.showConfirmationBubble}
          onBackdropPress={() => {
            this.cancelMoodTracking();
          }}>
          <Dialog.Title><Text>Would you like to track</Text></Dialog.Title>
          <Dialog.Description>
            <Text>
              Emotion: {this.props.emojiDescription} {'\n'}
              Degree/intensity: {this.props.sliderValue}
            </Text>
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={() => {
            this.cancelMoodTracking();
          }} color={'#DE6465'} />
          <Dialog.Button label="Confirm" onPress={() => {
            this.confirmMoodTracking();
          }} color={'#3CBB75'} />
        </Dialog.Container>
      </View>
    );
  }
};