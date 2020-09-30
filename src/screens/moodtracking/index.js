import React from 'react';
import { StyleSheet, ImageBackground, ScrollView } from 'react-native';

import { TopMenu } from '../../components/moodtrackingapp/topmenu';
import { MainMenu } from '../../components/moodtrackingapp/mainmenu';
import { Color } from '../../constants';
import { Container } from '../../themes';

export class MoodTracking extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <ImageBackground
          style={{ flex: 1 }}
          source={require('../../../assets/images/moodtrackingapp/pinkishBeach.jpg')}>
          <TopMenu navigation={this.props.navigation}/>
          <ScrollView>
          </ScrollView>
          <MainMenu page={'moodtracking'} navigation={this.props.navigation}/>
        </ImageBackground>
      </Container>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.caption,
    height: '100%',
  },
});
