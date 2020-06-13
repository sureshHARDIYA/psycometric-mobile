import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Color } from '../constants';
import { Input } from '../themes';

export const SearchBar = ({ onSearch }) => {
  const [text, setText] = useState(null);

  return (
    <View style={styles.filter}>
      <Input
        style={styles.input}
        placeholder="Search here"
        placeholderTextColor={Color.gray}
        Icon={
          <TouchableOpacity onPress={() => onSearch && onSearch(text)}>
            <Ionicons
              size={30}
              style={styles.icon}
              name="md-search"
              color={Color.gray}
            />
          </TouchableOpacity>
        }
        onChangeText={(v) => setText(v)}
        onSubmitEditing={() => onSearch && onSearch(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filter: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Color.background,
  },
  input: {
    marginTop: 10,
    borderRadius: 10,
    color: Color.primary,
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 2,
    shadowOpacity: 0.13,

    elevation: 3,
  },
});
