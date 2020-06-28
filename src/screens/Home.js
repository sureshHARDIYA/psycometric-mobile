import { Ionicons } from '@expo/vector-icons';
import { Notifications } from 'expo';
import _get from 'lodash/get';
import React, { useEffect, useCallback } from 'react';
import { Vibration } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Color } from '../constants';
import { QuestionnaireList } from '../containers';
import { useAuth } from '../containers/Auth';
import { Routes } from '../navigation';
import { HeaderMain, Container } from '../themes';

export const Home = ({ navigation }) => {
  const { accessToken } = useAuth();
  const handleNotification = useCallback((notification) => {
    Vibration.vibrate();
    const id = _get(notification, 'data.questionnaire.id');
    if (id) {
      navigation.navigate(Routes.Questionnaire, { id });
    }
  }, []);

  useEffect(() => {
    Notifications.addListener(handleNotification);
  }, []);

  useEffect(() => {
    navigation.closeDrawer();
  }, [accessToken]);

  return (
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
};
