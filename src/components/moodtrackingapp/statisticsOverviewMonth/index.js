import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Color } from '../../../constants';
import { FontAwesome5 } from '@expo/vector-icons';

export const StatisticsOverviewMonth = (props) =>  {
  const [tenseNervousMonthDegree, incrementTenseNervous] = useState(0);
  const [irritatedAnnoyedMonthDegree, incrementIrritatedAnnoyed] = useState(0);
  const [excitedLivelyMonthDegree, incrementExcitedLively] = useState(0);
  const [cheerfulHappyMonthDegree, incrementCheerfulHappy] = useState(0);
  const [boredWearyMonthDegree, incrementBoredWeary] = useState(0);
  const [gloomySadMonthDegree, incrementGloomySad] = useState(0);
  const [relaxedCalmMonthDegree, incrementRelaxedCalm] = useState(0);


  useEffect(()=>{
    updateMonthMoodOverview(props.currentMonth)
  }, [props.currentMonth, props.data]);

  // Makes a list over number of mood trackings for different emotion the month the user has navigated to.
  const updateMonthMoodOverview = (month) => {
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
    for (const [key, value] of Object.entries(props.data)) {
      const dateFromDB = new Date(props.data[key].createdAt)
        .toISOString()
        .substring(0, 10)
        .split('-');
      const trackedMonth =
        (new Date(props.data[key].createdAt).getMonth() + 1).toString()
          .length === 1
          ? '0'.concat(
          (
            new Date(props.data[key].createdAt).getMonth() + 1
          ).toString(),
          )
          : (
            new Date(props.data[key].createdAt).getMonth() + 1
          ).toString();
      const trackedYear = dateFromDB[0];
      if (trackedYear === selectedYear && trackedMonth === selectedMonth) {
        moodTrackingSelectedMonth.push(props.data[key]);
      }
    }
    findMoodDegreesForMonth(moodTrackingSelectedMonth);
  }

 const findMoodDegreesForMonth = (moodTrackingList) => {
    if(moodTrackingList){
      incrementTenseNervous(0);
      incrementIrritatedAnnoyed(0);
      incrementExcitedLively(0);
      incrementCheerfulHappy(0);
      incrementBoredWeary(0);
      incrementGloomySad(0);
      incrementRelaxedCalm( 0);

      moodTrackingList.forEach((moodTrackingThisMonth) => {
        switch (moodTrackingThisMonth.emotion) {
          case 'Tense/Nervous':
           incrementTenseNervous(prevState => prevState + 1);
            break;
          case 'Irritated/Annoyed':
            incrementIrritatedAnnoyed(prevState => prevState + 1);
            break;
          case 'Excited/Lively':
            incrementExcitedLively(prevState => prevState + 1);
            break;
          case 'Cheerful/Happy':
            incrementCheerfulHappy(prevState => prevState + 1);
            break;
          case 'Bored/Weary':
            incrementBoredWeary(prevState => prevState + 1);
            break;
          case 'Gloomy/Sad':
            incrementGloomySad(prevState => prevState + 1);
            break;
          case 'Relaxed/Calm':
            incrementRelaxedCalm(prevState => prevState + 1);
            break;
        }
      });
    }
  }

    return(
      <View style={styles.monthlyMoodOverview}>
        {!props.loading && gloomySadMonthDegree === 0 &&
        boredWearyMonthDegree === 0 &&
        irritatedAnnoyedMonthDegree === 0 &&
        tenseNervousMonthDegree === 0 &&
        excitedLivelyMonthDegree === 0 &&
        cheerfulHappyMonthDegree === 0 &&
        relaxedCalmMonthDegree === 0 && (
          <Text style={styles.noTrackedMoodThisMonthText}>
            You have no mood trackings for this month yet.
          </Text>
        )}
        {props.loading &&(
          <Text style={styles.noTrackedMoodThisMonthText}>
          </Text>
        )}
        {!props.loading && gloomySadMonthDegree !== 0 && (
          <View>
            <FontAwesome5
              solid
              size={30}
              name="frown"
              color="#3D3D3D"
/*              ref="gloomySadEmoji"*/
              style={styles.emojiIcon}
            />
            <Text style={styles.monthDegreeNumber}>
              {gloomySadMonthDegree}
            </Text>
          </View>
        )}
        {!props.loading && boredWearyMonthDegree !== 0 && (
          <View>
            <FontAwesome5
              solid
              size={30}
              name="meh"
              color="#8B42CC"
/*              ref="boredWearyEmoji"*/
              style={styles.emojiIcon}
            />
            <Text style={styles.monthDegreeNumber}>
              {boredWearyMonthDegree}
            </Text>
          </View>
        )}
        {!props.loading && irritatedAnnoyedMonthDegree !== 0 && (
          <View>
            <FontAwesome5
              solid
              size={30}
              name="angry"
              color="#DE6465"
/*              ref="irritatedAnnoyedEmoji"*/
              style={styles.emojiIcon}
            />
            <Text style={styles.monthDegreeNumber}>
              {irritatedAnnoyedMonthDegree}
            </Text>
          </View>
        )}
        {!props.loading && tenseNervousMonthDegree !== 0 && (
          <View>
            <FontAwesome5
              solid
              size={30}
              name="frown-open"
              color="#3CBB75"
/*              ref="tenseNervousEmoji"*/
              style={styles.emojiIcon}
            />
            <Text style={styles.monthDegreeNumber}>
              {tenseNervousMonthDegree}
            </Text>
          </View>
        )}
        {!props.loading && excitedLivelyMonthDegree !== 0 && (
          <View>
            <FontAwesome5
              solid
              size={30}
              name="grin-stars"
              color="#EB7955"
/*              ref="excitedLivelyEmoji"*/
              style={styles.emojiIcon}
            />
            <Text style={styles.monthDegreeNumber}>
              {excitedLivelyMonthDegree}
            </Text>
          </View>
        )}
        {!props.loading && cheerfulHappyMonthDegree !== 0 && (
          <View>
            <FontAwesome5
              solid
              size={30}
              name="laugh-beam"
              color="#F7CB50"
/*              ref="cheerfulHappyEmoji"*/
              style={styles.emojiIcon}
            />
            <Text style={styles.monthDegreeNumber}>
              {cheerfulHappyMonthDegree}
            </Text>
          </View>
        )}
        {!props.loading && relaxedCalmMonthDegree !== 0 && (
          <View>
            <FontAwesome5
              solid
              size={30}
              name="smile-beam"
              color="#425CCC"
/*              ref="relaxedCalmEmoji"*/
              style={styles.emojiIcon}
            />
            <Text style={styles.monthDegreeNumber}>
              {relaxedCalmMonthDegree}
            </Text>
          </View>
        )}
      </View>
    );
}


const styles = StyleSheet.create({
  monthlyMoodOverview: {
    width: 300,
    height: 100,
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
})