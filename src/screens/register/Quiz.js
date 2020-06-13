import React, { useEffect, useCallback } from 'react';
import _get from 'lodash/get';
import _sampleSize from 'lodash/sampleSize';
import { Modal } from '@ant-design/react-native';
import { Container, Topbar, Text, Button } from '../../themes';
import { Quiz as TakQuiz } from '../../components';
import { useRoute } from '@react-navigation/native';
import { useSearch } from '../../containers/QuestionList/useSearch';
import { ActivityIndicator } from 'react-native';

export const Quiz = ({ navigation}) => {
  const { params } = useRoute();
  const id = _get(params, 'id');
  const { questionnaire, loading } = useSearch(id);
  const onSubmit = () => navigation.navigate('Register', { screen: 'Step4' })
  const questions = _sampleSize(_get(questionnaire, 'questions'), 10);

  const onSkip = useCallback(() => {
    if (questions.length > 0) {
      Modal.alert(
        'Confirm',
        'Sure to abort this test?',
        [
          { text: 'No', onPress: () => false },
          { text: 'Yes', onPress: onSubmit },
        ]
      )
    } else {
      onSubmit()
    }
  }, [questions.length])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Topbar.Right
          actions={{
            text: 'Skip',
            onPress: onSkip,
          }}
        />
      ),
    })
  }, [questions.length])

  if (!questions.length) {
    return (
      <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
        {loading ? (
          <>
            <ActivityIndicator />
            <Text>Fetching...</Text>
          </>
        ) : (
          <>
            <Text>No Question</Text>
            <Button onPress={onSubmit} style={{ margin: 20 }} type="danger">Continue</Button>
          </>
        )}
      </Container>
    )
  }

  return (
    <Container>
      <TakQuiz
        id={id}
        preview
        onSkip={onSkip}
        loading={loading}
        onSubmit={onSubmit}
        startTime={Date.now()}
        questions={questions}
      />
    </Container>
  );
};
