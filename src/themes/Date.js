import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

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
      value,
      format = 'DD-MM-YYYY',
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const theme = {
      borderWidth: 1,
      padding: 10,
      paddingRight: 25,
      position: 'relative',
      alignItems: 'center',
      height: height || Size.input,
      fontFamily: Font.fontFamily,
      flexDirection: Layout.row,
      borderRadius: Size.inputRadius,
      borderColor: light ? Color.white : Color.inputBorder,
    };

    const [show, setShow] = useState(false);
    const [_value, setValue] = useState(value || defaultValue || new Date());

    const _onChange = useCallback((_, e) => {
      if (Platform.OS === 'android') {
        setShow(false);
        onChange(e);
      } else {
        setValue(e);
      }
    }, []);

    const onOkay = useCallback((v) => {
      onChange(v);
      setShow(false);
    }, []);

    useEffect(() => {
      setValue(value);
    }, [value]);

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
        <TouchableOpacity style={theme} onPress={() => setShow(true)}>
          <Text style={StyleSheet.flatten([input, inputStyle])}>
            {moment(value).format(format)}
          </Text>
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
        </TouchableOpacity>
        {!!error && (
          <Label
            type="danger"
            style={StyleSheet.flatten([errorDefault, errorStyle])}>
            {error}
          </Label>
        )}
        {show && (
          <View>
            {Platform.OS !== 'android' && (
              <View style={styles.header}>
                <TouchableOpacity
                  style={[styles.btn]}
                  onPress={() => setShow(false)}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn]}
                  onPress={() => onOkay(_value)}>
                  <Text>Ok</Text>
                </TouchableOpacity>
              </View>
            )}

            <DateTimePicker
              mode="time"
              display="clock"
              testID="dateTimePicker"
              value={moment(_value).toDate()}
              style={StyleSheet.flatten([input, inputStyle])}
              {...props}
              onChange={_onChange}
            />
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    width: 100,
    padding: 10,
    alignItems: 'center',
  },
});
