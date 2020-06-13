import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

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
      borderWidth: 1,
      position: 'relative',
      height: height || Size.input,
      fontFamily: Font.fontFamily,
      flexDirection: Layout.row,
      borderRadius: Size.inputRadius,
      borderColor: light ? Color.white : Color.inputBorder,
      paddingRight: 25,
    };

    const item = {
      marginBottom: 15,
    };

    const input = {
      padding: 10,
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
          <TextInput
            ref={ref}
            placeholderTextColor={Color.inputPlacholder}
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
