import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Dialog from 'react-native-dialog';
import { FontAwesome5 } from '@expo/vector-icons';

export class FeedbackBubble extends React.Component {
  constructor(props) {
    super(props);
  }

  setShowFeedbackBubble() {
    // Check to prevent null exception.
    this.props.setShowFeedbackBubble?.(); // Same as this.props.onPress && this.props.onPress();
  }

  setMoodOverview() {
    // Check to prevent null exception.
    this.props.setMoodOverview?.(); // Same as this.props.onPress && this.props.onPress();
  }

  render() {
    return (
      <View>
        <Dialog.Container
          visible={this.props.showFeedbackBubble}
          onBackdropPress={() => {
            this.setShowFeedbackBubble(false);
            this.setMoodOverview(false);
          }}
        >
          <Dialog.Title>
            <Text> Mood was tracked successfully!</Text>
            <FontAwesome5
              size={25}
              name={'check-circle'}
              solid
              color={'#3CBB75'}
            />
          </Dialog.Title>
          <Dialog.Description>
            <Text>
              See your tracked moods in Statistics
            </Text>
          </Dialog.Description>
        </Dialog.Container>
      </View>
    );
  }
};

const styles = StyleSheet.create({});