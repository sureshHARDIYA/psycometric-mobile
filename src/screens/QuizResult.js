import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
// import Markdown from 'react-native-markdown-display';

import { Summary } from '../components/Summary';
import { Color, Size } from '../constants';
import { Routes } from '../navigation';
import { Text, Button, Container } from '../themes';

export const QuizResult = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const [visible, setVisible] = useState(false);
  const { questions, total } = params;

  const { score } = questions.reduce(
    (obj, question) => {
      obj.score += question.answered.score;

      return obj;
    },
    { score: 0 }
  );

  return (
    <Container>
      <View style={styles.content}>
        <ScrollView style={{ flex: 1, padding: 20, width: '100%' }}>
          <View style={styles.content}>
            <View style={[styles.result]}>
              <View style={styles.score}>
                <Text style={[styles.scoreCaption]}>Your score</Text>
                <Text style={styles.scoreText}>
                  {score + 1} / {total}
                </Text>
              </View>
            </View>
            <View style={[styles.resultCaption]}>
              <Text style={{ textAlign: 'center' }}>
                Show text rule on message in here
              </Text>
            </View>
            <View style={styles.buttons}>
              <Button
                style={styles.btnClose}
                onPress={() => navigation.navigate(Routes.Home)}>
                <MaterialCommunityIcons
                  size={30}
                  name="window-close"
                  color={Color.textColor}
                />
              </Button>
              <Button
                type="warning"
                style={styles.btnNext}
                onPress={() => setVisible(true)}>
                <Text style={styles.btnNextText}>View Summary</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
        <Summary
          visible={visible}
          setVisible={setVisible}
          questions={questions}
          title="Summary"
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.push(Routes.Feedback)}>
          <Text style={styles.highlight}>Give feedback</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
  },
  score: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: Color.primary,
  },
  scoreCaption: {
    fontSize: 28,
    marginBottom: 20,
    color: Color.success,
    textAlign: 'center',
  },
  scorePassed: {
    color: Color.success,
  },
  result: {
    padding: 30,
    maxWidth: 320,
    width: Size.deviceWidth * 0.7,
    borderRadius: 10,
    backgroundColor: Color.white,
  },
  resultCaption: {
    paddingTop: 30,
    width: Size.deviceWidth * 0.7,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 0.23,
    elevation: 3,
  },
  buttons: {
    padding: 20,
    marginTop: 20,
    marginBottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnClose: {
    width: 50,
    height: 50,
    margin: 10,
    paddingLeft: 0,
    paddingRight: 0,
    borderRadius: 40,
    borderColor: Color.textColor,
  },
  btnNext: {
    margin: 10,
    height: 50,
    width: 180,
    borderWidth: 2,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnNextText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.white,
  },
  summary: {
    flexDirection: 'row',
  },
  summaryItem: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    marginTop: 2,
    marginLeft: 5,
  },
  summaryText: {
    fontSize: 18,
  },
  footer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
  },
  footerText: {
    padding: 5,
    textAlign: 'center',
  },
  highlight: {
    color: Color.primary,
  },
  caption: {
    margin: 20,
    width: '100%',
    maxWidth: 300,
  },
});
