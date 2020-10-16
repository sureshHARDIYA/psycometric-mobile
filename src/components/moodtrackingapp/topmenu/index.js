import { AntDesign, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native';

import { Color } from '../../../constants';

export const TopMenu = (props) => {
  const [showBackgroundImagePicker, setShowBackgroundImagePicker] = useState(false);

  const selectBackground = (selectedBackground) => {
    props.setBackgroundImage(selectedBackground);
    setShowBackgroundImagePicker(false);
  };

  const openBackgroundImagePicker = () => {
    setShowBackgroundImagePicker(true);
  };

  const closeBackgroundImagePicker = () => {
    setShowBackgroundImagePicker(false);
  };

  return (
    <View>
      <LinearGradient
        colors={['#24c6dc', '#514A9D']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          left: 0,
          right: 0,
          top: 0,
          height: 60,
          flexDirection: 'row',
        }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.goBack}
            onPress={() => props.navigation.goBack()}>
            <Ionicons
              size={30}
              name="ios-arrow-dropleft"
              color={Color.white}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {!showBackgroundImagePicker && (
          <TouchableOpacity
            style={styles.hamburgerMenuTouchZone}
            onPress={() => {
              openBackgroundImagePicker();
            }}>
            <View style={styles.hamburgerMenu}>
              <View style={styles.bar1} />
              <View style={styles.bar2} />
              <View style={styles.bar3} />
            </View>
          </TouchableOpacity>
        )}

        {showBackgroundImagePicker && (
          <TouchableOpacity
            style={styles.hamburgerMenuTouchZone}
            onPress={() => {
              closeBackgroundImagePicker();
            }}>
            <AntDesign
              style={styles.exitMenuIcon}
              size={40}
              name="close"
              color="#3f3f41"
            />
          </TouchableOpacity>
        )}

      </LinearGradient>
      {showBackgroundImagePicker && (
        <ScrollView style={styles.backgroundImagePicker}>
          <View style={styles.backgroundImagePickerRow}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  selectBackground('bali');
                }}>
                <Image
                  style={styles.backgroundImage}
                  source={require('../../../../assets/images/moodtrackingapp/bali.jpg')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  selectBackground('pinkishBeach');
                }}>
                <Image
                  style={styles.backgroundImage}
                  source={require('../../../../assets/images/moodtrackingapp/pinkishBeach.jpg')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.backgroundImagePickerRow}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  selectBackground('water');
                }}>
                <Image
                  style={styles.backgroundImage}
                  source={require('../../../../assets/images/moodtrackingapp/water.jpg')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  selectBackground('ocean');
                }}>
                <Image
                  style={styles.backgroundImage}
                  source={require('../../../../assets/images/moodtrackingapp/ocean.jpg')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    shadowOpacity: 0.0,
    shadowColor: 'transparent',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 10,
  },
  goBack: {
    zIndex: 2,
    marginLeft: 10,
    width: 35,
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
