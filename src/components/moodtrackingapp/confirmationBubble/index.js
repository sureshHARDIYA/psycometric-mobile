import React from 'react';
import { View } from 'react-native';
import Dialog from 'react-native-dialog';
import Emitter from '../../../utils/eventEmitter';

export const ConfirmationBubble = (props) => {

  const confirmMoodTracking = () => {
    //sends in mood tracking data
    props.onSubmit({
      emotion: props.emojiDescription,
      degree: props.sliderValue.toString(),
    });
    Emitter.emit('moodTrackingFinished');
  };
  return (
    <View>
      <Dialog.Container
        visible={true}
        onBackdropPress={() => {
          Emitter.emit('closeConfirmationBubble');
        }}>
        <Dialog.Title>Would you like to track</Dialog.Title>
        <Dialog.Description>
          {'Emotion:' + props.emojiDescription + '\nDegree/intensity:' + props.sliderValue}
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => {
            Emitter.emit('closeConfirmationBubble');
        }} color={'#DE6465'} />
        <Dialog.Button label="Confirm" onPress={() => {
          confirmMoodTracking();
        }} color={'#3CBB75'} />
      </Dialog.Container>
    </View>
  );
};