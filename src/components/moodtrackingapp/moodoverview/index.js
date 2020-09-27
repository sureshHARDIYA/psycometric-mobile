import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button, Slider } from 'react-native';
/*import Slider from '@react-native-community/slider';*/
import { Color } from '../../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { Routes } from '../../../navigation';


const Emotions = [
  {
    id: 'tenseNervousEmoji',
    description: 'Tense/Nervous',
    color: '#3CBB75',
    icon: 'frown-open',
    listElementStyle: {
      transform: [{rotate: '135deg'}, {skewY: '0deg'}],
      position: 'absolute',
      left: 0,
      top:-10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{rotate: '-45deg'}, {skewY: '0deg'}],
      position: 'absolute',
      width: 74,
      height: 74,
      borderRadius: 74/2,
      borderColor: Color.white,
      borderWidth: 3,
      backgroundColor: Color.white,
      justifyContent: 'center',
      alignItems: 'center',
    }
  },
  {
    id: 'irritatedAnnoyedEmoji',
    description: 'Irritated/Annoyed',
    color: '#DE6465',
    icon: 'angry',
    listElementStyle: {
      transform: [{rotate: '90deg'}, {skewY: '0deg'}],
      position: 'absolute',
      left: 0,
      top:-10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{rotate: '0deg'}, {skewY: '0deg'}],
      position: 'absolute',
      width: 74,
      height: 74,
      borderRadius: 74/2,
      borderColor: Color.white,
      borderWidth: 3,
      backgroundColor: Color.white,
       justifyContent: 'center',
      alignItems: 'center',
    }
  },
  {
    id: 'excitedLivelyEmoji',
    description: 'Excited/Lively',
    color: '#EB7955',
    icon: 'grin-stars',
    listElementStyle: {
      transform: [{rotate: '180deg'}, {skewY: '0deg'}],
      position: 'absolute',
      left: 0,
      top:-10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{ rotate: '-90deg' }, {skewY: '0deg'}],
      position: 'absolute',
      width: 74,
      height: 74,
      borderRadius: 74/2,
      borderColor: Color.white,
      borderWidth: 3,
      backgroundColor: Color.white,
       justifyContent: 'center',
      alignItems: 'center',
    }

  },
  {
    id: 'cheerfulHappyEmoji',
    description: 'Cheerful/Happy',
    color: '#F7CB50',
    icon: 'laugh-beam',
    listElementStyle: {
      transform: [{rotate: '225deg'}, {skewY: '0deg'}],
      position: 'absolute',
      left: 0,
      top:-10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{ rotate: '-135deg' }, {skewY: '0deg'}],
      position: 'absolute',
      width: 74,
      height: 74,
      borderRadius: 74/2,
      borderColor: Color.white,
      borderWidth: 3,
      backgroundColor: Color.white,
       justifyContent: 'center',
      alignItems: 'center',
    }
  },
  {
    id: 'boredWearyEmoji',
    description: 'Bored/Weary',
    color: '#8B42CC',
    icon: 'meh',
    listElementStyle: {
      transform: [{rotate: '45deg'}, {skewY: '0deg'}],
      position: 'absolute',
      left: 0,
      top:-10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{rotate: '45deg'}, {skewY: '0deg'}],
      position: 'absolute',
      width: 74,
      height: 74,
      borderRadius: 74/2,
      borderColor: Color.white,
      borderWidth: 3,
      backgroundColor: Color.white,
       justifyContent: 'center',
      alignItems: 'center',
    }
  },
  {
    id: 'gloomySadEmoji',
    description: 'Gloomy/Sad',
    color: '#3D3D3D',
    icon: 'frown',
    listElementStyle: {
      transform: [{rotate: '0deg'}, {skewY: '0deg'}],
      position: 'absolute',
      left: 0,
      top:-10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{rotate: '90deg'}, {skewY: '0deg'}],
      position: 'absolute',
      width: 74,
      height: 74,
      borderRadius: 74/2,
      borderColor: Color.white,
      borderWidth: 3,
      backgroundColor: Color.white,
       justifyContent: 'center',
      alignItems: 'center',
    }
  },
  {
    id: 'relaxedCalmEmoji',
    description: 'Relaxed/Calm',
    color: '#425CCC',
    icon: 'smile-beam',
    listElementStyle: {
      transform: [{rotate: '270deg'}, {skewY: '0deg'}],
      position: 'absolute',
      left: 0,
      top:-10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{rotate: '180deg'}, {skewY: '0deg'}],
      position: 'absolute',
      width: 74,
      height: 74,
      borderRadius: 74/2,
      borderColor: Color.white,
      borderWidth: 3,
      backgroundColor: Color.white,
      justifyContent: 'center',
      alignItems: 'center',
    }
  },
  {
    id: '',
    color: '',
    icon: '',
    listElementStyle: {
      transform: [{rotate: '315deg'}, {skewY: '0deg'}],
      position: 'absolute',
      left: 0,
      top:-10,
      width: '50%',
      height: '50%',

    },
    iconStyle: {
      transform: [{rotate: '45deg'}, {skewY: '0deg'}],
      position: 'absolute',
      width: 66,
      height: 66,
      top:-10,
       justifyContent: 'center',
    }
  },



];

