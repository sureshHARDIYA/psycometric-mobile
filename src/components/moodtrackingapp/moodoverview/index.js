import React from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList, Text } from 'react-native';
import { Color } from '../../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';


const Emotions = [
  {
    id: 'tenseNervousEmoji',
    color: '#3CBB75',
    icon: 'frown-open',
    listElementStyle: {
      transform: [{rotate: '135deg'}, {skewY: '0deg'}],
      position: 'absolute',
      left: 0,
      top:-10,
      width: '50%',
      height: '50%',
/*      after:{
        content: "",
        backgroundColor: Color.white,
        borderWidth: 10,
        borderColor: Color.transparent,
        width: 58,
        height: 58,
        position: 'absolute',
        opacity: 1.0,
        top: 6,
        left: 6,
        bottom: 0,
        right: 0,
        zIndex: -1,
      }*/

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
  return (
    <View style={styles.container} backgroundColor={ Color.transparent }>

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
                    <View  style={val.iconStyle}>
                      <FontAwesome5  size={55}
                                     name={val.icon}
                                     solid
                                     color={val.color} />
                    </View>
                </View>
                </View>
              )
            })
          }
          </View>
        </LinearGradient>
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
    borderWidth: 3,
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
  }
});
