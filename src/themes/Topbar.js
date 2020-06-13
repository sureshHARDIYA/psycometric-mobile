import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { isValidElement } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Placeholder, PlaceholderLine } from 'rn-placeholder';

import { Text } from '.';
import { Color } from '../constants';

const Back = ({ style, goBack }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.btn, style])}
      onPress={() => goBack || navigation.goBack()}>
      <Ionicons
        size={30}
        name="ios-arrow-dropleft"
        color={Color.textColor}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const Title = ({ style, title }) => {
  if (typeof title === 'undefined') {
    return <View />;
  }

  return (
    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
      {!title ? (
        <Placeholder>
          <PlaceholderLine width={40} />
          <PlaceholderLine />
        </Placeholder>
      ) : isValidElement(title) ? (
        title
      ) : (
        <Text style={StyleSheet.flatten([styles.title, style])}>{title}</Text>
      )}
    </View>
  );
};

const Right = ({ style, actions }) => (
  <View style={StyleSheet.flatten([styles.right, style])}>
    {!!actions &&
      (Array.isArray(actions) ? actions : [actions]).map((item) => {
        if (isValidElement(item)) {
          return item;
        }

        if (item.text && item.onPress) {
          return (
            <TouchableOpacity key={item} onPress={item.onPress}>
              <Text>{item.text}</Text>
            </TouchableOpacity>
          );
        }

        return null;
      })}
  </View>
);

export const Topbar = ({ title, actions, goBack }) => (
  <View style={styles.topbar}>
    <View style={styles.top}>
      <Back goBack={goBack} />
      <Right actions={actions} />
    </View>
    <Title title={title} />
  </View>
);

Topbar.Back = Back;
Topbar.Title = Title;
Topbar.Right = Right;

const styles = StyleSheet.create({
  topbar: {},
  top: {
    flexDirection: 'row',
  },
  btn: {
    padding: 20,
    alignSelf: 'flex-start',
    backgroundColor: Color.transparent,
  },
  title: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: '600',
  },
  right: {
    flex: 1,
    paddingRight: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
