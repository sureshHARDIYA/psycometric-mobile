import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import { TabBarIcon } from '../components/TabBar';
import Colors from '../constants/Colors';
import * as Screens from '../screens';
import { TabBar } from './TabBar';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator() {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  // navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBar={(props) => <TabBar {...props} />}>
      <BottomTab.Screen
        name="CategoryList"
        component={Screens.CategoryList}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="md-bookmarks"
              focused={focused}
              activeColor={Colors.danger}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={Screens.Home}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon size={30} focused={focused} name="ios-home" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
