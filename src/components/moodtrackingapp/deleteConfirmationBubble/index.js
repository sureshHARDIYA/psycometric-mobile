import React from 'react';
import { View } from 'react-native';
import Dialog from 'react-native-dialog';


export const DeleteConfirmationBubble = (props) => {
  return (
    <View>
      <Dialog.Container
        visible
        onBackdropPress={() => {
          props.setShowDeleteConfirmationBubble(false);
        }}>
        <Dialog.Description
          style={{width: 240}}
        >
          Are you sure you want to delete the tracked mood?
        </Dialog.Description>
        <Dialog.Button
          label="Cancel"
          color="#DE6465"
          onPress={() => {
           props.setShowDeleteConfirmationBubble(false);
          }}
        />
        <Dialog.Button
          label="Confirm"
          color="#3CBB75"
          onPress={() => {
            props.deleteMood(props.moodId);
            props.setShowDeleteConfirmationBubble(false);
          }}
        />
      </Dialog.Container>
    </View>
  );
};