export const MoodOverview = ({ navigation }) => {
  const [sliderValue, setSliderValue] = useState(4);
  const [selectedMood, setSelectedMood] = useState('No mood selected');
  return (
    <View style={styles.container} backgroundColor={ Color.transparent }>
      {console.log('Selcted Mood: ', selectedMood)}
      <View style={styles.selectEmotionOverview}>
        <LinearGradient colors={['#24c6dc', '#514A9D']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.gradient}>
          <View style={styles.emotionList}>
          {
            Emotions.map((val, index, arr) => {
              return (
                <View style={styles.circlePart}>
                  <View style={val.listElementStyle}>
                    <TouchableOpacity
                      onPress={() =>
                        setSelectedMood(val.description)
                      }>
                    <View  style={val.iconStyle}>
                      <FontAwesome5  size={55}
                                     name={val.icon}
                                     solid
                                     color={val.color} />
                    </View>
                    </TouchableOpacity>
                </View>
                </View>
              )
            })
          }
          </View>
        </LinearGradient>
        <View style={styles.currentTrackingInfo}>
          <Text style={styles.noMoodSelectedText}>{selectedMood}</Text>
          <Text>{ sliderValue }</Text>
          <Slider
            style={{width: 100, height: 30, borderRadius: 50, top: 10}}
            minimumValue={0}
            maximumValue={7}
            value={sliderValue}
            onValueChange={(value)=> setSliderValue(value) }
            maximumTrackTintColor= {Color.white}
            minimumTrackTintColor={'#514A9D'}
            thumbTintColor={'#514A9D'}
          />
          <View style={styles.trackingButton}>
            <Button title={'track'} color={Color.secondary}/>
          </View>

        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    width: '100%',
    alignItems: 'center',
  },
  selectEmotionOverview: {
    width: 280,
    height: 280,
    borderRadius: 280 / 2,
    position: 'absolute',
    bottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '255deg' }, { skewY: '0deg' }],
  },
  gradient: {
    width: 280,
    height: 280,
    borderRadius: 280/2,
    borderColor: '#3c1053',
    borderWidth: 4,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',

  },
  emotionList:{
    width: 270,
    height: 270,
/*    transform: [{ skewY: '0deg' },{ rotate: '90deg' }],*/
/*    backgroundColor: Color.primary,*/
    borderRadius: 280/2,
    justifyContent: 'center',
    position: 'absolute',
/*    backgroundColor: Color.error,*/
  },
  circlePart:{
    transform: [{ skewY: '0deg' },{ rotate: '15deg' }],
    position: 'absolute',
    left: -30,
    top: 46,
    width: '190%',
    height: '190%',
  },
  currentTrackingInfo:{
    position: 'absolute',
    width: 180,
    height: 180,
    transform: [{ skewY: '0deg' },{ rotate: '105deg' }],
    alignItems: 'center',
  },
  noMoodSelectedText:{
    textAlign: 'center',
    color: Color.white,
    padding: 20,
    fontSize: 16,
    top: 10,

  },
  trackingButton:{
    width: 100,
    height: 20,
    top: 20,
  }
});
