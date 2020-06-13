import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { AsyncStorage, StyleSheet, View, Image } from 'react-native';

import { Size, Images } from '../constants';
import * as Screens from '../screens';
import { Container } from '../themes';
import { Routes } from './Routes';

const Stack = createStackNavigator();

export const UnauthNavigator = () => {
  const [fetched, setFetch] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@firstLoading')
      .then((v) => setFetch(v || 'none'))
      .catch(() => setFetch('error'));
  }, []);

  if (!fetched) {
    return (
      <Container>
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image source={Images.logo} style={[styles.img]} />
          </View>
        </View>
      </Container>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={fetched === 'initiated' ? Routes.Login : Routes.Landing}
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen name={Routes.Landing} component={Screens.Landing} />
      <Stack.Screen name={Routes.Register} component={Screens.Register} />
      <Stack.Screen name={Routes.Login} component={Screens.Login} />
      <Stack.Screen name={Routes.About} component={Screens.About} />
      <Stack.Screen name={Routes.Feedback} component={Screens.Feedback} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginTop: -100,
    alignSelf: 'center',
  },
  img: {
    width: (Size.deviceWidth * 2) / 3,
    resizeMode: 'contain',
  },
});
