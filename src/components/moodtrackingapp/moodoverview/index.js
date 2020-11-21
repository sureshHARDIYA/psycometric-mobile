import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Platform, TextInput } from 'react-native';
import Slider from 'react-native-slider';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { Color } from '../../../constants';
import { ConfirmationBubble } from '../../../containers/MoodTracking';
import Emitter from '../../../utils/eventEmitter';
import { FeedbackBubble } from '../feedbackBubble';
import { SelectMoodInfo } from '../selectMoodInfo';

const Emotions = [
  {
    id: 'tenseNervousEmoji',
    description: 'Tense/Nervous',
    color: '#3CBB75',
    icon: 'frown-open',
    emojiStyling: {
      fontSize: 55,
      opacity: 1.0,
    },
    listElementStyle: {
      transform: [{ skewY: '0deg' }, { rotate: '135deg' }],
      left: 0,
      top: -10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      fontSize: 55,
      transform: [{ skewY: '0deg' }, { rotate: '-105deg' }],
      width: 74,
      height: 74,
      borderRadius: 74 / 2,
      borderColor: Color.white,
      backgroundColor: Color.white,
      borderWidth: 3,
      alignItems: 'center',
      ...Platform.select({
        android: {
          justifyContent: 'center',
        },
      }),
    },
  },
  {
    id: 'irritatedAnnoyedEmoji',
    description: 'Irritated/Annoyed',
    color: '#DE6465',
    icon: 'angry',
    emojiStyling: {
      fontSize: 55,
      opacity: 1.0,
    },
    listElementStyle: {
      transform: [{ skewY: '0deg' }, { rotate: '90deg' }],
      left: 0,
      top: -10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{ skewY: '0deg' }, { rotate: '-60deg' }],
      width: 74,
      height: 74,
      borderRadius: 74 / 2,
      borderColor: Color.white,
      borderWidth: 3,
      backgroundColor: Color.white,
      alignItems: 'center',
      ...Platform.select({
        android: {
          justifyContent: 'center',
        },
      }),
    },
  },
  {
    id: 'excitedLivelyEmoji',
    description: 'Excited/Lively',
    color: '#EB7955',
    icon: 'grin-stars',
    emojiStyling: {
      fontSize: 55,
      opacity: 1.0,
    },
    listElementStyle: {
      transform: [{ skewY: '0deg' }, { rotate: '180deg' }],
      left: 0,
      top: -10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{ skewY: '0deg' }, { rotate: '-150deg' }],
      width: 74,
      height: 74,
      borderRadius: 74 / 2,
      borderColor: Color.white,
      borderWidth: 3,
      backgroundColor: Color.white,
      alignItems: 'center',
      ...Platform.select({
        android: {
          justifyContent: 'center',
        },
      }),
    },
  },
  {
    id: 'cheerfulHappyEmoji',
    description: 'Cheerful/Happy',
    color: '#F7CB50',
    icon: 'laugh-beam',
    emojiStyling: {
      fontSize: 55,
      opacity: 1.0,
    },
    listElementStyle: {
      transform: [{ skewY: '0deg' }, { rotate: '225deg' }],
      left: 0,
      top: -10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{ skewY: '0deg' }, { rotate: '-195deg' }],
      width: 74,
      height: 74,
      borderRadius: 74 / 2,
      borderColor: Color.white,
      borderWidth: 3,
      backgroundColor: Color.white,
      alignItems: 'center',
      ...Platform.select({
        android: {
          justifyContent: 'center',
        },
      }),
    },
  },
  {
    id: 'boredWearyEmoji',
    description: 'Bored/Weary',
    color: '#8B42CC',
    icon: 'meh',
    emojiStyling: {
      fontSize: 55,
      opacity: 1.0,
    },
    listElementStyle: {
      transform: [{ skewY: '0deg' }, { rotate: '45deg' }],
      left: 0,
      top: -10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{ skewY: '0deg' }, { rotate: '-15deg' }],
      width: 74,
      height: 74,
      borderRadius: 74 / 2,
      borderColor: Color.white,
      borderWidth: 3,
      backgroundColor: Color.white,
      alignItems: 'center',
      ...Platform.select({
        android: {
          justifyContent: 'center',
        },
      }),
    },
  },
  {
    id: 'gloomySadEmoji',
    description: 'Gloomy/Sad',
    color: '#3D3D3D',
    icon: 'frown',
    emojiStyling: {
      fontSize: 55,
      opacity: 1.0,
    },
    listElementStyle: {
      transform: [{ skewY: '0deg' }, { rotate: '0deg' }],
      left: 0,
      top: -10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{ skewY: '0deg' }, { rotate: '30deg' }],
      width: 74,
      height: 74,
      borderRadius: 74 / 2,
      borderColor: Color.white,
      borderWidth: 3,
      backgroundColor: Color.white,
      alignItems: 'center',
      ...Platform.select({
        android: {
          justifyContent: 'center',
        },
      }),
    },
  },
  {
    id: 'relaxedCalmEmoji',
    description: 'Relaxed/Calm',
    color: '#425CCC',
    icon: 'smile-beam',
    emojiStyling: {
      fontSize: 55,
      opacity: 1.0,
    },
    listElementStyle: {
      transform: [{ skewY: '0deg' }, { rotate: '270deg' }],
      left: 0,
      top: -10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{ skewY: '0deg' }, { rotate: '120deg' }],
      width: 74,
      height: 74,
      borderRadius: 74 / 2,
      borderColor: Color.white,
      borderWidth: 3,
      backgroundColor: Color.white,
      alignItems: 'center',
      ...Platform.select({
        android: {
          justifyContent: 'center',
        },
      }),
    },
  },
  {
    id: 'emptyIcon',
    description: 'Empty/Icon',
    listElementStyle: {
      transform: [{ skewY: '0deg' }, { rotate: '315deg' }],
      left: 0,
      top: -10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{ skewY: '0deg' }, { rotate: '45deg' }],
      width: 74,
      height: 74,
      borderRadius: 74 / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
];

