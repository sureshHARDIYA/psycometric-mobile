import React from 'react';
import Calendar from '../../components/moodtrackingapp/calendar';
import { TopMenu } from '../../components/moodtrackingapp/topmenu';
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Color } from '../../constants';
import { Container } from '../../themes';
import { MainMenu } from '../../components/moodtrackingapp/mainmenu';

export class MoodTrackingStatistics extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <ImageBackground
          style={{ flex: 1 }}
          source={require('../../../assets/images/moodtrackingapp/pinkishBeach.jpg')}>
          <TopMenu navigation={this.props.navigation}/>
          <ScrollView>
            <View style={styles.calendar}>
              <Calendar />
            </View>
          </ScrollView>
          <MainMenu page={'statistics'} navigation={this.props.navigation}/>
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
  calendar: {
    /*    padding: 10,*/
    /*    bottom: 0,*/
    width: '100%',
    height: '100%',
    /*    justifyContent: 'center',*/
    top: 80,
    alignItems: 'center',
  }
});
