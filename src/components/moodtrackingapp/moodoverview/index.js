import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, forwardRef } from 'react';
import { StyleSheet, View, Text, Button, Slider, Alert } from 'react-native';
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
    size: 55,
    listElementStyle: {
      transform: [{ rotate: '135deg' }, { skewY: '0deg' }],
      left: 0,
      top: -10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      fontSize: 55,
      transform: [{ rotate: '-45deg' }, { skewY: '0deg' }],
      zIndex: 1,
      width: 74,
      height: 74,
      borderRadius: 74 / 2,
      borderColor: Color.white,
      borderWidth: 3,
      backgroundColor: Color.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  {
    id: 'irritatedAnnoyedEmoji',
    description: 'Irritated/Annoyed',
    color: '#DE6465',
    icon: 'angry',
    size: 55,
    listElementStyle: {
      transform: [{ rotate: '90deg' }, { skewY: '0deg' }],
      left: 0,
      top: -10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{ rotate: '0deg' }, { skewY: '0deg' }],
      zIndex: 1,
      width: 74,
      height: 74,
      borderRadius: 74 / 2,
      borderColor: Color.white,
      borderWidth: 3,
      backgroundColor: Color.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  {
    id: 'excitedLivelyEmoji',
    description: 'Excited/Lively',
    color: '#EB7955',
    icon: 'grin-stars',
    size: 55,
    listElementStyle: {
      transform: [{ rotate: '180deg' }, { skewY: '0deg' }],
      left: 0,
      top: -10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{ rotate: '-90deg' }, { skewY: '0deg' }],
      zIndex: 1,
      width: 74,
      height: 74,
      borderRadius: 74 / 2,
      borderColor: Color.white,
      borderWidth: 3,
      backgroundColor: Color.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  {
    id: 'cheerfulHappyEmoji',
    description: 'Cheerful/Happy',
    color: '#F7CB50',
    icon: 'laugh-beam',
    size: 55,
    listElementStyle: {
      transform: [{ rotate: '225deg' }, { skewY: '0deg' }],
      left: 0,
      top: -10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{ rotate: '-135deg' }, { skewY: '0deg' }],
      zIndex: 1,
      width: 74,
      height: 74,
      borderRadius: 74 / 2,
      borderColor: Color.white,
      borderWidth: 3,
      backgroundColor: Color.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  {
    id: 'boredWearyEmoji',
    description: 'Bored/Weary',
    color: '#8B42CC',
    icon: 'meh',
    size: 55,
    listElementStyle: {
      transform: [{ rotate: '45deg' }, { skewY: '0deg' }],
      left: 0,
      top: -10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{ rotate: '45deg' }, { skewY: '0deg' }],
      zIndex: 1,
      width: 74,
      height: 74,
      borderRadius: 74 / 2,
      borderColor: Color.white,
      borderWidth: 3,
      backgroundColor: Color.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  {
    id: 'gloomySadEmoji',
    description: 'Gloomy/Sad',
    color: '#3D3D3D',
    icon: 'frown',
    size: 55,
    listElementStyle: {
      transform: [{ rotate: '0deg' }, { skewY: '0deg' }],
      left: 0,
      top: -10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{ rotate: '90deg' }, { skewY: '0deg' }],
      zIndex: 1,
      width: 74,
      height: 74,
      borderRadius: 74 / 2,
      borderColor: Color.white,
      borderWidth: 3,
      backgroundColor: Color.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  {
    id: 'relaxedCalmEmoji',
    description: 'Relaxed/Calm',
    color: '#425CCC',
    icon: 'smile-beam',
    size: 55,
    listElementStyle: {
      transform: [{ rotate: '270deg' }, { skewY: '0deg' }],
      left: 0,
      top: -10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{ rotate: '180deg' }, { skewY: '0deg' }],
      zIndex: 1,
      width: 74,
      height: 74,
      borderRadius: 74 / 2,
      borderColor: Color.white,
      borderWidth: 3,
      backgroundColor: Color.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  {
    id: 'emptyIcon',
    description: 'Empty/Icon',
    listElementStyle: {
      transform: [{ rotate: '315deg' }, { skewY: '0deg' }],
      left: 0,
      top: -10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
      transform: [{ rotate: '45deg' }, { skewY: '0deg' }],
      zIndex: 1,
      width: 74,
      height: 74,
      borderRadius: 74 / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
];

let feedbackTimeout = null;

export const MoodOverview = (props) => {
  const [sliderValue, setSliderValue] = useState(4);
  const [selectedMood, setSelectedMood] = useState('No mood selected');
  const [showConfirmationBubble, setShowConfirmationBubble] = useState(false);
  const [showFeedbackBubble, setShowFeedbackBubble] = useState(false);
  const [emojiFontSize, setEmojiFontSize] = useState(55);
  const [selectedEmojiFontSize, setSelectedEmojiFontSize] = useState(70);
  const [isSelected, setIsSelected] = useState(false);
  const [showMustSelectMoodText, setShowMustSelectMoodText] = useState(false);

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

  const selectMood = (moodDescription, id) => {
    setSelectedMood(moodDescription);
    setShowMustSelectMoodText(false);

    Emotions.map((emoji) => {
      emoji.id === id ? (emoji.size = 70) : (emoji.size = 55);
    });
  };

  return (
    <View style={styles.container} backgroundColor={Color.transparent}>
      <View style={styles.selectEmotionOverview}>
        <LinearGradient
          colors={['#24c6dc', '#514A9D']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradient}>
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
                          onPress={() => {
                            selectMood(val.description, val.id);
                          }}>
                          <FontAwesome5
                            solid
                            size={val.size}
                            name={val.icon}
                            color={val.color}
                            id={val.id}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              }
            })}
          </View>
        </LinearGradient>
        <View style={styles.currentTrackingInfo}>
          {showMustSelectMoodText && (
            <SelectMoodInfo
              showMustSelectMoodText={showMustSelectMoodText}
            />
          )}
          <Text style={styles.noMoodSelectedText}>
            {selectedMood}
          </Text>
          <Text style={styles.sliderValueText}>{sliderValue}</Text>

          <Slider
            style={{ width: 100, height: 30, borderRadius: 50, top: 10 }}
            minimumValue={0}
            maximumValue={7}
            value={sliderValue}
            step={1}
            maximumTrackTintColor={Color.white}
            minimumTrackTintColor="#514A9D"
            thumbTintColor="#514A9D"
            onValueChange={(value) => {
              setSliderValue(value);
            }}
          />
          <View style={styles.trackingButton}>
            <Button
              title="track"
              color={Color.secondary}
              onPress={() => {
                confirmationBubble(true);
              }}
            />
          </View>
        </View>
      </View>
      {showConfirmationBubble && (
        <ConfirmationBubble
          setShowConfirmationBubble={confirmationBubble}
          emojiDescription={selectedMood}
          sliderValue={sliderValue}
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
    borderRadius: 280 / 2,
    bottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '255deg' }, { skewY: '0deg' }],
  },
  gradient: {
    width: 280,
    height: 280,
    borderRadius: 280 / 2,
    borderColor: '#3c1053',
    borderWidth: 4,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emotionList: {
    width: 270,
    height: 270,
    borderRadius: 280 / 2,
    justifyContent: 'center',
  },
  circlePart: {
    transform: [{ skewY: '0deg' }, { rotate: '15deg' }],
    position: 'absolute',
    left: -30,
    top: 46,
    width: '190%',
    height: '190%',
  },
  currentTrackingInfo: {
    position: 'absolute',
    width: 180,
    height: 180,
    transform: [{ skewY: '0deg' }, { rotate: '105deg' }],
    alignItems: 'center',
  },
  noMoodSelectedText: {
    textAlign: 'center',
    color: Color.white,
    padding: 20,
    fontSize: 16,
    top: 10,
  },
  sliderValueText: {
    textAlign: 'center',
    width: 20,
    height: 20,
  },
  trackingButton: {
    width: 100,
    height: 20,
    top: 20,
  },
});
