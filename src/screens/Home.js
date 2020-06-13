import React from 'react';

import { QuestionnaireList } from '../containers';
import { HeaderMain, Container } from '../themes';

export const Home = () => (
  <Container>
    <HeaderMain />
    <QuestionnaireList />
  </Container>
);
