import React from 'react';
import { Platform, ScrollView, StyleSheet, View, Text, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
/*import {Overlay} from 'react-native-elements';*/
/*import Date from '../../themes/Date';*/
import { Color } from '../../../constants';

export class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /*      dateString: moment(new Date()).format('YYYY-MM-DD'),
            date: this.props.date || moment(new Date()),*/
      mode: 'date',
      show: false,
    };
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.date;
    this.setState({
      show: (Platform.OS === 'ios'),
      date: currentDate,
    });
    /*  this.$store.commit('statistics/emptySelectedDateMoods');
  if (!this.userSelectedDate) return;
  let userSelectedDate = this.userSelectedDate.split("-");
  this.$store.commit('statistics/setSelectedDate', userSelectedDate);

  let selectedYear = userSelectedDate[0]
  let selectedMonth = userSelectedDate[1]
  let selectedDay = userSelectedDate[2]

  this.filteredMoods = this.moods.filter(trackedMood => {
    let dateFromDB = new Date(trackedMood.time).toString().split(" ")
    let trackedDay = dateFromDB[2]
    let trackedMonth = '0'.concat((new Date(trackedMood.time).getMonth() + 1).toString());
    let trackedYear = dateFromDB[3]
    return ((trackedYear === selectedYear) && (trackedMonth === selectedMonth) && (trackedDay === selectedDay))*/
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


  render() {
    return (
      <View style={styles.calendar}>
       {/* {this.props.data.map((val, index, arr) => {
          return (
            <View>
              <Text>{val.emotion}</Text>
              <Text>{val.degree}</Text>
            </View>
          );
        })}*/}
        {/*<DateTimePicker
          testID="dateTimePicker"
          value={`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}` }
          value={15}
          mode={'date'}
          is24Hour={true}
          locale="en_GB"
          onChange={this.onChange}
          display="default"
        />*/}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  calendar: {
    width: 200,
    height: 300,
    /*    backgroundColor: Color.error,*/
  },
});
