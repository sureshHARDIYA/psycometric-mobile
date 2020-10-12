import React from 'react';
import { StyleSheet, ImageBackground, ScrollView, Alert } from 'react-native';

import { TopMenu } from '../../../components/moodtrackingapp/topmenu';
import { MainMenu } from '../../../components/moodtrackingapp/mainmenu';
import { Color } from '../../../constants';
import { Container } from '../../../themes';
import { BackgroundImage } from '../../../components/moodtrackingapp/backgroundImage';

export const MoodTracking = (props) => {
  const { backgroundImage, setBackgroundImage, image } = BackgroundImage();
    return (
      <Container style={styles.container}>
        <ImageBackground
          style={{ flex: 1 }}
          source={image}>
          <TopMenu navigation={props.navigation} setBackgroundImage={setBackgroundImage}
                   currentBackgroundImage={backgroundImage} />
          <ScrollView>
          </ScrollView>
          <MainMenu page={'moodtracking'} navigation={props.navigation} />
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
});
