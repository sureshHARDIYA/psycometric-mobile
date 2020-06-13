import { Checkbox as Box, List } from '@ant-design/react-native';
import React, { Children, isValidElement, cloneElement } from 'react';
import { StyleSheet, View } from 'react-native';

import Label from './Text';

const Checkbox = ({
  style,
  label,
  error,
  labelStyle,
  errorStyle,
  children,
  value,
  disabled,
  onChange,
}) => {
  const item = {
    marginBottom: 15,
  };

  const labelDefault = {
    marginBottom: 10,
  };

  const errorDefault = {
    marginTop: 5,
  };

  const selected = Array.isArray(value) ? value : value ? [value] : [];

  return (
    <View style={StyleSheet.flatten([item, style])}>
      {!!label && (
        <Label style={StyleSheet.flatten([labelDefault, labelStyle])}>
          {label}
        </Label>
      )}
      <List>
        {Children.map(children, (child) => {
          if (!isValidElement(child)) {
            return child;
          }

          const current = child.props.value;
          const checked = selected.includes(current);
          const next = checked
            ? selected.filter((i) => i !== current)
            : [...selected, current];
          return cloneElement(child, {
            disabled,
            checked,
            onPress: () => onChange(next),
          });
        })}
      </List>
      {!!error && (
        <Label
          type="danger"
          style={StyleSheet.flatten([errorDefault, errorStyle])}>
          {error}
        </Label>
      )}
    </View>
  );
};

Checkbox.Item = ({ children, style, labelStyle, ...props }) => {
  const defaultStyle = {
    // paddingLeft: 0,
  };

  return (
    <Box.CheckboxItem
      {...props}
      style={StyleSheet.flatten([defaultStyle, style])}>
      <Label style={labelStyle}>{children}</Label>
    </Box.CheckboxItem>
  );
};

export default Checkbox;
