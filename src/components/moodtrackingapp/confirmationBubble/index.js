import React from 'react';
import { Platform, View } from 'react-native';
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
    <>
      <Dialog.Container
        visible
        style={{ alignSelf: 'center' }}
        onBackdropPress={() => {
          Emitter.emit('closeConfirmationBubble');
        }}>
        {Platform.OS === 'ios' && (
          <Dialog.Description
            style={{
              padding: 15,
              minWidth: 270,
              fontSize: 16,
              alignSelf: 'center',
            }}>
            {'You are feeling ' +
            props.selectedDegreeText.toLowerCase() +
            ' ' +
            '\n' +
            props.emojiDescription}
          </Dialog.Description>
        )}

        {Platform.OS === 'android' && (
          <Dialog.Description
            style={{
              padding: 0,
              fontSize: 16,
              alignSelf: 'center',
            }}>
            {'You are feeling ' +
            props.selectedDegreeText.toLowerCase() +
            ' ' +
            '\n' +
            props.emojiDescription}
          </Dialog.Description>
        )}

        <Dialog.Button
          label="No, Mistake"
          color="#DE6465"
          onPress={() => {
            Emitter.emit('closeConfirmationBubble');
          }}
        />
        <Dialog.Button
          label="Yes"
          color="#3CBB75"
          onPress={() => {
            confirmMoodTracking();
          }}
        />
      </Dialog.Container>
    </>
  );
};
