import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Dialog from 'react-native-dialog';
import { DataTable } from 'react-native-paper';

import { Color } from '../../../constants';

const Pages = [
  {
    key: 1,
    name: 'Page 1',
  },
  {
    key: 2,
    name: 'Page 2',
  },
  {
    key: 3,
    name: 'Page 3',
  },
];

export class CalendarStatistics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      mode: 'date',
      showDateDetails: false,
      selectedDayMoods: [],
      selectedDay: '',
      selectedMonth: '',
      selectedYear: '',

      // For mood overview, selected month:
      tenseNervousMonthDegree: 0,
      irritatedAnnoyedMonthDegree: 0,
      excitedLivelyMonthDegree: 0,
      cheerfulHappyMonthDegree: 0,
      boredWearyMonthDegree: 0,
      gloomySadMonthDegree: 0,
      relaxedCalmMonthDegree: 0,

      page: 1,
      itemsPerPage: 5,
    };
  }

  incrementTenseNervousMonthDegree() {
    this.setState((prevState) => ({
      tenseNervousMonthDegree: prevState.tenseNervousMonthDegree + 1,
    }));
  }

  incrementIrritatedAnnoyedMonthDegree() {
    this.setState((prevState) => ({
      irritatedAnnoyedMonthDegree: prevState.irritatedAnnoyedMonthDegree + 1,
    }));
  }

  incrementExcitedLivelyMonthDegree() {
    this.setState((prevState) => ({
      excitedLivelyMonthDegree: prevState.excitedLivelyMonthDegree + 1,
    }));
  }

  incrementCheerfulHappyMonthDegree() {
    this.setState((prevState) => ({
      cheerfulHappyMonthDegree: prevState.cheerfulHappyMonthDegree + 1,
    }));
  }

  incrementBoredWearyMonthDegree() {
    this.setState((prevState) => ({
      boredWearyMonthDegree: prevState.boredWearyMonthDegree + 1,
    }));
  }

  incrementGloomySadMonthDegree() {
    this.setState((prevState) => ({
      gloomySadMonthDegree: prevState.gloomySadMonthDegree + 1,
    }));
  }

  incrementRelaxedCalmMonthDegree() {
    this.setState((prevState) => ({
      relaxedCalmMonthDegree: prevState.relaxedCalmMonthDegree + 1,
    }));
  }

  setSelectedDayMoods(newSelectedMoodArray) {
    this.setState({
      selectedDayMoods: newSelectedMoodArray,
    });
  }

  onChange = (selectedDate) => {
    this.setState({
      date: selectedDate,
      selectedDayMoods: this.showDateInfo(selectedDate),
    });
  };
  selectedDate;
  showDateInfo = (selectedDate) => {
    this.setState({
      showDateDetails: true,
    });
    const tempSelectedMoods = [];

    const selectedYear = selectedDate['year'].toString();
    const selectedMonth =
      selectedDate['month'].toString().length === 1
        ? '0'.concat(selectedDate['month']).toString()
        : selectedDate['month'].toString();
    //check if 2 characters, Format: '09' or '10'
    const selectedDay =
      selectedDate['day'].toString().length === 1
        ? '0'.concat(selectedDate['day']).toString()
        : selectedDate['day'].toString();

    this.setState({
      selectedDay,
      selectedMonth,
      selectedYear,
    });

    if (!selectedDate) return;
    for (const [key, value] of Object.entries(this.props.data)) {
      const dateFromDB = new Date(this.props.data[key].createdAt)
        .toISOString()
        .substring(0, 10)
        .split('-');
      const trackedDay = dateFromDB[2]; // Format: '02'
      const trackedMonth =
        (new Date(this.props.data[key].createdAt).getMonth() + 1).toString()
          .length === 1
          ? '0'.concat(
          (
            new Date(this.props.data[key].createdAt).getMonth() + 1
          ).toString(),
          )
          : (
            new Date(this.props.data[key].createdAt).getMonth() + 1
          ).toString(); //check if 2 characters, Format: '09' or '10'
      const trackedYear = dateFromDB[0]; //Format: '2020'
      if (
        trackedYear === selectedYear &&
        trackedMonth === selectedMonth &&
        trackedDay === selectedDay
      ) {
        tempSelectedMoods.push(this.props.data[key]);
      }
    }
    return tempSelectedMoods;
  };

  showMode = (currentMode) => {
    this.setState({
      show: true,
      mode: currentMode,
    });
  };

  showDatepicker = () => {
    this.setState({
      show: this.date,
    });
  };

  showTimepicker = () => {
    this.showMode('time');
  };

  // Marks all dates that contain tracked mood with color.
  findTrackedDates() {
    const markedDatesObj = {};
    for (const [key, value] of Object.entries(this.props.data)) {
      const newKey = new Date(this.props.data[key].createdAt)
        .toISOString()
        .substring(0, 10);
      markedDatesObj[newKey] = { marked: true };
    }
    const today = new Date().toISOString().substring(0, 10);
    markedDatesObj[today] = { selected: true, selectedColor: '#514A9D' };

    return markedDatesObj;
  }

  updateMonthMoodOverview(month) {
    let selectedMonth;
    let selectedYear;
    if (month.month) {
      selectedMonth =
        month.month.toString().length === 1
          ? '0'.concat(month.month).toString()
          : month.month.toString();
      selectedYear = month.year.toString();
    } else {
      selectedMonth = new Date().toISOString().substring(0, 10).split('-')[1];
      selectedYear = new Date().toISOString().substring(0, 10).split('-')[0];
    }

    const moodTrackingSelectedMonth = [];
    /* Alert.alert(`month changed: ${selectedMonth} ${selectedYear}`, ''); // 9 or 10 type= number*/
    for (const [key, value] of Object.entries(this.props.data)) {
      const dateFromDB = new Date(this.props.data[key].createdAt)
        .toISOString()
        .substring(0, 10)
        .split('-');
      const trackedMonth =
        (new Date(this.props.data[key].createdAt).getMonth() + 1).toString()
          .length === 1
          ? '0'.concat(
          (
            new Date(this.props.data[key].createdAt).getMonth() + 1
          ).toString(),
          )
          : (
            new Date(this.props.data[key].createdAt).getMonth() + 1
          ).toString(); //check if 2 characters, Format: '09' or '10'
      const trackedYear = dateFromDB[0]; //Format: '2020'
      if (trackedYear === selectedYear && trackedMonth === selectedMonth) {
        moodTrackingSelectedMonth.push(this.props.data[key]);
      }
      this.findMoodDegreesForMonth(moodTrackingSelectedMonth);
    }
  }

  findMoodDegreesForMonth(moodTrackingList) {
    this.setState({
      tenseNervousMonthDegree: 0,
      irritatedAnnoyedMonthDegree: 0,
      excitedLivelyMonthDegree: 0,
      cheerfulHappyMonthDegree: 0,
      boredWearyMonthDegree: 0,
      gloomySadMonthDegree: 0,
      relaxedCalmMonthDegree: 0,
    });

    moodTrackingList.forEach((moodTrackingThisMonth) => {
      switch (moodTrackingThisMonth.emotion) {
        case 'Tense/Nervous':
          this.incrementTenseNervousMonthDegree();
          break;
        case 'Irritated/Annoyed':
          this.incrementIrritatedAnnoyedMonthDegree();
          break;
        case 'Excited/Lively':
          this.incrementExcitedLivelyMonthDegree();
          break;
        case 'Cheerful/Happy':
          this.incrementCheerfulHappyMonthDegree();
          break;
        case 'Bored/Weary':
          this.incrementBoredWearyMonthDegree();
          break;
        case 'Gloomy/Sad':
          this.incrementGloomySadMonthDegree();
          break;
        case 'Relaxed/Calm':
          this.incrementRelaxedCalmMonthDegree();
          break;
      }
    });
  }

  componentDidMount() {
    this.updateMonthMoodOverview(new Date());
  }

  render() {
    const date = this.state.date;
    LocaleConfig.locales['en'] = {
      monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'April',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ],
      dayNames: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    };
    LocaleConfig.defaultLocale = 'en';

    return (
      <View style={styles.calendar}>
        <Calendar
          enableSwipeMonths
          current={date}
          markedDates={this.findTrackedDates()}
          hideExtraDays={false}
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 24,
            height: 365,
            width: 300,
          }}
          theme={{
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#24C6DC',
            selectedDotColor: '#ffffff',
            arrowColor: '#514A9D',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: '#514A9D',
            indicatorColor: 'blue',
            textDayFontFamily: 'sans-serif',
            textMonthFontFamily: 'sans-serif',
            textDayHeaderFontFamily: 'sans-serif',
            textDayFontWeight: '300',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 16,
          }}
          onDayPress={(day) => {
            this.setState({ date: day });
            this.onChange(day);
          }}
          onMonthChange={(month) => {
            this.updateMonthMoodOverview(month);
          }}
        />

        <View style={styles.monthlyMoodOverview}>
          {(this.state.gloomySadMonthDegree === 0) && (this.state.boredWearyMonthDegree === 0) &&
          (this.state.irritatedAnnoyedMonthDegree === 0) && (this.state.tenseNervousMonthDegree === 0) &&
          (this.state.excitedLivelyMonthDegree === 0) && (this.state.cheerfulHappyMonthDegree === 0) &&
          (this.state.relaxedCalmMonthDegree === 0) && (
            <Text style={styles.noTrackedMoodThisMonthText}>You have no mood trackings for this month yet.</Text>
          )}
          {this.state.gloomySadMonthDegree !== 0 && (
            <View>
              <FontAwesome5
                solid
                size={30}
                name="frown"
                color="#3D3D3D"
                ref="gloomySadEmoji"
                style={styles.emojiIcon}
              />
              <Text style={styles.monthDegreeNumber}>
                {this.state.gloomySadMonthDegree}
              </Text>
            </View>
          )}
          {this.state.boredWearyMonthDegree !== 0 && (
            <View>
              <FontAwesome5
                solid
                size={30}
                name="meh"
                color="#8B42CC"
                ref="boredWearyEmoji"
                style={styles.emojiIcon}
              />
              <Text style={styles.monthDegreeNumber}>
                {this.state.boredWearyMonthDegree}
              </Text>
            </View>
          )}
          {this.state.irritatedAnnoyedMonthDegree !== 0 && (
            <View>
              <FontAwesome5
                solid
                size={30}
                name="angry"
                color="#DE6465"
                ref="irritatedAnnoyedEmoji"
                style={styles.emojiIcon}
              />
              <Text style={styles.monthDegreeNumber}>
                {this.state.irritatedAnnoyedMonthDegree}
              </Text>
            </View>
          )}
          {this.state.tenseNervousMonthDegree !== 0 && (
            <View>
              <FontAwesome5
                solid
                size={30}
                name="frown-open"
                color="#3CBB75"
                ref="tenseNervousEmoji"
                style={styles.emojiIcon}
              />
              <Text style={styles.monthDegreeNumber}>
                {this.state.tenseNervousMonthDegree}
              </Text>
            </View>
          )}
          {this.state.excitedLivelyMonthDegree !== 0 && (
            <View>
              <FontAwesome5
                solid
                size={30}
                name="grin-stars"
                color="#EB7955"
                ref="excitedLivelyEmoji"
                style={styles.emojiIcon}
              />
              <Text style={styles.monthDegreeNumber}>
                {this.state.excitedLivelyMonthDegree}
              </Text>
            </View>
          )}
          {this.state.cheerfulHappyMonthDegree !== 0 && (
            <View>
              <FontAwesome5
                solid
                size={30}
                name="laugh-beam"
                color="#F7CB50"
                ref="cheerfulHappyEmoji"
                style={styles.emojiIcon}
              />
              <Text style={styles.monthDegreeNumber}>
                {this.state.cheerfulHappyMonthDegree}
              </Text>
            </View>
          )}
          {this.state.relaxedCalmMonthDegree !== 0 && (
            <View>
              <FontAwesome5
                solid
                size={30}
                name="smile-beam"
                color="#425CCC"
                ref="relaxedCalmEmoji"
                style={styles.emojiIcon}
              />
              <Text style={styles.monthDegreeNumber}>
                {this.state.relaxedCalmMonthDegree}
              </Text>
            </View>
          )}
        </View>

        <Dialog.Container
          visible={this.state.showDateDetails}
          onBackdropPress={() => {
            this.setState({
              showDateDetails: false,
            });
          }}
        >
          <AntDesign
            size={25}
            name="close"
            color="grey"
            style={{ position: 'absolute', right: 0, top: 0, padding: 10 }}
            onPress={() => {
              this.setState({ showDateDetails: false });
            }}
          />
          <Dialog.Title style={styles.tableTitle}>
            <Text>
              <Text>Tracked moods:{' '}</Text>
              <Text style={{ color: '#514A9D' }}>
                {this.state.selectedDay}.{this.state.selectedMonth}.
                {this.state.selectedYear}{' '}
              </Text>
            </Text>
          </Dialog.Title>
          {this.state.selectedDayMoods.length === 0 && (
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
            {this.state.selectedDayMoods.length > 0 &&
            this.state.selectedDayMoods.map((mood, index) => {
              return (
                <DataTable.Row key={mood.id} style={{ height: 70 }}>
                  <DataTable.Cell style={{ flex: 3, height: 70 }}>
                    <Text>{`${mood.emotion}`}</Text>
                    <Text style={{ fontSize: 12 }}>{`\n ${mood.createdAt}`}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={{ flex: 1, height: 70 }}>{mood.degree}</DataTable.Cell>
                  <DataTable.Cell numeric style={{ flex: 1, height: 70 }}>
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

            {/*TODO: fix pagination: const every_nth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);*/}
            <DataTable.Pagination
              page={this.state.page}
              numberOfPages={Pages.length}
              onPageChange={(newPage) => {
                this.setState({ page: newPage });
              }}
              label={`${this.state.page} of ${Pages.length}`}
            />
          </DataTable>
        </Dialog.Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    alignItems: 'center',
  },
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
  monthlyMoodOverview: {
    width: 300,
    height: 155,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Color.white,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  emojiIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
  },
  monthDegreeNumber: {
    textAlign: 'center',
    paddingTop: 5,
  },
  noTrackedMoodThisMonthText: {
    textAlign: 'center',
    width: '100%',
    padding: 15,
  },
});
