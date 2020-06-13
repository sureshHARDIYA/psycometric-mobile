import { Modal } from '@ant-design/react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import _difference from 'lodash/difference';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import React, { useRef, useState, useCallback } from 'react';
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

export const Quiz = ({
  practice = false,
  questions = [],
  id: questionnaireId,
  onSubmit,
  startTime,
  submiting,
  preview,
  onSkip,
  loading,
}) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswer] = useState({});
  const [explans, setExplan] = useState({});

  const carouselRef = useRef(null);
  const navigation = useNavigation();
  const total = questions.length;

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
      : Modal.alert(
          'Confirm',
          `Sure to abort this ${practice ? 'Practice' : 'Test'}?`,
          [
            { text: 'No', onPress: () => false },
            { text: 'Yes', onPress: () => navigation.goBack() },
          ]
        );

  const goSubmit = useCallback(
    (answersSubmit) => {
      const duration = Math.ceil((Date.now() - startTime) / 1000);

      Modal.alert(
        'Confirm',
        `Sure to submit this ${practice ? 'Practice' : 'Test'}?`,
        [
          { text: 'No', onPress: () => false },
          {
            text: 'Yes',
            onPress: () => {
              const params = {
                duration,
                randomizeQuestion: true,
                questionnaire: questionnaireId,
                kind: practice ? 'PRACTICE' : 'TEST',
                questions: questions.map((question) => ({
                  question: question.id,
                  answers: Object.entries(
                    answersSubmit[question.id] || {}
                  ).reduce(
                    (obj, [answerId, selected]) =>
                      selected ? [...obj, answerId] : obj,
                    []
                  ),
                })),
              };
              if (!preview) {
                onSubmit &&
                  onSubmit(params).then(() =>
                    navigation.navigate(Routes.QuizResult, {
                      practice,
                      questions,
                      answers: answersSubmit,
                    })
                  );
              } else {
                onSubmit(params);
              }
            },
          },
        ]
      );
    },
    [questionnaireId]
  );

  const renderItem = ({ item }) => {
    const questionId = item.id;
    const answersList = item.answers || [];
    const isSingle = item.questionType === 'SINGLE';
    const correctList = answersList.reduce(
      (rs, item) => (item.isCorrect ? [...rs, item.id] : rs),
      []
    );
    const answeredList = Object.entries(_get(answers, `${questionId}`, {}))
      .filter(([_, value]) => value)
      .map(([id]) => id);
    const answeredCorrect = _isEqual(correctList.sort(), answeredList.sort());
    const hasWrong = _difference(answeredList, correctList).length > 0;

    return (
      <ScrollView style={styles.content}>
        <View style={styles.question}>
          <Markdown style={markdownStyle}>{item.title}</Markdown>
          {practice &&
            answeredList.length > 0 &&
            (hasWrong || answeredCorrect) && (
              <View
                style={[
                  styles.explan,
                  !explans[questionId] && { borderTopWidth: 0 },
                ]}>
                {explans[questionId] && (
                  <Markdown style={{ body: markdownStyle.bodyItem }}>
                    {item.explainAnswer}
                  </Markdown>
                )}
                <TouchableOpacity
                  style={styles.btnExplan}
                  onPress={() =>
                    setExplan((pre) => ({
                      ...pre,
                      [questionId]: !pre[questionId],
                    }))
                  }>
                  <Text>{explans[questionId] ? 'Hide' : 'Show'} explan</Text>
                  {hasWrong && (
                    <FontAwesome5
                      size={20}
                      name="sad-tear"
                      style={styles.emoji}
                      color={Color.textColor}
                    />
                  )}
                  {answeredCorrect && (
                    <FontAwesome5
                      size={20}
                      name="smile-wink"
                      style={styles.emoji}
                      color={Color.success}
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
        </View>
        {!isSingle && (
          <Text style={styles.caption}>Mutiple correct answers.</Text>
        )}
        <View style={styles.answers}>
          {answersList.map((answer) => {
            const answerId = answer.id;
            const answered = _get(answers, `${questionId}.${answerId}`);
            const wrong = practice && answered && !answer.isCorrect;
            const correct = practice && answered && answer.isCorrect;

            return (
              <TouchableOpacity
                key={answerId}
                disabled={practice && (hasWrong || answeredCorrect)}
                style={[
                  styles.answerItem,
                  styles.shadow,
                  !!answered && styles.answerActive,
                  wrong && styles.practiceWrong,
                  correct && styles.practiceSuccess,
                ]}
                onPress={() =>
                  setAnswer((pre) => ({
                    ...pre,
                    [questionId]: {
                      ...(isSingle ? {} : _get(pre, questionId, {})),
                      [answerId]: !answered,
                    },
                  }))
                }>
                {['CODE', 'TEXT'].includes(answer.answerType) && (
                  <Markdown style={{ body: markdownStyle.bodyItem }}>
                    {answer.title}
                  </Markdown>
                )}
                {answer.answerType === 'PICTURE' && (
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
              <Button type="danger" style={styles.btnNext} onPress={goForward}>
                <Text style={styles.btnNextText}>Next</Text>
              </Button>
            )}
            {current === total - 1 && (
              <Button
                type="primary"
                style={styles.btnNext}
                onPress={() => goSubmit(answers)}>
                <Text style={styles.btnNextText}>Submit</Text>
              </Button>
            )}
          </View>
        </View>
      </ScrollView>
    );
  };

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
    borderColor: Color.gray,
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
    backgroundColor: Color.danger,
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
