import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { moodEventStream } from '../../../utils/eventEmitter'
import { StyleSheet, Text, View } from 'react-native';
import { Color } from '../../../constants';
import { FontAwesome5 } from '@expo/vector-icons';

export class StatisticsOverviewMonth extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      tenseNervousMonthDegree: 0,
      irritatedAnnoyedMonthDegree: 0,
      excitedLivelyMonthDegree: 0,
      cheerfulHappyMonthDegree: 0,
      boredWearyMonthDegree: 0,
      gloomySadMonthDegree: 0,
      relaxedCalmMonthDegree: 0,
    }
    this.moodEventStream = moodEventStream;
  }

  componentDidMount() {
/*    this.moodEventStream.clear();*/
    this.moodEventStream.on('moodDegreesForMonthUpdated', this.findMoodDegreesForMonth.bind(this));
/*    this.moodEventStream.on('moodsDidUpdate', this.findMoodDegreesForMonth.bind(this));*/

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

  findMoodDegreesForMonth(moodTrackingList) {
    // TODO: null in findMoodDegressForMonth, null in forEach.
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


  render(){
    return(
      <View style={styles.monthlyMoodOverview}>
        {this.state.gloomySadMonthDegree === 0 &&
        this.state.boredWearyMonthDegree === 0 &&
        this.state.irritatedAnnoyedMonthDegree === 0 &&
        this.state.tenseNervousMonthDegree === 0 &&
        this.state.excitedLivelyMonthDegree === 0 &&
        this.state.cheerfulHappyMonthDegree === 0 &&
        this.state.relaxedCalmMonthDegree === 0 && (
          <Text style={styles.noTrackedMoodThisMonthText}>
            You have no mood trackings for this month yet.
          </Text>
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
    );
  }
}


const styles = StyleSheet.create({
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
})