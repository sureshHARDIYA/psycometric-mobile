import React from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Size, Layout } from '../constants';

export default ({ style, children, vertical = true, ...props }) => {
  const theme = {
    borderRadius: Size.formRadius,
    paddingTop: Size.formPadding,
    paddingLeft: Size.formPadding,
    paddingRight: Size.formPadding,
    paddingBottom: Size.formPadding,
    flexDirection: vertical ? Layout.column : Layout.row,
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      contentContainerStyle={StyleSheet.flatten([theme, style])}
      {...props}>
      {children}
    </KeyboardAwareScrollView>
  );
};
