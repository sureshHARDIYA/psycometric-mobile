import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Text } from 'react-native';

import Colors from '../constants/Colors';

export const TabBarIcon = (props) => (
  <Ionicons
    name={props.name}
    size={props.size || 20}
    style={{ marginBottom: -3 }}
    color={
      props.focused
        ? props.activeColor || Colors.tabIconSelected
        : Colors.tabIconDefault
    }
  />
);

export const TabBarLabel = (props) => (
  <Text
    style={{
      color: props.focused
        ? props.activeColor || Colors.tabIconSelected
        : Colors.tabIconDefault,
    }}>
    {props.title}
  </Text>
);
