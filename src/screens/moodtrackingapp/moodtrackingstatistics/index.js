import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, ImageBackground, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

import { BackgroundImage } from '../../../components/moodtrackingapp/backgroundImage';
import { CalendarStatistics } from '../../../components/moodtrackingapp/calendarStatistics';
import { MainMenu } from '../../../components/moodtrackingapp/mainmenu';
import { TopMenu } from '../../../components/moodtrackingapp/topmenu';
import { Color } from '../../../constants';
import { EmotionQuery } from '../../../containers/MoodTrackingStatistics';
import { Container } from '../../../themes';
import Emitter from '../../../utils/eventEmitter';
import _get from 'lodash/get';

export const MoodTrackingStatistics = (props) => {
  const { setBackgroundImage, backgroundImage, image } = BackgroundImage();
  let { list, loading, refetch } = EmotionQuery({ search: true });
  const [emotionList, setEmotionList] = useState([]);
  console.log('PARENT EMOTIONLIST', emotionList.length, 'LIST', list.length);


  Emitter.off('MoodDeleted');
  Emitter.on('MoodDeleted', () => {
    refetch().then(({ data, loading }) => {
      list = _get(data, 'result.rows', []);
    });
  });


  useEffect(() => {
    if (!loading && list) {
      setEmotionList(list);
    }
  }, [loading, list, emotionList]);

  return (
    <Container style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={image}>
        <TopMenu
          navigation={props.navigation}
          setBackgroundImage={setBackgroundImage}
          currentBackgroundImage={backgroundImage}
        />
        <ScrollView>
          <View style={styles.calendar}>
            <CalendarStatistics
              data={emotionList}
              refetch={refetch}
              loading={loading}
            />

          </View>
        </ScrollView>
        <MainMenu page="statistics" navigation={props.navigation} />
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
    top: 10,
    alignItems: 'center',
  },
});
