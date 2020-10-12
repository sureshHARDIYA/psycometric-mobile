import React from 'react';
import { View } from 'react-native';
import Dialog from 'react-native-dialog';
import { FontAwesome5 } from '@expo/vector-icons';
import { moodEventStream } from '../../../utils/eventEmitter';

export const FeedbackBubble = () => {
    return (
      <View>
        <Dialog.Container
          visible={true}
          onBackdropPress={() => {
            moodEventStream.emit('closeFeedbackBubble');
          }}>
          <FontAwesome5
            size={22}
            name={'check-circle'}
            solida
            color={'#3CBB75'}
            solid
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