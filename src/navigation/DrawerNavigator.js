import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { DrawerContent } from '../components';
import { AuthNavigator } from './AuthNavigator';
import { Routes } from './Routes';

const Drawer = createDrawerNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export const DrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName={INITIAL_ROUTE_NAME}
    drawerContent={(props) => <DrawerContent {...props} />}>
    <Drawer.Screen
      name={Routes.Root}
      component={AuthNavigator}
      options={{ header: () => null }}
    />
  </Drawer.Navigator>
);
