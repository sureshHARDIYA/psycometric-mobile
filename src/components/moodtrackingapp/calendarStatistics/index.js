import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { moodEventStream } from '../../../utils/eventEmitter';
import { StatisticsOverviewMonth } from '../statisticsOverviewMonth';
import { SelectedDateDialog } from '../../../containers/MoodTrackingStatistics/index';

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
      data: this.props.data
    };
    this.setShowDateDetails = this.setShowDateDetails.bind(this);
    moodEventStream.on('moodsUpdated', () => {
      // Get  updatedList and reload CalendarStatistics.
      this.setState({
        data: this.props.data
      })
      console.log("moodsUpdated CalendarStatistics component: ",  this.props.data.length);
    });
  }

  setShowDateDetails(boolean) {
    this.setState({
      showDateDetails: boolean,
    });
  }

  setSelectedDayMoods(newSelectedMoodArray) {
    this.setState({
      selectedDayMoods: newSelectedMoodArray,
    });
  }

  //
  onDateChange = (selectedDate) => {
    this.setState({
      date: selectedDate,
      selectedDayMoods: this.makeSelectedDateList(selectedDate),
    });
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
    for (const [key, value] of Object.entries(this.state.data)) {
      const newKey = new Date(this.state.data[key].createdAt)
        .toISOString()
        .substring(0, 10);
      markedDatesObj[newKey] = { marked: true };
    }
    const today = new Date().toISOString().substring(0, 10);
    markedDatesObj[today] = { selected: true, selectedColor: '#514A9D' };

    return markedDatesObj;
  }

  //Sets showDateDetails to true and returns a list of the mood info on a date the user selects in the calendar.
  makeSelectedDateList = (selectedDate) => {
    this.setState({
      showDateDetails: true,
      selectedDayMoods: [],
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

    for (const [key, value] of Object.entries(this.state.data)) {
      const dateFromDB = new Date(this.state.data[key].createdAt)
        .toISOString()
        .substring(0, 10)
        .split('-');
      const trackedDay = dateFromDB[2]; // Format: '02'
      const trackedMonth =
        (new Date(this.state.data[key].createdAt).getMonth() + 1).toString()
          .length === 1
          ? '0'.concat(
          (
            new Date(this.state.data[key].createdAt).getMonth() + 1
          ).toString(),
          )
          : (
            new Date(this.state.data[key].createdAt).getMonth() + 1
          ).toString();
      const trackedYear = dateFromDB[0];
      if (
        trackedYear === selectedYear &&
        trackedMonth === selectedMonth &&
        trackedDay === selectedDay
      ) {
        tempSelectedMoods.push(this.state.data[key]);
      }
    }
    return tempSelectedMoods;
  };



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
    for (const [key, value] of Object.entries(this.state.data)) {
      const dateFromDB = new Date(this.state.data[key].createdAt)
        .toISOString()
        .substring(0, 10)
        .split('-');
      const trackedMonth =
        (new Date(this.state.data[key].createdAt).getMonth() + 1).toString()
          .length === 1
          ? '0'.concat(
          (
            new Date(this.state.data[key].createdAt).getMonth() + 1
          ).toString(),
          )
          : (
            new Date(this.state.data[key].createdAt).getMonth() + 1
          ).toString();
      const trackedYear = dateFromDB[0];
      if (trackedYear === selectedYear && trackedMonth === selectedMonth) {
        moodTrackingSelectedMonth.push(this.state.data[key]);
      }
    }
    moodEventStream.emit('moodDegreesForMonthUpdated', moodTrackingSelectedMonth);
  }

  componentDidMount() {
    console.log("Component did mount:  this.data in calendarStatistics ", this.state.data.length);
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
          theme={CalendarThemes}
          onDayPress={(day) => {
            this.setState({ date: day });
            this.onDateChange(day);
          }}
          onMonthChange={(month) => {
            this.updateMonthMoodOverview(month);
          }}
        />
        <StatisticsOverviewMonth/>
        <SelectedDateDialog
          loading={this.props.loading}
          selectedDayMoods={this.state.selectedDayMoods}
          selectedDay={this.state.selectedDay}
          selectedMonth={this.state.selectedMonth}
          selectedYear={this.state.selectedYear}
          showDateDetails={this.state.showDateDetails}
          setShowDateDetails={this.setShowDateDetails}
          onDestroy={this.props.onDestroy}
          onRefresh={this.props.onRefresh}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    alignItems: 'center',
  },
});

const CalendarThemes = {
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
};
