import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import * as Screens from '../screens';
import BottomTabNavigator from './BottomTabNavigator';
import { Routes } from './Routes';

const Stack = createStackNavigator();

export const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Routes.Home}
      component={BottomTabNavigator}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name={Routes.Questionnaire}
      component={Screens.Questionnaire}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name={Routes.QuizTest}
      component={Screens.QuizTest}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name={Routes.QuizPractice}
      component={Screens.QuizPractice}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name={Routes.QuizResult}
      component={Screens.QuizResult}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name={Routes.Category}
      component={Screens.Category}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name={Routes.QuestionnaireLevel}
      component={Screens.QuestionnaireLevel}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name={Routes.Author}
      component={Screens.Author}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name={Routes.Profile}
      component={Screens.Profile}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name={Routes.Favourite}
      component={Screens.Favourite}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name={Routes.Feedback}
      component={Screens.Feedback}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name={Routes.About}
      component={Screens.About}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name={Routes.Created}
      component={Screens.Created}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name={Routes.CategoryList}
      component={Screens.CategoryList}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name={Routes.History}
      component={Screens.History}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);
