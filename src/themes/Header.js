import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native';

import { Color, Layout, Size } from '../constants';
import Text from './Text';

const Header = ({ style, shadow = true, children, ...props }) => {
  const theme = {
    padding: 10,
    paddingTop: 5,
    height: Size.header,
    flexDirection: Layout.row,
    alignItems: Layout.center,
    backgroundColor: Color.white,
    borderBottomColor: Color.gray,
    ...Platform.select({
      // ios: {
      //   paddingTop: 20,
      // },
    }),
    ...(shadow
      ? {
          zIndex: 2,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowRadius: 2,
          shadowOpacity: 0.13,
          elevation: 3,
        }
      : {}),
  };

  return <View style={StyleSheet.flatten([theme, style])}>{children}</View>;
};

export const HeaderMain = ({ left, right, children }) => (
  <Header>
    {left ? (
      left
    ) : (
      <Text style={styles.logo}>
        P<Text style={styles.subtitle}>sychometric</Text>
      </Text>
    )}
    {children}
    <View style={styles.right}>{!!right && right}</View>
  </Header>
);

Header.Back = ({ navigation }) => (
  <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
    <Ionicons
      size={30}
      name="ios-arrow-dropleft"
      color={Color.textColor}
      style={styles.icon}
    />
  </TouchableOpacity>
);

Header.Menu = () => {
  return (
    <TouchableOpacity>
      <Ionicons
        size={30}
        name="ios-arrow-dropleft"
        color={Color.black}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

Header.Title = ({ children }) => <Text style={styles.title}>{children}</Text>;

const styles = StyleSheet.create({
  logo: {
    paddingLeft: 5,
    fontSize: 36,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 18,
  },
  right: {
    flex: 1,
    paddingRight: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  goBack: {
    zIndex: 2,
  },
  title: {
    flex: 1,
    fontSize: 24,
    marginLeft: -30,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Header;
