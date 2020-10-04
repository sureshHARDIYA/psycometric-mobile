import React from 'react';
import { Calendar } from '../../containers/MoodTracking/index';
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
import { Calendar as QueryComponent } from '../../components/moodtrackingapp/calendar';

export class MoodTrackingStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImage: 'pinkishBeach',
    };
    this.setBackgroundImage = this.setBackgroundImage.bind(this);
  }

  setBackgroundImage(newBackgroundImage) {
    this.setState({
      backgroundImage: newBackgroundImage,
    });
  }

  render() {
    let image;
    switch (this.state.backgroundImage) {
      case('pinkishBeach'):
        image = require('../../../assets/images/moodtrackingapp/pinkishBeach.jpg');
        break;
      case('bali'):
        image = require('../../../assets/images/moodtrackingapp/bali.jpg');
        break;
      case('water'):
        image = require('../../../assets/images/moodtrackingapp/water.jpg');
        break;
      case('ocean'):
        image = require('../../../assets/images/moodtrackingapp/ocean.jpg');
        break;
    }
    return (
      <Container style={styles.container}>
        <ImageBackground
          style={{ flex: 1 }}
          source={image}>
          <TopMenu navigation={this.props.navigation} setBackgroundImage={this.setBackgroundImage}
                   currentBackgroundImage={this.state.backgroundImage}/>
          <ScrollView>
            <View style={styles.calendar}>
              <Calendar
                data={this.props.data}
                loading={this.props.loading}
                onRefresh={this.props.onRefresh}/>
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
