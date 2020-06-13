import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';

import { Size, Color } from '../constants';

export default ({ style, children, backgroundColor, ...props }) => {
  const theme = {
    flex: 1,
    width: Size.deviceWidth,
    backgroundColor: Color.white,
  };

  const contentStyle = StyleSheet.flatten([
    {
      flex: 1,
      backgroundColor,
    },
    style,
  ]);

  return (
    <SafeAreaView style={theme} {...props}>
      <View style={contentStyle}>{children}</View>
    </SafeAreaView>
  );
};
