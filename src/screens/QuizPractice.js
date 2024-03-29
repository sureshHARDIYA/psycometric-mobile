import { useRoute } from '@react-navigation/native';
import _get from 'lodash/get';
import React, { useMemo } from 'react';

import { Quiz } from '../containers/Quiz';

export const QuizPractice = () => {
  const { params } = useRoute();

  const { questions, id } = useMemo(
    () => ({
      id: _get(params, 'id'),
      questions: _get(params, 'questions', []),
    }),
    [params]
  );

  return <Quiz practice questions={questions} id={id} />;
};
