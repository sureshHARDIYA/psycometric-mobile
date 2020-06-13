import React, { Children, isValidElement } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Size, Color, Layout } from '../constants';
import Text from './Text';

export default ({
  semi,
  style,
  height,
  children,
  textStyle,
  disabled,
  type: typeInit = 'default',
  ...props
}) => {
  const types = {
    primary: {
      borderColor: Color.primary,
      backgroundColor: Color.primary,
    },
    warning: {
      borderColor: Color.warning,
      backgroundColor: Color.warning,
    },
    info: {
      borderColor: Color.info,
      backgroundColor: Color.info,
    },
    danger: {
      borderColor: Color.danger,
      backgroundColor: Color.danger,
    },
    success: {
      borderColor: Color.success,
      backgroundColor: Color.success,
    },
    transparent: {
      borderColor: Color.transparent,
      backgroundColor: Color.transparent,
    },
  };

  const type = Object.keys(types).includes(typeInit) ? typeInit : 'default';

  const theme = {
    height: height || 36,
    flexDirection: Layout.row,
    aliginItems: Layout.center,
    justifyContent: Layout.center,
    paddingTop: Size.btnPadding,
    paddingBottom: Size.btnPadding,
    paddingLeft: Size.btnPadding * 2,
    paddingRight: Size.btnPadding * 2,
    borderWidth: Size.btnBorder,
    borderColor: Color.btnBorder,
    borderRadius: Size.btnRadius,
    ...(types[type] || {}),
    opacity: disabled ? 0.5 : 1,
  };

  const textTheme = {
    color: Color.white,
    ...({
      default: {
        color: Color.gray,
      },
    }[type] || {}),
    fontWeight: semi ? '600' : '400',
    alignSelf: Layout.center,
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      {...props}
      style={StyleSheet.flatten([theme, style])}>
      {Children.map(children, (child) => {
        if (typeof child === 'string') {
          return <Text style={[textTheme, textStyle]}>{child}</Text>;
        }

        if (isValidElement(child)) {
          return child;
        }

        return null;
      })}
    </TouchableOpacity>
  );
};
