import {
  Ionicons,
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import { MoodOverview } from '../../components/moodtrackingapp/moodoverview';
import { Color } from '../../constants';
import { Routes } from '../../navigation';
import { Text, Header, Container } from '../../themes';

export const MoodTracking = ({ navigation }) => {
  const [showMoodOverview, setShowMoodOverview] = useState(true);

  return (
    <Container style={styles.container}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../../../assets/images/moodtrackingapp/pinkishBeach.jpg')}>
        <LinearGradient
          colors={['#24c6dc', '#514A9D']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 60,
            flexDirection: 'row',
          }}>
          <Header style={styles.header}>
            <TouchableOpacity
              style={styles.goBack}
              onPress={() => navigation.goBack()}>
              <Ionicons
                size={30}
                name="ios-arrow-dropleft"
                color={Color.white}
                style={styles.icon}
              />
            </TouchableOpacity>
            {/*              <Text style={styles.title}>Mood Tracking</Text>*/}
          </Header>
          <View style={styles.hamburgerMenu}>
            <View style={styles.bar1} />
            <View style={styles.bar2} />
            <View style={styles.bar3} />
          </View>
        </LinearGradient>
        <ScrollView style={styles.content} />
        {showMoodOverview && <MoodOverview />}
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
                onPress={() =>
                  navigation.navigate(Routes.MoodTrackingStatistics)
                }>
                <FontAwesome5
                  size={40}
                  name="heartbeat"
                  color={Color.white}
                  style={styles.icon}
                />
                <Text style={styles.iconCaptions}>Statistics</Text>
              </TouchableOpacity>
            </View>

            {!showMoodOverview && (
              <View style={styles.moodTracker}>
                {/*TODO: Change from statisticsTouchZOne styling */}
                <TouchableOpacity
                  style={styles.statisticsTouchZone}
                  onPress={() => {
                    setShowMoodOverview(true);
                  }}>
                  <View style={styles.outerCircle}>
                    <View style={styles.innerCircle}>
                      <Text style={styles.selectMoodText}>
                        Select{'\n'} Mood
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {showMoodOverview && (
              <View style={styles.moodTracker}>
                {/*TODO: Change from statisticsTouchZOne styling */}
                <TouchableOpacity
                  style={styles.statisticsTouchZone}
                  onPress={() => {
                    setShowMoodOverview(false);
                  }}>
                  <View style={styles.outerCircle}>
                    <View style={styles.innerCircle}>
                  <AntDesign
                    size={40}
                    name="close"
                    color={'#3f3f41'}
                  />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.contact}>
              <MaterialCommunityIcons
                size={40}
                name="message-text"
                color={Color.white}
                style={styles.icon}
              />
              <Text style={styles.iconCaptions}>Contact</Text>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.caption,
    height: '100%',
  },
  header: {
    backgroundColor: 'transparent',
    shadowOpacity: 0.0,
    shadowColor: 'transparent',
  },
  goBack: {
    zIndex: 2,
    marginLeft: 10,
  },
  hamburgerMenu: {
    position: 'absolute',
    right: 10,
    top: 5,
    bottom: 5,
    height: 50,
    width: 40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  bar1: {
    width: 30,
    height: 4,
    backgroundColor: Color.white,
    margin: 3,
  },
  bar2: {
    width: 30,
    height: 4,
    backgroundColor: Color.white,
    margin: 3,
  },
  bar3: {
    width: 30,
    height: 4,
    backgroundColor: Color.white,
    margin: 3,
  },
  content: {
    /*    padding: 10,*/
    /*    bottom: 0,*/
  },
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
    width: 121,
    height: 121,
    borderRadius: 121 / 2,
    backgroundColor: Color.white,
    borderColor: '#514A9D',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  innerCircle: {
    width: 105,
    height: 105,
    borderRadius: 105 / 2,
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
  },
  statistics: {
    flex: 0.3,
    justifyContent: 'center',
  },
  statisticsTouchZone: {
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
