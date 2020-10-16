import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import Dialog from 'react-native-dialog';

import Emitter from '../../../utils/eventEmitter';

export const FeedbackBubble = () => {
  return (
    <View>
      <Dialog.Container
        visible
        onBackdropPress={() => {
          Emitter.emit('closeFeedbackBubble');
        }}>
        <FontAwesome5
          solida
          solid
          size={22}
          name="check-circle"
          color="#3CBB75"
          style={{ position: 'absolute', right: 0, top: 9, padding: 20 }}
        />
        <Dialog.Title style={{ width: 280 }}>
          Mood was tracked successfully!
        </Dialog.Title>
        <Dialog.Description>
          See your tracked moods in Statistics
        </Dialog.Description>
      </Dialog.Container>
    </View>
  );
};
