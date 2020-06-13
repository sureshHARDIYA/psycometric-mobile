import React, { useMemo } from 'react';
import { useSubmit } from './useSubmit';
import { Quiz as TakQuiz } from '../../components';
import moment from 'moment';
import shuffle from 'lodash/shuffle';

export const Quiz = ({
  practice = false,
  questions: _questions = [],
  id,
}) => {
  const { onSubmit, loading } = useSubmit();
  const questions = useMemo(() => _questions.map((question) => ({
    ...question,
    answers: shuffle(question.answers)
  })), [_questions]);

  return (
    <TakQuiz
      id={id}
      submiting={loading}
      onSubmit={onSubmit}
      practice={practice}
      startTime={Date.now()}
      questions={shuffle(questions)}
    />
  );
}
