import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { Font, Color } from '../constants';

export default ({ style, type, ...props }) => {
  const types = {
    info: Color.info,
    danger: Color.danger,
    warning: Color.warning,
    success: Color.success,
    primary: Color.primary,
  };

  const theme = {
    fontSize: Font.fontSize,
    fontFamily: Font.fontFamily,
    backgroundColor: 'transparent',
    color: types[type] || Color.textColor,
  };

  return <Text style={StyleSheet.flatten([theme, style])} {...props} />;
};