let feedbackTimeout = null;

const Degrees = ['A little', 'Somewhat', 'Very'];

export const MoodOverview = (props) => {
  const [sliderValue, setSliderValue] = useState(1);
  const [selectedDegreeText, setSelectedDegreeText] = useState(Degrees[0]);
  const [selectedMood, setSelectedMood] = useState('No mood selected');
  const [showConfirmationBubble, setShowConfirmationBubble] = useState(false);
  const [showFeedbackBubble, setShowFeedbackBubble] = useState(false);
  const [showMustSelectMoodText, setShowMustSelectMoodText] = useState(false);

  const [leftArrowDisabled, setLeftArrowDisabled] = useState(false);
  const [rightArrowDisabled, setRightArrowDisabled] = useState(false);
  const [leftArrowColor, setLeftArrowColor] = useState(Color.white);
  const [rightArrowColor, setRightArrowColor] = useState(Color.white);

  /*  const [textInputValue, onChangeText] = useState('A little');*/


  Emitter.off('moodTrackingFinished');
  Emitter.on('moodTrackingFinished', () => {
    setShowConfirmationBubble(false);
    setShowFeedbackBubble(true);
    feedbackTimeout = setTimeout(() => {
      Emitter.emit('closeFeedbackBubble');
      clearInterval(feedbackTimeout);
    }, 3000);
  });

  Emitter.off('closeFeedbackBubble');
  Emitter.on('closeFeedbackBubble', () => {
    setShowFeedbackBubble(false);
    clearTimeout(feedbackTimeout);
    Emitter.emit('closeMoodOverview');
  });

  Emitter.off('closeConfirmationBubble');
  Emitter.on('closeConfirmationBubble', () => {
    setShowConfirmationBubble(false);
  });

  Emotions.map((emoji) => {
    emoji.size = 55;
  });

  const confirmationBubble = (boolean) => {
    if (selectedMood !== 'No mood selected') {
      setShowConfirmationBubble(boolean);
    } else {
      setShowMustSelectMoodText(true);

      const timeout = setTimeout(() => {
        setShowMustSelectMoodText(false);
        clearInterval(timeout);
      }, 4000);
    }
  };

  useEffect(() => {
    return () => {
      Emotions.map((value, index, arr) => {
        if (Emotions[index].emojiStyling) {
          Emotions[index].emojiStyling = { opacity: 1.0, fontSize: 55 };
        }
      });
    };
  }, []);

  useEffect(() => {
    if(Platform.OS === 'android'){
      switch (selectedDegreeText) {
        case 'A little':
          setLeftArrowColor(Color.gray);
          setLeftArrowDisabled(true);
          setRightArrowColor(Color.white);

          break;
        case 'Somewhat':
          setLeftArrowColor(Color.white);
          setRightArrowColor(Color.white);
          setLeftArrowDisabled(false);
          setRightArrowDisabled(false);
          break;
        case 'Very':
          setLeftArrowColor(Color.white);
          setRightArrowColor(Color.gray);
          setRightArrowDisabled(true);
          break;
      }
    }
  }, [selectedDegreeText]);

  const selectMood = (moodDescription, selectedIndex) => {
    Emotions.map((value, index, arr) => {
      if (Emotions[index].emojiStyling) {
        if (index === selectedIndex) {
          Emotions[index].emojiStyling = { opacity: 1.0, fontSize: 70 };
        } else {
          Emotions[index].emojiStyling = { opacity: 0.6, fontSize: 55 };
        }
      }
    });
    setSelectedMood(moodDescription);
    setShowMustSelectMoodText(false);
  };

  const findDegreeText = () => {
    let sliderDegreeText;
    switch (sliderValue) {
      case 1:
        sliderDegreeText = 'A little';
        break;
      case 2:
        sliderDegreeText = 'Somewhat';
        break;
      case 3:
        sliderDegreeText = 'Very';
        break;
    }
    return sliderDegreeText;
  };



  return (
    <View style={styles.container} backgroundColor={Color.transparent}>
      <View style={styles.selectEmotionOverview}>
        <LinearGradient
          colors={['#24c6dc', '#514A9D']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradient}>
        </LinearGradient>
        <View style={styles.emotionList}>

          {Emotions.map((val, index, arr) => {
            if (val.id === 'emptyIcon') {
              return (
                <View style={styles.circlePart} key={val.id}>
                  <View style={val.listElementStyle}>
                    <View style={val.iconStyle} />
                  </View>
                </View>
              );
            } else {
              return (
                <View style={styles.circlePart} key={val.id}>
                  <View style={val.listElementStyle}>
                    <View style={val.iconStyle}>
                      <TouchableOpacity
                        style={{
                          height: 74,
                          width: 74,
                          borderRadius: 37,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          selectMood(val.description, index);
                        }}>
                        <FontAwesome5
                          solid
                          name={val.icon}
                          color={val.color}
                          style={val.emojiStyling}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }
          })}
        </View>


        <View style={styles.currentTrackingInfo}>
          {showMustSelectMoodText && (
            <SelectMoodInfo showMustSelectMoodText={showMustSelectMoodText} />
          )}
          <Text style={styles.iFeelText}>I feel...</Text>

          {Platform.OS === 'ios' && (
            <>
              <Text style={styles.sliderValueText}>{findDegreeText()}</Text>
              <Slider
                tapToSeek
                style={{ width: 120, height: 30, borderRadius: 50, top: -10 }}
                minimumValue={1}
                maximumValue={3}
                value={sliderValue}
                step={1}
                maximumTrackTintColor={Color.white}
                minimumTrackTintColor="#514A9D"
                thumbTintColor="#514A9D"
                onValueChange={(value) => {
                  setSliderValue(value);
                }}
              />
            </>
          )}

          {Platform.OS === 'android' && (
            <View style={{ flexDirection: 'row', alignItems: 'center', top: -10 }}>
              <TouchableOpacity
                disabled={leftArrowDisabled}
                onPress={() => {
                  if (selectedDegreeText === 'A little') {
                    /*              setLeftArrowDisabled(true);*/
                    /*        setOpacityLeftArrow(0);*/
                  }
                  if (selectedDegreeText === 'Somewhat') {
                    setSelectedDegreeText('A little');
                    /*               setLeftArrowDisabled(false);*/
                    /*         setOpacityLeftArrow(100);*/
                  }
                  if (selectedDegreeText === 'Very') {
                    setSelectedDegreeText('Somewhat');
                    /*     setLeftArrowDisabled(false);*/
                    /*          setOpacityLeftArrow(100);*/
                  }

                }}>
                <FontAwesome5
                  solid
                  name={'angle-left'}
                  color={leftArrowColor}
                  style={styles.degreeArrows}
                />
              </TouchableOpacity>
              <TextInput
                style={{
                  width: 90,
                  height: 30,
                  borderColor: '#3c1053',
                  padding: 5,
                  textAlign: 'center',
                  borderWidth: 1,
                  color: Color.white,
                }}
                value={selectedDegreeText}
              />
              <TouchableOpacity
                disabled={rightArrowDisabled}
                onPress={() => {
                  if (selectedDegreeText === 'A little') {
                    setSelectedDegreeText('Somewhat');
                    /*     setOpacityRightArrow(100);*/
                  }
                  if (selectedDegreeText === 'Somewhat') {
                    setSelectedDegreeText('Very');
                    /*    setOpacityRightArrow(100);*/
                  }
                  if (selectedDegreeText === 'A Very') {
                    setRightArrowDisabled(true);
                    setRightArrowColor(Color.gray);
                    /*       setOpacityRightArrow(0);*/
                  }
                }}>
                <FontAwesome5
                  solid
                  name={'angle-right'}
                  color={rightArrowColor}
                  style={styles.degreeArrows}
                />
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.noMoodSelectedText}>{selectedMood}</Text>
          <View style={styles.trackingButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                if(Platform.OS === 'ios'){
                  setSelectedDegreeText(findDegreeText);
                }
                confirmationBubble(true);

              }}>
              <View style={styles.trackingButton}>
                <Text>TRACK</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showConfirmationBubble && (
        <ConfirmationBubble
          setShowConfirmationBubble={confirmationBubble}
          emojiDescription={selectedMood}
          selectedDegreeText={selectedDegreeText}
          onSubmit={props.onSubmit}
        />
      )}
      {showFeedbackBubble && <FeedbackBubble />}
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
    position: 'absolute',
    borderRadius: 280 / 2,
    bottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    transform: [{ skewY: '0deg' }, { rotate: '255deg' }],
  },
  gradient: {
    width: 280,
    height: 280,
    borderRadius: 280 / 2,
    borderColor: '#3c1053',
    borderWidth: 4,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emotionList: {
    width: 270,
    // height: 270,
    position: 'relative',
    borderRadius: 280 / 2,
    justifyContent: 'center',
  },
  circlePart: {
    transform: [{ skewY: '0deg' }, { rotate: '75deg' }],
    position: 'absolute',
    left: -150,
    top: 160,
    width: '240%',
    height: '200%',
  },
  currentTrackingInfo: {
    position: 'absolute',
    width: 180,
    height: 180,
    transform: [{ skewY: '0deg' }, { rotate: '105deg' }],
    alignItems: 'center',
  },
  iFeelText: {
    textAlign: 'center',
    color: Color.white,
    padding: 15,
    fontSize: 18,
    top: -8,
  },
  noMoodSelectedText: {
    textAlign: 'center',
    color: Color.white,
    padding: 7,
    fontSize: 16,
    top: -15,
    height: 35,
  },
  sliderValueText: {
    textAlign: 'center',
    fontSize: 16,
    color: Color.white,
    fontWeight: '600',
    width: 100,
    height: 20,
    top: -15,
  },
  degreeArrows: {
    fontSize: 30,
    padding: 8,
  },
  trackingButtonContainer: {
    top: -5,
  },
  trackingButton: {
    width: 90,
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: Color.white,
    borderRadius: 20,
    textAlign: 'center',
    alignItems: 'center',
  },
});