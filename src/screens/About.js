import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';

import { Color } from '../constants';
import { Text, Header, Container } from '../themes';

export const About = ({ navigation }) => (
  <Container style={styles.container}>
    <Header style={styles.header}>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => navigation.goBack()}>
        <Ionicons
          size={30}
          name="ios-arrow-dropleft"
          color={Color.textColor}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>About us</Text>
    </Header>
    <ScrollView style={styles.content}>
      <Text style={styles.text}>
        <Text style={styles.bold}>Psychometric</Text> is a free app created for
        beginners to advanced IT students, developers, designers, and another
        computer scientist. You can create a free account and start learning.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Psychometric</Text> is the entertainment
        trivia game where you get unlimited questions that can’t be found
        anywhere else.
      </Text>
      <Text style={styles.text}>
        Install <Text style={styles.bold}>Psychometric</Text> and answer trivia
        questions, read interesting explanations, educate yourself!
      </Text>
      <Text style={styles.text}>
        Just your brain and our quizzes. No need to wait for other players'
        replies!
      </Text>
      <Text style={styles.text}>
        Join the league of top players and collect achievements of all kinds.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Psychometric</Text> is:
      </Text>
      <Text style={styles.text}>
        - Free trivia game to test your IQ and general knowledge
      </Text>
      <Text style={styles.text}>
        - Dource of valuable and little-known information
      </Text>
      <Text style={styles.text}>
        - Entertaining questions for all categories of interest
      </Text>
      <Text style={styles.text}>
        - Delightful learning experience whether you know the answers or not
      </Text>
      <Text style={styles.text}>- Detailed explanation for every question</Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Psychometric</Text> makes learning easy and
        fun!
      </Text>
      <Text style={styles.text}>
        <Text style={styles.team}>Development Team:</Text>
      </Text>
      <Text style={styles.text}>
        - <Text style={styles.bold}>Suresh K. Mukhiya:</Text>{' '}
        <Text onPress={() => Linking.canOpenURL('mailto:itsmeskm99@gmail.com')}>
          itsmeskm99@gmail.com
        </Text>
      </Text>
      <Text style={styles.text}>
        - <Text style={styles.bold}>Hung K. Hoang:</Text>{' '}
        <Text onPress={() => Linking.canOpenURL('mailto:hunghk.it@gmail.com')}>
          hunghk.it@gmail.com
        </Text>
      </Text>
    </ScrollView>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  goBack: {
    zIndex: 2,
    marginLeft: 10,
  },
  title: {
    flex: 1,
    fontSize: 24,
    marginLeft: -30,
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    padding: 10,
    marginBottom: 30,
  },
  text: {
    margin: 10,
    fontSize: 16,
    marginTop: 0,
  },
  bold: {
    fontWeight: 'bold',
  },
  team: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  about: {
    margin: 20,
  },
});
