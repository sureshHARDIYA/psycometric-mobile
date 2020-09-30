import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Color } from '../../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '../../../themes';
import { Ionicons } from '@expo/vector-icons';

export class TopMenu extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
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
              onPress={() => this.props.navigation.goBack()}>
              <Ionicons
                size={30}
                name="ios-arrow-dropleft"
                color={Color.white}
                style={styles.icon}
              />
            </TouchableOpacity>
          </Header>
          {'MoodTracking' !== 'MoodTracking'
          && (
          <Text style={styles.statisticsTopMenuText}>Mood Tracking</Text>)}

          {'MoodTrackingStatistics' !== 'MoodTrackingStatistics'
          && (
            <Text style={styles.statisticsTopMenuText}>Statistics</Text>)}

          <View style={styles.hamburgerMenu}>
            <View style={styles.bar1} />
            <View style={styles.bar2} />
            <View style={styles.bar3} />
          </View>
        </LinearGradient>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    shadowOpacity: 0.0,
    shadowColor: 'transparent',
  },
  goBack: {
    zIndex: 2,
    marginLeft: 10,
  },
  statisticsTopMenuText:{
    fontSize: 18,
    color: Color.white,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
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
});