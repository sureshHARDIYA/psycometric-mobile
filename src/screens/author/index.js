import {
  Ionicons,
} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import _get from 'lodash/get';
import React, { useState, useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { PlaceholderLine, Placeholder } from 'rn-placeholder';
import { Color } from '../../constants';
import { useSearch } from './useSearch';
import { Text, Container } from '../../themes';
import { QuestionnaireList, Avatar } from '../../components';

export const Author = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { author, loading, onRefresh, handleLoadMore } = useSearch(params.id);

  const { questionnaires } = useMemo(
    () => ({
      id: _get(author, 'id'),
      questionnaires: _get(author, 'questionnaires.rows', []).map((q) => ({
        ...q,
        author: {
          id: author.id,
          name: author.name,
        }
      })),
    }),
    [author]
  );

  const notReady = !author || loading;

  return (
    <Container>
      <View style={styles.topbar}>
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
        {notReady ? (
          <Placeholder>
            <PlaceholderLine width={40} />
            <PlaceholderLine />
          </Placeholder>
        ) : (
          <View style={styles.header}>
            <Avatar email={author.email} />
            <Text style={styles.title}>
              {!!author.firstName && author.firstName} {!!author.lastName && author.lastName}
            </Text>
          </View>
        )}
      </View>
      <QuestionnaireList
        hide="author"
        loading={loading}
        data={questionnaires}
        onRefresh={onRefresh}
        handleLoadMore={() => handleLoadMore(_get(author, 'questionnaires.rows', []).length)}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  goBack: {
  },
  row: {
    flexDirection: 'row',
  },
  topbar: {
    padding: 20,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: '600',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: Color.gray,
  },
});
