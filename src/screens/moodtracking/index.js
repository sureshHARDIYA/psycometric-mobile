import React from 'react';
import { StyleSheet, ImageBackground, ScrollView, Alert } from 'react-native';

import { TopMenu } from '../../components/moodtrackingapp/topmenu';
import { MainMenu } from '../../components/moodtrackingapp/mainmenu';
import { Color } from '../../constants';
import { Container } from '../../themes';

export class MoodTracking extends React.Component {
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
                   currentBackgroundImage={this.state.backgroundImage} />
          <ScrollView>
          </ScrollView>
          <MainMenu page={'moodtracking'} navigation={this.props.navigation} />
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
