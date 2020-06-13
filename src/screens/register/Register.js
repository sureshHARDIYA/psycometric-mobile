import React, { useEffect } from 'react';
import { Topbar } from '../../themes';
import { Category } from './Category';
import { Questionnaire } from './Questionnaire';
import { Quiz } from './Quiz';
import { Final } from './Final';
import { createStackNavigator } from '@react-navigation/stack';
import { useForm, FormContext } from "react-hook-form";
import { AsyncStorage } from 'react-native';

const Stack = createStackNavigator();

export const Register = () => {
  const methods = useForm();

  useEffect(() => {
    AsyncStorage.setItem('@firstLoading', 'initiated');
  }, [])

  return (
    <FormContext {...methods}>
      <Stack.Navigator
        screenOptions={{
          headerLeft: () => <Topbar.Back style={{ paddingTop: 0, paddingBottom: 0  }} />,
          headerTitle: null,
        }}
      >
        <Stack.Screen
          name="Step1"
          component={Category}
        />
        <Stack.Screen
          name="Step2"
          component={Questionnaire}
        />
        <Stack.Screen
          name="Step3"
          component={Quiz}
        />
        <Stack.Screen
          name="Step4"
          component={Final}
        />
      </Stack.Navigator>
    </FormContext>
  );
};
