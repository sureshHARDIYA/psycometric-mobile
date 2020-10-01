import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Color } from '../../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '../../../themes';
import { AntDesign, Ionicons } from '@expo/vector-icons';

export class TopMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBackgroundImagePicker: false,
    };
  }
/*
  setBackgroundImage() {
    // Check to prevent null exception.
    this.props.setBackgroundImage?.(); // Same as this.props.onPress && this.props.onPress();
  }*/

  selectBackground(selectedBackground){
    this.props.setBackgroundImage(selectedBackground);
    this.setState({showBackgroundImagePicker: false});
  }

  openBackgroundImagePicker() {
    this.setState({
      showBackgroundImagePicker: true,
    });
  }

  closeBackgroundImagePicker() {
    this.setState({
      showBackgroundImagePicker: false,
    });
  }

  render() {
    return (
      <View>
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

          {!this.showBackgroundImagePicker && (
            <TouchableOpacity
              style={styles.hamburgerMenuTouchZone}
              onPress={() => {
                this.openBackgroundImagePicker();
              }}>
              <View style={styles.hamburgerMenu}>
                <View style={styles.bar1} />
                <View style={styles.bar2} />
                <View style={styles.bar3} />
              </View>
            </TouchableOpacity>
          )}

          {this.showBackgroundImagePicker && (
            <TouchableOpacity
              style={styles.hamburgerMenuTouchZone}
              onPress={() => {
                this.closeBackgroundImagePicker();
              }}>
              <AntDesign style={styles.exitMenuIcon} size={40} name="close" color="#3f3f41" />
            </TouchableOpacity>
          )}

        </LinearGradient>
        {this.state.showBackgroundImagePicker && (
          <ScrollView style={styles.backgroundImagePicker}>
            <View style={styles.backgroundImagePickerRow}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.selectBackground('bali');
                  }}>
                  <Image
                    style={styles.backgroundImage}
                    source={require('../../../../assets/images/moodtrackingapp/bali.jpg')} />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.selectBackground('pinkishBeach');
                  }}>
                <Image style={styles.backgroundImage}
                       source={require('../../../../assets/images/moodtrackingapp/pinkishBeach.jpg')} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.backgroundImagePickerRow}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.selectBackground('water');
                  }}>
                <Image style={styles.backgroundImage}
                       source={require('../../../../assets/images/moodtrackingapp/water.jpg')} />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.selectBackground('ocean');
                  }}>
                <Image style={styles.backgroundImage}
                       source={require('../../../../assets/images/moodtrackingapp/ocean.jpg')} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
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
    width: 35,
  },
  statisticsTopMenuText: {
    fontSize: 18,
    color: Color.white,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburgerMenuTouchZone: {
    right: 10,
    position: 'absolute',
    zIndex: 2,
  },
  hamburgerMenu: {
    position: 'relative',
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
  exitMenuIcon: {
    top: 9,
    right: 2,
    color: Color.white,
  },
  backgroundImagePicker: {
    backgroundColor: Color.white,
    width: '100%',
    height: '100%',
    top: 60,
    zIndex: 99,
    position: 'relative',
  },
  backgroundImagePickerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  backgroundImage: {
    width: 145,
    height: 190,
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 12,
    marginRight: 12,
    padding: 10,
  },

});