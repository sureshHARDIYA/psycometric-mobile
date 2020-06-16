import { useRoute } from '@react-navigation/native';
import _get from 'lodash/get';
import React, { useMemo } from 'react';

import { Quiz } from '../containers/Quiz';

export const QuizTest = () => {
  const { params } = useRoute();

  const { questions, id, answers } = useMemo(
    () => ({
      id: _get(params, 'id'),
      answers: _get(params, 'answers', []),
      questions: _get(params, 'questions', []),
    }),
    [params]
  );

  return (
    <Quiz practice={false} questions={questions} answers={answers} id={id} />
  );
};
