import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
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

export class MoodOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 4,
      selectedMood: 'No mood selected',
      showConfirmationBubble: false,
      showFeedbackBubble: false,
      emojiFontSize: 55,
      selectedEmojiFontSize: 70,
      isSelected: false,
      showMustSelectMoodText: false,
    };
    this.setSliderValue = this.setSliderValue.bind(this);
    this.setSelectedMood = this.setSelectedMood.bind(this);

    Emitter.off('moodTrackingFinished');
    if (!Emitter.listenersNumber('moodTrackingFinished')) {
      Emitter.on('moodTrackingFinished', () => {
        this.setState({
          showConfirmationBubble: false,
          showFeedbackBubble: true,
        });
        feedbackTimeout = setTimeout(() => {
          Emitter.emit('closeFeedbackBubble');
          clearInterval(feedbackTimeout);
        }, 3000);
      });
    }

    Emitter.off('closeFeedbackBubble');
    if (!Emitter.listenersNumber('closeFeedbackBubble')) {
      Emitter.on('closeFeedbackBubble', () => {
        this.setState({
          showFeedbackBubble: false,
        });
        clearTimeout(feedbackTimeout);
        Emitter.emit('closeMoodOverview');
      });
    }

    Emitter.off('closeConfirmationBubble');
    if (!Emitter.listenersNumber('closeConfirmationBubble')) {
      Emitter.on('closeConfirmationBubble', () => {
        this.setShowConfirmationBubble(false);
      });
    }

    Emotions.map((emoji) => {
      emoji.size = 55;
    });
  }

  setShowConfirmationBubble(boolean) {
    if (this.state.selectedMood !== 'No mood selected') {
      this.setState({
        showConfirmationBubble: boolean,
      });
    } else {
      this.setState({
        showMustSelectMoodText: true,
      });
      const thisInState = this;
      const timeout = setTimeout(() => {
        thisInState.setState({
          showMustSelectMoodText: false,
        });
        clearInterval(timeout);
      }, 4000);
    }
  }

  setSliderValue(number) {
    this.setState({
      sliderValue: number,
    });
  }

  setSelectedMood(moodDescription, id) {
    this.setState({
      selectedMood: moodDescription,
      showMustSelectMoodText: false,
    });
    Emotions.map((emoji) => {
      emoji.id === id ? (emoji.size = 70) : (emoji.size = 55);
    });
  }

  render() {
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
                              this.setSelectedMood(val.description, val.id);
                            }}>
                            <FontAwesome5
                              solid
                              size={val.size}
                              name={val.icon}
                              color={val.color}
                              ref={val.id}
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
            {this.state.showMustSelectMoodText && (
              <SelectMoodInfo
                showMustSelectMoodText={this.state.showMustSelectMoodText}
              />
            )}
            <Text style={styles.noMoodSelectedText}>
              {this.state.selectedMood}
            </Text>
            <Text style={styles.sliderValueText}>{this.state.sliderValue}</Text>

            <Slider
              style={{ width: 100, height: 30, borderRadius: 50, top: 10 }}
              minimumValue={0}
              maximumValue={7}
              value={this.state.sliderValue}
              step={1}
              maximumTrackTintColor={Color.white}
              minimumTrackTintColor="#514A9D"
              thumbTintColor="#514A9D"
              onValueChange={(value) => {
                this.setSliderValue(value);
              }}
            />
            <View style={styles.trackingButton}>
              <Button
                title="track"
                color={Color.secondary}
                onPress={() => {
                  this.setShowConfirmationBubble(true);
                }}
              />
            </View>
          </View>
        </View>
        {this.state.showConfirmationBubble && (
          <ConfirmationBubble
            setShowConfirmationBubble={this.setShowConfirmationBubble}
            emojiDescription={this.state.selectedMood}
            sliderValue={this.state.sliderValue}
            onSubmit={this.props.onSubmit}
          />
        )}
        {this.state.showFeedbackBubble && <FeedbackBubble />}
      </View>
    );
  }
}

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
