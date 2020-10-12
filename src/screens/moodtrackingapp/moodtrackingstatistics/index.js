import React, { useState, useEffect } from 'react';
import { TopMenu } from '../../../components/moodtrackingapp/topmenu';
import {
  StyleSheet, View, ScrollView, ImageBackground, Alert,
} from 'react-native';
import { Color } from '../../../constants';
import { Container } from '../../../themes';
import { MainMenu } from '../../../components/moodtrackingapp/mainmenu';
import { CalendarStatistics } from '../../../components/moodtrackingapp/calendarStatistics';
import { EmotionQuery } from '../../../containers/MoodTrackingStatistics';
import { BackgroundImage } from '../../../components/moodtrackingapp/backgroundImage';
import { moodEventStream } from '../../../utils/eventEmitter';

export const MoodTrackingStatistics = (props) => {
  const { list, loading, onRefresh } = EmotionQuery({ search: true });
  /*const [emotionList, setEmotionList] = useState(list);
  const [ count, setCount] = useState(0);*/


  const { backgroundImage, setBackgroundImage, image } = BackgroundImage();
// need the empty array in the end to make sure only render once..avoiding infinite loop
  /*One of the popular cases that using useState inside of useEffect will not cause an infinite loop
  is when you pass an empty array as a second argument to useEffect like useEffect(() => {....}, [])
  which means that the effect function should be called once: after the first mount/render only.
  This is used widely when you're doing data fetching in a component and you want to save the request data in the component's state.*/
  useEffect(() => {
    // TODO: The list does not get refetched, need to reload the list from query....
/*    console.log("Length of list: ", list.length, "Length emotionList: ", emotionList.length);*/
    // Get  updatedList and reload CalendarStatistics.
    /*setEmotionList(list); */// IF present won't find list in the start... crashes....
/*    setEmotionList(list);
    setCount(count + 1);*/
    }, []);

/*
  moodEventStream.on('moodsUpdated', () => {
   // Get  updatedList and reload CalendarStatistics.
    setEmotionList(list);
    console.log("MOODSTREAM Length of list: ", list.length, "Length emotionList: ", emotionList.length);
  });
*/

  return (
    <Container style={styles.container}>
      <ImageBackground
        style={{ flex: 1 }}
        source={image}>
        <TopMenu navigation={props.navigation} setBackgroundImage={setBackgroundImage}
                 currentBackgroundImage={backgroundImage} />
        <ScrollView>
          <View style={styles.calendar}>
            {list.length !== 0 && (
              <CalendarStatistics
                data={list}
                loading={loading}
                onRefresh={onRefresh} />
            )
            }
          </View>
        </ScrollView>
        <MainMenu page={'statistics'} navigation={props.navigation} />
      </ImageBackground>
    </Container>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.caption,
    height: '100%',
  },
  calendar: {
    width: '100%',
    height: '100%',
    top: 70,
    alignItems: 'center',
  },
});
