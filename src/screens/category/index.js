import {
  Ionicons,
} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import _get from 'lodash/get';
import React, { useState, useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { PlaceholderLine, Placeholder } from 'rn-placeholder';
import { Color } from '../../constants';
import { useSearch } from './useSearch';
import {Container, Text } from '../../themes';
import { QuestionnaireList } from '../../components';

export const Category = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { category, loading } = useSearch(params.id);
  const [more, setMore] = useState(false);

  const { description, name, questionnaires } = useMemo(
    () => ({
      id: _get(category, 'id'),
      name: _get(category, 'name', ''),
      description: _get(category, 'description') || '',
      questionnaires: _get(category, 'questionnaires', []).map((q) => ({
        ...q,
        category: {
          id: category.id,
          name: category.name,
        }
      })),
    }),
    [category]
  );

  const notReady = !category || loading;

  return (
    <Container>
      <View style={styles.header}>
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
          <Text style={styles.title}>{name}</Text>
        )}
      </View>
      <ScrollView>
        {notReady ? (
          <>
            <PlaceholderLine width={50} />
            <PlaceholderLine width={50} />
            <PlaceholderLine />
            <PlaceholderLine />
            <PlaceholderLine width={70} />
          </>
        ) : (
          <View style={styles.content}>
            <Text style={styles.description}>
              {description.substring(0, !more ? 200 : undefined)}
              {description.length > 200 && more && (
                <Text style={styles.more} onPress={() => setMore(false)}>
                  {`  see less`}
                </Text>
              )}
              {description.length > 200 && !more && (
                <Text style={styles.more} onPress={() => setMore(true)}>
                  ...see more
                </Text>
              )}
            </Text>
          </View>
        )}
        <QuestionnaireList
          hide="category"
          data={questionnaires}
        />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  goBack: {
    // marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  header: {
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
  description: {
    marginTop: 10,
    lineHeight: 20,
  },
  more: {
    fontWeight: '600',
  },
});
