import React from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import Dialog from 'react-native-dialog';
import { DataTable } from 'react-native-paper';

export class SelectedDateDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      itemsPerPage: 5,
      numberOfPages: 1,
      pages: [],
    };
  }

  cancelDialog() {
    this.props.setShowDateDetails(false);
  }

  deleteMood(id) {
    this.props.onDestroy([`${id}`]);
    // TODO: Make sure to update component/list
  }

  render() {
    return (
      <Dialog.Container
        visible={this.props.showDateDetails}
        onBackdropPress={() => {
          this.cancelDialog();
        }}
      >
        <AntDesign
          size={25}
          name="close"
          color="grey"
          style={{ position: 'absolute', right: 0, top: 0, padding: 10 }}
          onPress={() => {
            this.cancelDialog();
          }}
        />
        <Dialog.Title style={styles.tableTitle}>
          <Text>
            <Text>Tracked moods:{' '}</Text>
            <Text style={{ color: '#514A9D' }}>
              {this.props.selectedDay}.{this.props.selectedMonth}.
              {this.props.selectedYear}{' '}
            </Text>
          </Text>
        </Dialog.Title>
        {this.props.selectedDayMoods.length === 0 && (
          <Text style={styles.noMoodsInfo}>
            {' '}
            There are no tracked mood on the day you have selected.
          </Text>
        )}
        <DataTable style={styles.dataTable}>
          <DataTable.Header>
            <DataTable.Title style={{ flex: 3 }}>Emotion</DataTable.Title>
            <DataTable.Title numeric style={{ flex: 1 }}>Degree</DataTable.Title>
            <DataTable.Title numeric style={{ flex: 1 }} />
          </DataTable.Header>
          {this.props.selectedDayMoods.length > 0 &&
          this.props.selectedDayMoods.map((mood, index) => {
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
                  <Text>{`${mood.emotion}`}{'\n'}</Text>
                  <Text style={{ fontSize: 12 }}>{`\n ${mood.createdAt}`}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={{ flex: 1, height: 70 }}>{mood.degree}</DataTable.Cell>
                <DataTable.Cell numeric style={{ flex: 1, height: 70 }}>
                  <FontAwesome5
                    solid
                    size={16}
                    name="trash-alt"
                    color="#454444"
                    onPress={() => {
                      this.deleteMood(mood.id);
                    }}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
          <DataTable.Pagination
            page={this.state.page}
            numberOfPages={0}
            onPageChange={(newPage) => {
              this.setState({ page: newPage });
            }}
            label={`Page ${this.props.selectedDayMoods.length >= 1 ? this.state.page : 0} of ${this.props.selectedDayMoods.length >= 1 ? Math.ceil(this.props.selectedDayMoods.length / 5) : 0}`}
          />
        </DataTable>
      </Dialog.Container>
    );
  }

}

const styles = StyleSheet.create({
  tableTitle: {
    textAlign: 'center',
    marginTop: 10,
  },
  noMoodsInfo: {
    textAlign: 'center',
  },
  dataTable: {
    width: 260,
  },
});