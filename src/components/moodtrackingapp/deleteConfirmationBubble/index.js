import React from 'react';
import Dialog from 'react-native-dialog';
import { Platform, View } from 'react-native';


export const DeleteConfirmationBubble = (props) => {
  return (
    <View>
      <Dialog.Container
        visible
        style={{alignSelf: "center"}}
        onBackdropPress={() => {
          props.setShowDeleteConfirmationBubble(false);
        }}>
        <Dialog.Description
          style={{width: 270, fontSize: 16,
            ...Platform.select({
              android: {
                padding: 10,
              },
              ios: {
                padding: 15,
              },
            }),
            minWidth: 270,
            alignSelf: "center"
          }}
        >
          Are you sure you want to delete the tracked mood?
        </Dialog.Description>
        <Dialog.Button
          label="No, Mistake"
          color="#DE6465"
          onPress={() => {
            props.setShowDeleteConfirmationBubble(false);
          }}
        />
        <Dialog.Button
          label="Yes"
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
