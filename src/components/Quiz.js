import { Modal } from '@ant-design/react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import _get from 'lodash/get';
import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import Carousel from 'react-native-snap-carousel';

import { Color, Size } from '../constants';
import { Routes } from '../navigation';
import { Text, Button, Container } from '../themes';

const parseMessage = (score, rules) => {
  const messages = [];
  const orderRules = rules.sort((a, b) => a.min - b.min);

  for (const rule of orderRules) {
    if (
      (rule.max >= score && score >= rule.min) ||
      (!rule.min && rule.max >= score) ||
      (!rule.max && rule.min <= score)
    ) {
      messages.push(rule);
    }
  }

  return messages;
};

export const Quiz = ({
  answers: answersList = [],
  questions = [],
  id: questionnaireId,
  onSubmit,
  startTime,
  submiting,
  preview,
  onSkip,
  loading,
  rules,
}) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswer] = useState({});

  const carouselRef = useRef(null);
  const navigation = useNavigation();
  const total = questions.length;

  const { answerObject, maxScore } = useMemo(
    () =>
      answersList.reduce(
        (obj, item) => ({
          answerObject: {
            ...obj.answerObject,
            [item.id]: item,
          },
          maxScore: item.score > obj.maxScore ? item.score : obj.maxScore,
        }),
        { answerObject: {}, maxScore: 0 }
      ),
    [answersList]
  );

  const onSnapToItem = (index) => setCurrent(index);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  const goPrev = () => {
    carouselRef.current.snapToPrev();
  };

  const goBack = () =>
    preview
      ? onSkip()
      : Modal.alert('Confirm', `Sure to abort this Test?`, [
          { text: 'No', onPress: () => false },
          { text: 'Yes', onPress: () => navigation.goBack() },
        ]);

  const goSubmit = useCallback(
    (answersSubmit) => {
      const duration = Math.ceil((Date.now() - startTime) / 1000);

      Modal.alert('Confirm', `Sure to submit this This`, [
        { text: 'No', onPress: () => false },
        {
          text: 'Yes',
          onPress: () => {
            const _questions = questions.map((question) => ({
              id: question.id,
              title: question.title,
              answered: {
                id: answerObject[answersSubmit[question.id]].id,
                type: answerObject[answersSubmit[question.id]].type,
                title: answerObject[answersSubmit[question.id]].title,
                score: answerObject[answersSubmit[question.id]].score,
              },
            }));

            const score = _questions.reduce(
              (total, question) => total + question.answered.score,
              0
            );

            const result = () => {
              const messages = parseMessage(score, rules);

              if (!messages.length) {
                return null;
              }

              return messages
                .map(
                  (rule) =>
                    `${
                      rule.min
                        ? rule.max
                          ? `${rule.min} - ${rule.max}: `
                          : `>= ${rule.min}: `
                        : rule.max
                        ? `<= ${rule.max}: `
                        : ''
                    } ${rule.message || ''}`
                )
                .filter((i) => i)
                .join('-join-');
            };

            const params = {
              score,
              duration,
              caption: result(),
              questions: _questions,
              randomizeQuestion: true,
              questionnaire: questionnaireId,
              total: maxScore * questions.length,
            };

            if (!preview) {
              onSubmit &&
                onSubmit(params).then(() =>
                  navigation.navigate(Routes.QuizResult, params)
                );
            } else {
              onSubmit(params);
            }
          },
        },
      ]);
    },
    [questionnaireId, answersList, questions, rules]
  );

  const renderItem = useCallback(
    ({ item }) => {
      const questionId = item.id;
      const answered = typeof _get(answers, `${questionId}`) !== 'undefined';

      return (
        <ScrollView style={styles.content}>
          <View style={styles.question}>
            <Markdown style={markdownStyle}>{item.title}</Markdown>
          </View>
          <View style={styles.answers}>
            {answersList.map((answer) => {
              const answerId = answer.id;
              const answerType = answer.type || 'TEXT';

              return (
                <TouchableOpacity
                  key={answerId}
                  style={[
                    styles.answerItem,
                    styles.shadow,
                    _get(answers, `${questionId}`) === answerId &&
                      styles.answerActive,
                  ]}
                  onPress={() =>
                    setAnswer((pre) => ({
                      ...pre,
                      [questionId]: answerId,
                    }))
                  }>
                  {['CODE', 'TEXT'].includes(answerType) && (
                    <Markdown style={{ body: markdownStyle.bodyItem }}>
                      {answer.title}
                    </Markdown>
                  )}
                  {answerType === 'PICTURE' && (
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={{ uri: answer.title }}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.buttons}>
            {current > 0 && (
              <Button type="default" style={styles.btnPrev} onPress={goPrev}>
                <MaterialCommunityIcons
                  size={30}
                  name="arrow-left"
                  color={Color.textColor}
                />
              </Button>
            )}
            {!current && (
              <Button type="default" style={styles.btnPrev} onPress={goBack}>
                <MaterialCommunityIcons
                  size={30}
                  name="window-close"
                  color={Color.textColor}
                />
              </Button>
            )}
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              {current < total - 1 && (
                <Button
                  type="primary"
                  style={styles.btnNext}
                  disabled={!answered}
                  onPress={goForward}>
                  <Text style={styles.btnNextText}>Next</Text>
                </Button>
              )}
              {current === total - 1 && (
                <Button
                  type="primary"
                  disabled={!answered}
                  style={styles.btnNext}
                  onPress={() => goSubmit(answers)}>
                  <Text style={styles.btnNextText}>Submit</Text>
                </Button>
              )}
            </View>
          </View>
        </ScrollView>
      );
    },
    [answersList, answers, current]
  );

  return (
    <Container>
      <View style={styles.header}>
        <View style={[styles.questionCount]}>
          <View
            style={[
              styles.questionCountOverlay,
              { width: `${((current + 1) * 100) / total}%` },
            ]}
          />
          <Text style={styles.questionCountText}>
            {current + 1} / {total}
          </Text>
        </View>
      </View>
      <Carousel
        lockScrollWhileSnapping
        scrollEnabled={false}
        ref={carouselRef}
        data={questions}
        renderItem={renderItem}
        itemWidth={Size.deviceWidth}
        sliderWidth={Size.deviceWidth}
        onSnapToItem={onSnapToItem}
      />
      {submiting && (
        <View style={[styles.submiting]}>
          <ActivityIndicator color={Color.white} />
          <Text style={styles.submitingText}>Submiting</Text>
        </View>
      )}
      {loading && (
        <View style={[styles.submiting]}>
          <ActivityIndicator color={Color.white} />
          <Text style={styles.submitingText}>Loading...</Text>
        </View>
      )}
    </Container>
  );
};

const markdownStyle = StyleSheet.create({
  body: {
    fontSize: 18,
    color: Color.textColor,
  },
  bodyItem: {
    color: Color.textColor,
  },
});

const styles = StyleSheet.create({
  header: {
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submiting: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
  },
  submitingText: {
    marginTop: 10,
    color: Color.white,
    fontSize: 20,
  },
  questionCount: {
    width: 200,
    height: 35,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    borderColor: Color.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionCountText: {
    fontWeight: 'bold',
  },
  explan: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: Color.gray,
  },
  explanText: {
    paddingTop: 10,
  },
  questionCountOverlay: {
    width: 0,
    left: 0,
    top: 0,
    height: 35,
    position: 'absolute',
    backgroundColor: Color.primary,
  },
  content: {
    padding: 20,
  },
  questionText: {
    fontSize: 18,
  },
  question: {
    marginBottom: 40,
  },
  answerItem: {
    margin: 2,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    position: 'relative',
    borderColor: Color.white,
    backgroundColor: Color.white,
  },
  buttons: {
    marginTop: 20,
    marginBottom: 50,
    flexDirection: 'row',
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
  btnPrev: {
    width: 50,
    height: 50,
    paddingLeft: 0,
    paddingRight: 0,
    borderRadius: 40,
    borderColor: Color.textColor,
  },
  btnNext: {
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
  answerActive: {
    borderColor: Color.textColor,
  },
  practiceWrong: {
    borderColor: Color.error,
  },
  practiceSuccess: {
    borderColor: Color.success,
  },
  btnExplan: {
    marginTop: 10,
    flexDirection: 'row',
  },
  emoji: {
    marginLeft: 10,
  },
  caption: {
    color: Color.gray,
    marginBottom: 10,
  },
});
