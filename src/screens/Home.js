import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Color } from '../constants';
import { QuestionnaireList } from '../containers';
import { HeaderMain, Container } from '../themes';

export const Home = ({ navigation }) => (
  <Container>
    <HeaderMain
      right={
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons size={30} name="ios-menu" color={Color.black} />
        </TouchableOpacity>
      }
    />
    <QuestionnaireList />
  </Container>
);
