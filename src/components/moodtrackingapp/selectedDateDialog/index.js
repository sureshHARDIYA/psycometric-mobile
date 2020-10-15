import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import Dialog from 'react-native-dialog';
import { DataTable } from 'react-native-paper';
import Emitter from '../../../utils/eventEmitter';

export const SelectedDateDialog = (props) => {
  const [selectedDayMoods, setSelectedDayMoods] = useState([]);

  useEffect(() => {
    console.log('BEFORE: ', props.selectedDayMoods.length);
    setSelectedDayMoods(props.selectedDayMoods);
    console.log('ADTERs: ', props.selectedDayMoods.length);
  }, [props.selectedDayMoods]);

  const cancelDialog = () => {
    props.setShowDateDetails(false);
  };

  const deleteMood = (id) => {
    props.onDestroy([`${id}`]);
    Emitter.emit('MoodDeleted');
    /*    props.refetch()
          .then(() => {
            console.log('Mood Deleted!');
          });*/
  };


  return (
    <Dialog.Container
      visible={props.showDateDetails}
      onBackdropPress={() => {
        cancelDialog();
      }}
      top={-25}
    >
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
        {'Tracked moods: ' + props.selectedDay + '.' + props.selectedMonth + '.' + props.selectedYear + ' '}
      </Dialog.Title>
      <DataTable style={styles.dataTable} maxHeight={380} height={380} maxWidth={260}>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 3 }}>Emotion</DataTable.Title>
          <DataTable.Title numeric style={{ flex: 1 }}>Degree</DataTable.Title>
          <DataTable.Title numeric style={{ flex: 1 }} />
        </DataTable.Header>
        <ScrollView>
          {selectedDayMoods.length > 0 &&
          selectedDayMoods.map((mood) => {
            return (
              <DataTable.Row key={mood.id} style={{ height: 70 }}>
                <DataTable.Cell style={{
                  flex: 3,
                  height: 70,
                  maxWidth: 150,
                  overflow: 'visible',
                  width: 200,
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                }}>
                  {mood.emotion}
                </DataTable.Cell>
                <DataTable.Cell numeric style={{ flex: 1, height: 70 }}>{mood.degree}</DataTable.Cell>
                <DataTable.Cell numeric style={{ flex: 1, height: 70, alignItems: 'center' }}
                                onPress={() => {
                                  deleteMood(mood.id);
                                }}>
                  <FontAwesome5
                    solid
                    size={16}
                    name="trash-alt"
                    color="#454444"
                  />
                </DataTable.Cell>
              </DataTable.Row>

            );
          })}
          {selectedDayMoods.length === 0 && (
            <Text style={styles.noMoodsInfo}>
              There are no tracked mood on the day you have selected.
            </Text>
          )}
        </ScrollView>
      </DataTable>
    </Dialog.Container>
  );
};

const styles = StyleSheet.create({
  tableTitle: {
    textAlign: 'center',
    marginTop: 10,
  },
  noMoodsInfo: {
    textAlign: 'center',
    padding: 15,
  },
  dataTable: {
    width: 260,
    marginBottom: 10,
  },
});