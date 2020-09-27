import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Color } from '../../constants';
import { Text, Header, Container } from '../../themes';

export const MoodTrackingStatistics = ({ navigation }) => {

  return (
    <Container style={styles.container}>
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
            <Text style={styles.calendarTopMenuText}>Calendar</Text>
          </Header>
        </LinearGradient>
        <ScrollView style={styles.content}>
        </ScrollView>
        <View style={styles.mainMenu}>
          <LinearGradient colors={['#24c6dc', '#514A9D']}
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
                onPress={() => navigation.goBack()}>
                <FontAwesome5
                  size={40}
                  name="heartbeat"
                  color={Color.white}
                  style={styles.icon}>
                </FontAwesome5>
                <Text style={styles.iconCaptions}>Statistics</Text>
              </TouchableOpacity>
            </View>


            <View style={styles.moodTracker}>
              <TouchableOpacity
                style={styles.moodTrackerTouchZone}
                onPress={() => navigation.goBack()}>
              <FontAwesome5 size={40} name="laugh-beam" solid color={Color.white} />
                  <Text style={styles.iconCaptions}>Mood Tracking</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.contact}>
                <MaterialCommunityIcons
                  size={40}
                  name="message-text"
                  color={Color.white}
                  style={styles.icon}>
                </MaterialCommunityIcons>
                <Text style={styles.iconCaptions}>Contact</Text>
            </View>
          </LinearGradient>
        </View>
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
  calendarTopMenuText:{
    fontSize: 18,
    color: Color.white,
/*    textAlign: 'center',*/
/*    width: '100%',*/
  /*  position: 'absolute',*/
    left: '100%',
    height: 'auto',
  },
  hamburgerMenu:{
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
