import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Color } from '../../../constants';
import { Routes } from '../../../navigation';
import Emitter from '../../../utils/eventEmitter';
import { MoodOverview } from '../moodoverview';

export const MainMenu = (props) => {
  const [showMoodOverview, setShowMoodOverview] = useState(false);

  Emitter.off('closeMoodOverview');
  Emitter.on('closeMoodOverview', () => {
    closeMoodOverview();
  });

  const openMoodOverview = () => {
    setShowMoodOverview(true);
  };

  const closeMoodOverview = () => {
    setShowMoodOverview(false);
  };


  return (
    <View>
      {showMoodOverview && (
        <MoodOverview
          navigation={props.navigation}
        />
      )}
      <View style={styles.mainMenu}>
        <LinearGradient
          colors={['#24c6dc', '#514A9D']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 110,
            flexDirection: 'row',
          }}>
          <View style={styles.statistics}>
            <TouchableOpacity
              style={styles.statisticsTouchZone}
              onPress={() => {
                props.navigation.navigate(Routes.MoodTrackingStatistics);
                setShowMoodOverview(false);
              }}>
              <FontAwesome5
                size={40}
                name="heartbeat"
                color={Color.white}
                style={styles.icon}
              />
              {props.page === 'statistics' && (
                <Text style={[styles.iconCaptions, styles.statisticsBorder]}>
                  Statistics
                </Text>
              )}
              {props.page === 'moodtracking' && (
                <Text style={styles.iconCaptions}>Statistics</Text>
              )}
            </TouchableOpacity>
          </View>

          {props.page === 'moodtracking' &&
          !showMoodOverview && (
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
                      onPress={() => openMoodOverview()}>
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

          {props.page === 'moodtracking' && showMoodOverview && (
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
                      onPress={() => closeMoodOverview()}>
                      <AntDesign size={45} name="close" color={Color.white} />
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
          )}

          {props.page === 'statistics' && (
            <View style={styles.moodTrackerStatistics}>
              <TouchableOpacity
                style={styles.moodTrackerTouchZone}
                onPress={() => props.navigation.goBack()}>
                <FontAwesome5
                  solid
                  size={40}
                  name="laugh-beam"
                  color={Color.white}
                />
                <Text style={styles.iconCaptions}>Mood Tracking</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.contact}>
            <TouchableOpacity
              style={styles.moodTrackerTouchZone}
              onPress={() => props.navigation.navigate(Routes.About)}>
              <AntDesign name="infocirlce" size={40} color={Color.white} style={styles.icon} />
              <Text style={styles.iconCaptions}>Info</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainMenu: {
    height: 110,
  },
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
  statistics: {
    flex: 0.3,
    justifyContent: 'center',
  },
  statisticsBorder: {
    borderBottomWidth: 2,
    paddingBottom: 2,
    borderColor: Color.white,
  },
  statisticsTouchZone: {
    alignItems: 'center',
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
  contact: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCaptions: {
    fontSize: 16,
    color: Color.white,
  },
});
