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

export  const MoodTrackingStatistics = (props) => {
    const { setBackgroundImage, backgroundImage, image } = BackgroundImage();
    const { list, loading, onRefresh } = EmotionQuery({ search: true });

    const [emotionList, setEmotionList] = useState(() => {
      const initialState = list;
      return initialState;
    });

    const handleMoodListChange = () => {
      setEmotionList(EmotionQuery({ search: true }).list);
    };

  /*useEffect(() => {
    setEmotionList(EmotionQuery({ search: true }).list);
    console.log('moodtrackignstatistics  List: ', 'EmotionList: ', emotionList.length);
  }, [list]);*/

  /*  moodEventStream.on('moodsUpdated', () => {
     // Get  updatedList and reload CalendarStatistics.
      setEmotionList(list);
      Alert.alert(`moods updates have been triggered,  new emotion list set to:  ${emotionList.length}`, '');
    });*/

    return (
      <Container style={styles.container}>
        <ImageBackground
          style={{ flex: 1 }}
          source={image}>
          <TopMenu navigation={props.navigation} setBackgroundImage={setBackgroundImage}
                   currentBackgroundImage={backgroundImage} />
          <ScrollView>
            <View style={styles.calendar}>
              {/*            {emotionList.length !== 0 && (*/}
              <CalendarStatistics
                data={list}
                handleMoodListChange={handleMoodListChange}
              />
              {/*       )
            }*/}
            </View>
          </ScrollView>
          <MainMenu page={'statistics'} navigation={props.navigation} />
        </ImageBackground>
      </Container>
    );
}
;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.caption,
    height: '100%',
  },
  calendar: {
    width: '100%',
    height: '100%',
    top: 10,
    alignItems: 'center',
  },
});
