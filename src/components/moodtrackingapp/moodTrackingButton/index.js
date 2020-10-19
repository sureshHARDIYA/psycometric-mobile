import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Color } from '../../../constants';
import { Routes } from '../../../navigation';

export const MoodTrackingButton = (props) => {
  return (
    <>
      {props.page === 'moodtracking' &&
      !props.showMoodOverview && (
        <View style={styles.moodTracker}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <LinearGradient
                colors={['#24c6dc', '#514A9D']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: -1,
                  height: 125,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 125 / 2,
                }}>
                <TouchableOpacity
                  style={styles.moodTrackerTouchZone}
                  hitSlop={{ top: 34, bottom: 34, left: 34, right: 34 }}
                  onPress={() => props.openMoodOverview()}>
                  <FontAwesome5
                    solid
                    size={50}
                    name="laugh-beam"
                    color={Color.white}
                  />
                  <Text style={styles.selectMoodText}>
                    Track Mood
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      )}

      {props.page === 'home' &&
      !props.showMoodOverview && (
        <View style={styles.moodTracker}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <LinearGradient
                colors={['#24c6dc', '#514A9D']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: -1,
                  height: 125,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 125 / 2,
                }}>
                <TouchableOpacity
                  style={styles.moodTrackerTouchZone}
                  hitSlop={{ top: 34, bottom: 34, left: 34, right: 34 }}
                  onPress={() => props.navigation.navigate(Routes.MoodTracking)}>
                  <FontAwesome5
                    solid
                    size={50}
                    name="laugh-beam"
                    color={Color.white}
                  />
                  <Text style={styles.selectMoodText}>
                    Track Mood
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      )}

      {props.page === 'moodtracking' &&
      props.showMoodOverview && (
        <View style={styles.moodTracker}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <LinearGradient
                colors={['#24c6dc', '#514A9D']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  height: 125,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 125 / 2,
                }}>
                <TouchableOpacity
                  style={styles.moodTrackerTouchZone}
                  hitSlop={{ top: 34, bottom: 34, left: 34, right: 34 }}
                  onPress={() => props.closeMoodOverview()}>
                  <AntDesign size={45} name="close" color={Color.white} />
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  moodTracker: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  outerCircle: {
    width: 140,
    height: 140,
    borderRadius: 140 / 2,
    backgroundColor: Color.white,
    borderColor: '#514A9D',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  innerCircle: {
    width: 125,
    height: 125,
    borderRadius: 125 / 2,
    backgroundColor: Color.white,
    borderColor: '#514A9D',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  selectMoodText: {
    textAlign: 'center',
    fontSize: 16,
    color: Color.white,
  },
  moodTrackerStatistics: {
    flex: 0.4,
    justifyContent: 'center',
    position: 'relative',
    borderColor: Color.white,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    height: 80,
    top: 15,
  },
  moodTrackerTouchZone: {
    alignItems: 'center',
  },
});
