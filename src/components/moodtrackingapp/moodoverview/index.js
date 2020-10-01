import React from 'react';
import { StyleSheet, View, Text, Button, Slider } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
/*import Slider from '@react-native-community/slider';*/
import { Color } from '../../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { ConfirmationBubble } from '../confirmationBubble';
import { FeedbackBubble } from '../feedbackBubble';

const Emotions = [
  {
    id: 'tenseNervousEmoji',
    description: 'Tense/Nervous',
    color: '#3CBB75',
    icon: 'frown-open',
    listElementStyle: {
      transform: [{ rotate: '135deg' }, { skewY: '0deg' }],
      left: 0,
      top: -10,
      width: '50%',
      height: '50%',
    },
    iconStyle: {
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

export class MoodOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 4,
      selectedMood: 'No mood selected',
      showConfirmationBubble: false,
      showFeedbackBubble: false,
    };
    this.setShowConfirmationBubble = this.setShowConfirmationBubble.bind(this);
    this.setShowFeedbackBubble = this. setShowFeedbackBubble.bind(this);
    this.setSliderValue = this.setSliderValue.bind(this);
    this.setSelectedMood = this.setSelectedMood.bind(this);
  }
  setShowConfirmationBubble(boolean) {
    this.setState({
      showConfirmationBubble: boolean,
    })
  }
  setShowFeedbackBubble(boolean) {
    this.setState({
      showFeedbackBubble: boolean,
    })
  }


  setSliderValue(number) {
    this.setState({
      sliderValue: number,
    })
  }

  setSelectedMood(moodDescription) {
    this.setState({
      selectedMood: moodDescription,
    });
// TODO: Set font size to 70 on icon when selected.
// TODO: Set rest of the icons to 55.
    /*    document.getElementById(`#${moodId}`).style.borderColor = '';
          document.querySelector(`#${moodId}`).style.borderWidth = 2;*/
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
                        <View style={val.iconStyle}>
                        </View>
                      </View>
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.circlePart} key={val.id}>
                      <View style={val.listElementStyle}>
                        <View style={val.iconStyle}>
                          <TouchableOpacity
                            onPress={() => this.setSelectedMood(val.description, val.id)}>
                            <FontAwesome5
                              size={55}
                              name={val.icon}
                              solid
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
            <Text style={styles.noMoodSelectedText}>{this.state.selectedMood}</Text>
            <Text style={styles.sliderValueText}>{this.state.sliderValue}</Text>
            {/*
                        <Slider
              style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />*/}


            <Slider
              style={{ width: 100, height: 30, borderRadius: 50, top: 10 }}
              minimumValue={0}
              maximumValue={7}
              value={this.state.sliderValue}
              onValueChange={(value) => {
                this.setSliderValue(value);
              }}
              step={1}
              maximumTrackTintColor={Color.white}
              minimumTrackTintColor={'#514A9D'}
              thumbTintColor={'#514A9D'}
            />


            <View style={styles.trackingButton}>
              <Button title={'track'}
                      color={Color.secondary}
                      onPress={() => {this.setShowConfirmationBubble('true')}}
              />
            </View>
          </View>
        </View>
        <ConfirmationBubble
          setShowConfirmationBubble={this.setShowConfirmationBubble}
          setSelectedMood={this.setSelectedMood}
          setSliderValue={this.setSliderValue}
          setShowFeedbackBubble={this.setShowFeedbackBubble}
          showConfirmationBubble={this.state.showConfirmationBubble}
          emojiDescription={this.state.selectedMood}
          degree={this.state.sliderValue}
          setMoodOverview={this.props.setMoodOverview}/>
        <FeedbackBubble showFeedbackBubble={this.state.showFeedbackBubble} setShowFeedbackBubble={this.setShowFeedbackBubble} setMoodOverview={this.props.setMoodOverview}/>
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
    /*    position: 'absolute',*/
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
    /*    transform: [{ skewY: '0deg' },{ rotate: '90deg' }],*/
    /*    backgroundColor: Color.primary,*/
    borderRadius: 280 / 2,
    justifyContent: 'center',
    /*    position: 'absolute',*/
    /*    backgroundColor: Color.error,*/
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
    /*    color: Color.white,*/
    width: 20,
    height: 20,
  },
  trackingButton: {
    width: 100,
    height: 20,
    top: 20,
  },
});
