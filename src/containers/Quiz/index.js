import React, { useMemo } from 'react';
import { useSubmit } from './useSubmit';
import { Quiz as TakeQuiz } from '../../components';
import shuffle from 'lodash/shuffle';

export const Quiz = ({
  practice = false,
  answers,
  rules,
  questions: _questions = [],
  id,
}) => {
  const { onSubmit, loading } = useSubmit();
  const questions = useMemo(() => _questions.map((question) => ({
    ...question,
    answers: shuffle(question.answers)
  })), [_questions]);

  return (
    <TakeQuiz
      id={id}
      rules={rules}
      answers={answers}
      submiting={loading}
      onSubmit={onSubmit}
      practice={practice}
      startTime={Date.now()}
      questions={shuffle(questions)}
    />
  );
}
