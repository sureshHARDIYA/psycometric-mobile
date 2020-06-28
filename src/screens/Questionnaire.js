import { Ionicons, Foundation } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import _get from 'lodash/get';
import React, { useState, useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { PlaceholderLine, Placeholder } from 'rn-placeholder';

import { Color } from '../constants';
import { useSearch } from '../containers/QuestionList/useSearch';
import { useFavourite } from '../containers/QuestionnaireList/useFavourite';
import { Routes } from '../navigation';
import { Text, Button, Container } from '../themes';

export const Questionnaire = () => {
  const { params } = useRoute();
  const { onFavourte } = useFavourite();
  const navigation = useNavigation();
  const { questionnaire, loading } = useSearch(params.id);
  const [more, setMore] = useState(false);

  const {
    description,
    name,
    questions,
    favourited,
    answers,
    id,
    rules,
  } = useMemo(
    () => ({
      id: _get(questionnaire, 'id'),
      name: _get(questionnaire, 'name', ''),
      answers: _get(questionnaire, 'answers', []),
      rules: _get(questionnaire, 'rules', []),
      questions: _get(questionnaire, 'questions', []),
      favourited: _get(questionnaire, 'favourited', false),
      description: _get(questionnaire, 'description') || '',
    }),
    [questionnaire]
  );

  const notReady = !questionnaire || loading;
  const disabled = notReady || !questions.length || !answers.length;

  return (
    <Container>
      <ScrollView>
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
            <View style={[styles.meta, styles.row]}>
              <View style={{ flexGrow: 1, justifyContent: 'center' }}>
                <Text style={styles.title}>{name}</Text>
              </View>
              <Button
                disabled={notReady}
                style={[styles.favourite, favourited && styles.favourited]}
                onPress={() => onFavourte(id)}>
                <Ionicons
                  name="ios-heart"
                  color={favourited ? Color.danger : Color.gray}
                />
              </Button>
            </View>
          )}
          {notReady ? (
            <>
              <PlaceholderLine width={50} />
              <PlaceholderLine width={50} />
              <PlaceholderLine />
              <PlaceholderLine />
              <PlaceholderLine width={70} />
            </>
          ) : (
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
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          type="primary"
          disabled={disabled}
          style={styles.btnFooter}
          textStyle={{ fontWeight: '600' }}
          onPress={() =>
            navigation.navigate(Routes.QuizTest, {
              questions,
              answers,
              id,
              rules,
            })
          }>
          <Foundation size={20} name="clipboard-pencil" color={Color.white} />
          {`  Take a test`}
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  goBack: {
    // marginTop: 20,
  },
  row: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  footer: {
    flexDirection: 'row',
  },
  btnFooter: {
    height: 45,
    flexGrow: 1,
    borderRadius: 0,
    alignItems: 'center',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  meta: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  favourite: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  favourited: {
    borderColor: Color.danger,
  },
  description: {
    marginTop: 10,
    lineHeight: 20,
  },
  more: {
    fontWeight: '600',
  },
  addon: {
    width: 40,
    height: 40,
    flexShrink: 0,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captionAddon: {
    flexGrow: 0,
    margin: 5,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  caption: {
    padding: 3,
    fontSize: 10,
  },
  subtitle: {
    margin: 10,
    textAlign: 'center',
    color: Color.gray,
  },
  input: {
    height: 45,
    marginTop: 10,
  },
  author: {
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 7,
    paddingRight: 7,
  },
  authorText: {
    fontSize: 10,
    marginLeft: 5,
  },
});
