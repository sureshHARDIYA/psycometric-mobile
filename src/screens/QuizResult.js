import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import {
  useNavigation,
  CommonActions,
  useRoute,
  useNavigationState,
} from '@react-navigation/native';
import _difference from 'lodash/difference';
import _get from 'lodash/get';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Summary } from '../components/Summary';
import { Color, Size } from '../constants';
import { Routes } from '../navigation';
import { Text, Button, Container } from '../themes';

const scoreMessage = (percent) => {
  if (percent >= 90) {
    return `Congratulation\nYou passed with Distinction`;
  }
  if (percent >= 80) {
    return `Congratulation\nYou passed with First Divison`;
  }
  if (percent >= 65) {
    return `Congratulation\nYou passed with Second Divison`;
  }
  if (percent >= 55) {
    return `Congratulation\nYou passed with Third Divison`;
  }
  if (percent >= 45) {
    return `Congratulation\nYou passed the test`;
  }

  return `Sorry\nYou failed the test\nYou must work hard`;
};

export const QuizResult = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const [visible, setVisible] = useState(false);
  const routes = useNavigationState((state) => state.routes);
  const { answers, questions, practice = true } = params;

  const { score, correct, incorrect, none, total } = questions.reduce(
    (preObj, question) => {
      const obj = { ...preObj };
      const questionId = question.id;
      const answeredList = Object.entries(_get(answers, `${questionId}`, {}))
        .filter(([_, value]) => value)
        .map(([id]) => id);

      const { correctList, score } = question.answers.reduce(
        (rs, item) => {
          if (item.isCorrect) {
            return {
              score: rs.score + item.score,
              correctList: [...rs.correctList, item.id],
            };
          }

          return rs;
        },
        { correctList: [], score: 0 }
      );
      obj.total += score;

      if (!_difference(correctList, answeredList).length) {
        obj.correct.push(questionId);
        obj.score += score;
      } else {
        obj.incorrect.push(questionId);
      }

      return obj;
    },
    { score: 0, correct: [], incorrect: [], none: [], total: 0 }
  );

  const onReplay = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: routes.slice(0, 2),
      })
    );
  }, []);

  const percent = Math.ceil((score * 100) / total);

  return (
    <Container>
      <View style={styles.content}>
        <View style={[styles.result, styles.shadow]}>
          <Text
            style={[styles.scoreCaption, percent >= 45 && styles.scorePassed]}>
            {scoreMessage(percent)}
          </Text>
          <View style={styles.score}>
            <Text style={styles.scoreText}>{percent}%</Text>
            <View style={styles.summary}>
              {correct.length > 0 && (
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryText}>{correct.length}</Text>
                  <FontAwesome5
                    size={16}
                    name="smile-wink"
                    style={styles.emoji}
                    color={Color.success}
                  />
                </View>
              )}
              {incorrect.length > 0 && (
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryText}>{incorrect.length}</Text>
                  <FontAwesome5
                    size={16}
                    name="sad-tear"
                    style={styles.emoji}
                    color={Color.error}
                  />
                </View>
              )}
            </View>
          </View>
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
          <Button type="warning" style={styles.btnNext} onPress={onReplay}>
            <Text style={styles.btnNextText}>Try again</Text>
          </Button>
        </View>
        <Button onPress={() => setVisible(true)}>View Summary</Button>
        <Summary
          practice={practice}
          visible={visible}
          setVisible={setVisible}
          none={none}
          score={score}
          correct={correct}
          answers={answers}
          incorrect={incorrect}
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
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: Color.primary,
  },
  scoreCaption: {
    fontSize: 20,
    color: Color.danger,
    textAlign: 'center',
  },
  scorePassed: {
    color: Color.success,
  },
  result: {
    padding: 30,
    maxWidth: 320,
    // maxHeight: 300,
    width: Size.deviceWidth * 0.7,
    height: Size.deviceWidth * 0.7,
    borderRadius: 10,
    backgroundColor: Color.white,
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
    width: 150,
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
});
