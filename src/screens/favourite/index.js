import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { Color } from '../../constants';
import { QuestionnaireList } from '../../components';
import { Header, Container, Text, Input } from '../../themes';
import { useSearch } from './useSearch';

export const SearchBar = ({ onSearchName }) => {
  const [text, setText] = useState(null);

  return (
    <View style={styles.filter}>
      <Input
        style={styles.input}
        placeholder="Search here"
        onChangeText={(v) => setText(v)}
        placeholderTextColor={Color.gray}
        onSubmitEditing={() => onSearchName(text)}
        Icon={
          <TouchableOpacity onPress={() => onSearchName(text)}>
            <Ionicons
              size={30}
              style={styles.icon}
              name="md-search"
              color={Color.primary}
            />
          </TouchableOpacity>
        }
      />
    </View>
  )
}

export const Favourite = ({ navigation }) => {
  const { list, loading, onRefresh, handleLoadMore, current, onSearchName } = useSearch();

  return (
    <Container>
      <View style={styles.container}>
        <Header style={styles.header}>
          <TouchableOpacity
            style={styles.goBack}
            onPress={() => navigation.goBack()}>
            <Ionicons
              size={30}
              name="ios-arrow-dropleft"
              color={Color.textColor}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Favourites</Text>
        </Header>
        <SearchBar onSearchName={onSearchName} />
        <QuestionnaireList
          data={list} loading={loading} onRefresh={onRefresh} handleLoadMore={() => handleLoadMore(current + 1)}
        />
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  logo: {
    padding: 5,
    fontSize: 36,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  title: {
    flex: 1,
    fontSize: 24,
    marginLeft: -30,
    fontWeight: '600',
    textAlign: 'center',
  },
  goBack: {
    zIndex: 2,
  },
  subtitle: {
    fontSize: 18,
  },
  filterTitle: {
    fontSize: 18,
    color: Color.white,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  filterText: {
    color: Color.white,
  },
  filter: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Color.background
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    color: Color.primary,
    borderColor: Color.primary,
    backgroundColor: Color.white,
  },
});
