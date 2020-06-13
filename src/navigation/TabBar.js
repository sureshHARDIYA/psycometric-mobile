import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { TabBarIcon } from '../components/TabBar';
import { Color } from '../constants';

export const TabBar = ({ state, descriptors, navigation }) => (
  <View style={styles.container}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

      const BarIcon = options.tabBarIcon;

      return (
        <>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            style={styles.btn}
            onPress={onPress}>
            <BarIcon focused={isFocused} />
          </TouchableOpacity>
          {index === state.routes.length - 1 && (
            <TouchableOpacity
              accessibilityRole="button"
              testID={options.tabBarTestID}
              style={styles.btn}
              onPress={() => navigation.openDrawer()}>
              <TabBarIcon size={30} name="ios-menu" />
            </TouchableOpacity>
          )}
        </>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Color.white,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowRadius: 2,
    shadowOpacity: 0.13,
    elevation: 3,
  },
  btn: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
