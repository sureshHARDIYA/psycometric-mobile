import React from 'react';
import { View } from 'react-native';
import Dialog from 'react-native-dialog';
import { FontAwesome5 } from '@expo/vector-icons';

export class FeedbackBubble extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Dialog.Container visible={this.props.showFeedbackBubble}>
          <Dialog.Title>Mood was tracked successfully!  <FontAwesome5
            size={25}
            name={'check-circle'}
            solid
            color={'#3CBB75'}
          /></Dialog.Title>
          <Dialog.Description>
            See your tracked moods in Statistics
          </Dialog.Description>
        </Dialog.Container>
      </View>
    );
  }
};