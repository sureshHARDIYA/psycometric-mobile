import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Font, Color, Layout, Size } from '../constants';
import Label from './Text';

export default React.forwardRef(
  (
    {
      style,
      label,
      error,
      labelStyle,
      errorStyle,
      inputStyle,
      light,
      height,
      Icon,
      ...props
    },
    ref
  ) => {
    const theme = {
      position: 'relative',
      height: height || Size.input,
      fontFamily: Font.fontFamily,
      flexDirection: Layout.row,
    };

    const item = {
      marginBottom: 15,
    };

    const input = {
      flexGrow: 1,
      color: light ? Color.white : Color.textColor,
    };

    const labelDefault = {
      marginBottom: 10,
    };

    const errorDefault = {
      marginTop: 5,
    };

    return (
      <View style={StyleSheet.flatten([item, style])}>
        {!!label && (
          <Label style={StyleSheet.flatten([labelDefault, labelStyle])}>
            {label}
          </Label>
        )}
        <View style={theme}>
          <DateTimePicker
            mode="time"
            display="clock"
            testID="dateTimePicker"
            style={StyleSheet.flatten([input, inputStyle])}
            {...props}
          />
          <View
            style={{
              right: 0,
              width: 30,
              flexShrink: 0,
              position: 'absolute',
              alignSelf: 'center',
            }}>
            {Icon}
          </View>
        </View>
        {!!error && (
          <Label
            type="danger"
            style={StyleSheet.flatten([errorDefault, errorStyle])}>
            {error}
          </Label>
        )}
      </View>
    );
  }
);
