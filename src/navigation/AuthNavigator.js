import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import * as Screens from '../screens';
import { Routes } from './Routes';

const Stack = createStackNavigator();

export const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Routes.Home}
      component={Screens.Home}
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
      name={Routes.QuizResult}
      component={Screens.QuizResult}
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
      name={Routes.History}
      component={Screens.History}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name={Routes.MoodTracking}
      component={Screens.MoodTracking}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name={Routes.MoodTrackingStatistics}
      component={Screens.MoodTrackingStatistics}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);
