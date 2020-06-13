import React, { useState } from 'react';
import { useSearch } from './useSearch';
import { QuestionnaireList as List } from '../../components';
import { View, StyleSheet } from 'react-native';
import { Text, Input } from '../../themes';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const SearchBar = ({ onSearchName }) => {
  const [text, setText] = useState(null);
  return (
    <View style={styles.filter}>
      <Text style={styles.filterText}>Search questionnaire</Text>
      <Input
        light
        value={text}
        returnKeyType="go"
        style={styles.input}
        placeholder="Search here"
        placeholderTextColor={Color.white}
        onChangeText={(v) => setText(v)}
        onSubmitEditing={(e) => onSearchName(text)}
        Icon={
          <TouchableOpacity onPress={() => onSearchName(text)}>
            <Ionicons
              size={30}
              style={styles.icon}
              name="md-search"
              color={Color.white}
            />
          </TouchableOpacity>
        }
      />
    </View>
  )
}

export const QuestionnaireList = ({ level, search = true, ...props }) => {
  const { list, loading, onRefresh, handleLoadMore, current, onSearchName } = useSearch({ level });

  return (
    <View style={styles.container}>
      {search && <SearchBar onSearchName={onSearchName} styles={styles} />}
      <List {...props} data={list} loading={loading} onRefresh={onRefresh} handleLoadMore={() => handleLoadMore(current + 1)}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  filterText: {
    color: Color.white,
  },
  filter: {
    margin: 15,
    padding: 20,
    borderRadius: 10,
    backgroundColor: Color.primary,
  },
  input: {
    marginTop: 10,
  },
});
