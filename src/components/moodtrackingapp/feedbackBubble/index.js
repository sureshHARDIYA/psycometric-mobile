import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Platform } from 'react-native';
import Dialog from 'react-native-dialog';

import Emitter from '../../../utils/eventEmitter';

export const FeedbackBubble = () => {
  return (
    <>
      <Dialog.Container
        visible
        style={{ alignSelf: 'center' }}
        onBackdropPress={() => {
          Emitter.emit('closeFeedbackBubble');
        }}>
        <FontAwesome5
          solida
          solid
          size={22}
          name="check-circle"
          color="#3CBB75"
          style={{
            ...Platform.select({
              android: {
                right: -10,
                top: -10,
              },
              ios: {
                right: 0,
                top: 0,
              },
            }),
            position: 'absolute',
            padding: 20,
          }}
        />
        <Dialog.Title
          style={{
            ...Platform.select({
              android: {
                minWidth: 270,
                maxWidth: 270,
                padding: 5,
                fontSize: 18,
              },
              ios: {
                width: 260,
                padding: 15,
              },
            }),
            fontSize: 18,
            alignSelf: 'center',
          }}>
          Mood was tracked successfully!
        </Dialog.Title>
        <Dialog.Description
          style={{
            ...Platform.select({
              android: {
                paddingLeft: 5,
                paddingRight: 5,
                minWidth: 270,
                maxWidth: 270,
              },
              ios: {
                paddingLeft: 10,
                paddingRight: 10,
              },
            }),
            fontSize: 16,
            paddingBottom: 10,
          }}>
          See your tracked moods in Statistics
        </Dialog.Description>
      </Dialog.Container>
    </>
  );
};
