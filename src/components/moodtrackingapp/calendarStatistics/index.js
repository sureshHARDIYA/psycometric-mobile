import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import { SelectedDateDialog } from '../../../containers/MoodTrackingStatistics/index';
import { StatisticsOverviewMonth } from '../statisticsOverviewMonth';

export const CalendarStatistics = (props) => {
  const [showDateDetails, setShowDateDetails] = useState(false);
  const [selectedDayMoods, setSelectedDayMoods] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDate, setSelectedDate] = useState({});
  const [data, setData] = useState(props.data);
  const [currentMonth, setCurrentMonth] = useState(new Date());


  useEffect(() => {
    setData(props.data);
    onDateChange(selectedDate);
  }, [props.data]);

  // set selectedDate to the date the user select and stores a list
  // of mood tracking on that date in selectedDayMoods.
  const onDateChange = (selectedDate) => {
    if (Object.keys(selectedDate).length !== 0) {
      let x = makeSelectedDateList(selectedDate);
      setSelectedDayMoods(x);
      setSelectedDate(selectedDate);
    }
  };

  // Marks all dates that contain tracked mood with color.
  const findTrackedDates = () => {
    const markedDatesObj = {};
    for (const [key, value] of Object.entries(props.data)) {
      const newKey = new Date(props.data[key].createdAt)
        .toISOString()
        .substring(0, 10);
      markedDatesObj[newKey] = { marked: true };
    }
    const today = new Date().toISOString().substring(0, 10);
    markedDatesObj[today] = { selected: true, selectedColor: '#4d4699DE' };

    return markedDatesObj;
  };

  //Sets showDateDetails to true and returns a list of the mood info on a date the user selects in the calendar.
  const makeSelectedDateList = (selectedDate) => {
    setShowDateDetails(true);
    setSelectedDayMoods([]);
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
    setSelectedDay(selectedDay);
    setSelectedMonth(selectedMonth);
    setSelectedYear(selectedYear);

    for (const [key, value] of Object.entries(props.data)) {
      const dateFromDB = new Date(props.data[key].createdAt)
        .toISOString()
        .substring(0, 10)
        .split('-');
      const trackedDay = dateFromDB[2];
      const trackedMonth =
        (new Date(props.data[key].createdAt).getMonth() + 1).toString().length === 1
          ? '0'.concat(
              (new Date(props.data[key].createdAt).getMonth() + 1).toString()
            )
          : (new Date(props.data[key].createdAt).getMonth() + 1).toString();
      const trackedYear = dateFromDB[0];
      if (
        trackedYear === selectedYear &&
        trackedMonth === selectedMonth &&
        trackedDay === selectedDay
      ) {
        tempSelectedMoods.push(props.data[key]);
      }
    }
    return tempSelectedMoods;
  };

  const DATE = new Date();
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
        current={DATE}
        markedDates={findTrackedDates()}
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
          onDateChange(day);
        }}
        onMonthChange={(month) => {
          setCurrentMonth(month);
        }}
      />
      <StatisticsOverviewMonth
        loading={props.loading}
        currentMonth={currentMonth}
        data={data}
      />
      <SelectedDateDialog
        selectedDayMoods={selectedDayMoods}
        selectedDay={selectedDay}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        date={props.date}
        showDateDetails={showDateDetails}
        setShowDateDetails={setShowDateDetails}
        data={data}
      />
    </View>
  );
};

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
