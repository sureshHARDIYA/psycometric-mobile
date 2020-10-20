import React from 'react';
import { View } from 'react-native';
import Dialog from 'react-native-dialog';

import Emitter from '../../../utils/eventEmitter';

export const ConfirmationBubble = (props) => {
  const confirmMoodTracking = () => {
    //sends in mood tracking data
    props.onSubmit({
      emotion: props.emojiDescription,
      degree: props.selectedDegreeText,
    });
    Emitter.emit('moodTrackingFinished');
  };
  return (
    <View>
      <Dialog.Container
        visible
        onBackdropPress={() => {
          Emitter.emit('closeConfirmationBubble');
        }}>
        <Dialog.Title>Would you like to track</Dialog.Title>
        <Dialog.Description>
          {'Degree/intensity:' +
            ' ' +
            props.selectedDegreeText +
            '\nEmotion:' +
            ' ' +
            props.emojiDescription }
        </Dialog.Description>
        <Dialog.Button
          label="Cancel"
          color="#DE6465"
          onPress={() => {
            Emitter.emit('closeConfirmationBubble');
          }}
        />
        <Dialog.Button
          label="Confirm"
          color="#3CBB75"
          onPress={() => {
            confirmMoodTracking();
          }}
        />
      </Dialog.Container>
    </View>
  );
};
