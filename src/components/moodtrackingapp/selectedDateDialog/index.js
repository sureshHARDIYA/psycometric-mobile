import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import Dialog from 'react-native-dialog';

import Emitter from '../../../utils/eventEmitter';
import { DeleteConfirmationBubble } from '../deleteConfirmationBubble';

export const SelectedDateDialog = (props) => {
  const [selectedDayMoods, setSelectedDayMoods] = useState([]);
  const [
    showDeleteConfirmationBubble,
    setShowDeleteConfirmationBubble,
  ] = useState(false);
  const [moodId, setMoodId] = useState('');

  useEffect(() => {
    setSelectedDayMoods(props.selectedDayMoods);
  }, [props.selectedDayMoods]);

  const cancelDialog = () => {
    props.setShowDateDetails(false);
  };

  const deleteMood = (id) => {
    props.onDestroy([`${id}`]);
    Emitter.emit('MoodDeleted');
  };

  const findEmojiIcon = (selectedDateMood) => {
    const emojiIconObj = {};
    switch (selectedDateMood) {
      case 'Tense/Nervous':
        emojiIconObj.icon = 'frown-open';
        emojiIconObj.color = '#3CBB75';
        break;
      case 'Irritated/Annoyed':
        emojiIconObj.icon = 'angry';
        emojiIconObj.color = '#DE6465';
        break;
      case 'Excited/Lively':
        emojiIconObj.icon = 'grin-stars';
        emojiIconObj.color = '#EB7955';
        break;
      case 'Cheerful/Happy':
        emojiIconObj.icon = 'laugh-beam';
        emojiIconObj.color = '#F7CB50';
        break;
      case 'Bored/Weary':
        emojiIconObj.icon = 'meh';
        emojiIconObj.color = '#8B42CC';
        break;
      case 'Gloomy/Sad':
        emojiIconObj.icon = 'frown';
        emojiIconObj.color = '#3D3D3D';
        break;
      case 'Relaxed/Calm':
        emojiIconObj.icon = 'smile-beam';
        emojiIconObj.color = '#425CCC';
        break;
    }
    return emojiIconObj;
  };

  return (
    <>
      <Dialog.Container
        visible={props.showDateDetails}
        style={{
          position: 'absolute',
          height: 400,
          marginTop: 120,
          alignSelf: 'center',
        }}
        maxHeight={540}
        onBackdropPress={() => {
          cancelDialog();
        }}>
        <AntDesign
          size={25}
          name="close"
          color="grey"
          style={{ position: 'absolute', right: 0, top: 0, padding: 10 }}
          onPress={() => {
            cancelDialog();
          }}
        />
        <Dialog.Title style={styles.tableTitle}>
          {'How you felt on: ' +
            props.selectedDay +
            '.' +
            props.selectedMonth +
            '.' +
            props.selectedYear +
            ' '}
        </Dialog.Title>
        <ScrollView
          style={{ paddingLeft: 15, paddingRight: 15 }}
          minHeight={380}
          maxHeight={380}
          minWidth={270}>
          {selectedDayMoods.length > 0 &&
            selectedDayMoods
              .slice(0)
              .reverse()
              .map((mood) => {
                return (
                  <View
                    key={mood.id}
                    style={{
                      height: 70,
                      flexDirection: 'row',
                      alignItems: 'center',
                      top: 10,
                      marginBottom: 20,
                      paddingBottom: 15,
                      borderBottomWidth: 1,
                      borderColor: '#d3d3d3',
                    }}>
                    <View
                      numeric
                      style={{
                        flex: 1,
                        height: 100,
                        top: 22,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <FontAwesome5
                        solid
                        size={22}
                        name={findEmojiIcon(mood.emotion).icon}
                        color={findEmojiIcon(mood.emotion).color}
                        style={{ paddingBottom: 5 }}
                      />
                      <Text style={{ fontSize: 12, marginBottom: 10 }}>
                        {`${
                          new Date(mood.createdAt).getHours().toString()
                            .length === 1
                            ? '0'.concat(
                                new Date(mood.createdAt).getHours().toString()
                              )
                            : new Date(mood.createdAt).getHours()
                        }:${
                          new Date(mood.createdAt).getMinutes().toString()
                            .length === 1
                            ? '0'.concat(
                                new Date(mood.createdAt).getMinutes().toString()
                              )
                            : new Date(mood.createdAt).getMinutes()
                        }\n`}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 4,
                        height: 70,
                        maxWidth: 200,
                        marginLeft: 20,
                        marginRight: 0,
                        justifyContent: 'center',
                      }}>
                      <Text>{mood.degree + ' ' + mood.emotion}</Text>
                    </View>
                    <TouchableOpacity
                      numeric
                      style={{
                        flex: 1,
                        height: 70,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setShowDeleteConfirmationBubble(true);
                        setMoodId(mood.id);
                      }}>
                      <FontAwesome5
                        solid
                        size={16}
                        name="trash-alt"
                        color="#454444"
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
          {selectedDayMoods.length === 0 && (
            <View style={styles.noMoodsInfo}>
              <Text style={styles.noMoodsInfoText}>
                There are no tracked mood on the day you have selected.
              </Text>
            </View>
          )}
        </ScrollView>
        {showDeleteConfirmationBubble && (
          <DeleteConfirmationBubble
            showDeleteConfirmationBubble={showDeleteConfirmationBubble}
            setShowDeleteConfirmationBubble={setShowDeleteConfirmationBubble}
            deleteMood={deleteMood}
            moodId={moodId}
          />
        )}
      </Dialog.Container>
    </>
  );
};

const styles = StyleSheet.create({
  tableTitle: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'normal',
  },
  noMoodsInfo: {
    textAlign: 'center',
    width: 260,
    alignSelf: 'center',
    padding: 10,
    maxWidth: 240,
  },
  noMoodsInfoText: {
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
});
