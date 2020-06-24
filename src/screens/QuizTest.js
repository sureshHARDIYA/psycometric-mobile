import { useRoute } from '@react-navigation/native';
import React from 'react';

import { Quiz } from '../containers/Quiz';

export const QuizTest = () => {
  const { params } = useRoute();

  return <Quiz practice={false} {...params} />;
};
