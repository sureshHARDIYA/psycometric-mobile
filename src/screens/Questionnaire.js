import { Modal } from '@ant-design/react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  Foundation,
  AntDesign,
} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import _get from 'lodash/get';
import sampleSize from 'lodash/sampleSize';
import React, { useState, useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { PlaceholderLine, Placeholder } from 'rn-placeholder';

import { Tag } from '../components';
import { Color, Questionnaire as Constant } from '../constants';
import { useSearch } from '../containers/QuestionList/useSearch';
import { useFavourite } from '../containers/QuestionnaireList/useFavourite';
import { Routes } from '../navigation';
import { Text, Button, Container, Input } from '../themes';

const Confirm = ({
  visible,
  questions,
  defaultValue,
  setVisible,
  navigation,
  id,
}) => {
  const [number, setNumber] = useState(defaultValue);

  return (
    <Modal
      transparent
      visible={visible}
      title="Practice Question"
      footer={[
        { text: 'Cancel', onPress: () => false },
        {
          text: 'Ok',
          onPress: () => {
            const size = Math.abs(number);
            if (size > 0 && size <= questions.length) {
              navigation.navigate(Routes.QuizPractice, {
                questions: sampleSize(questions, size),
                id,
              });
            } else {
              return Promise.reject(new Error(`${size} invalid number`));
            }
          },
        },
      ]}
      onClose={() => setVisible(false)}>
      <Text style={styles.subtitle}>
        How many questions do you want to practice?(maximum: {questions.length})
      </Text>
      <Input
        value={`${number}`}
        style={styles.input}
        keyboardType="number-pad"
        onChangeText={(text) => setNumber(text)}
      />
    </Modal>
  );
};

export const Questionnaire = () => {
  const { params } = useRoute();
  const { onFavourte } = useFavourite();
  const navigation = useNavigation();
  const { questionnaire, loading } = useSearch(params.id);
  const [more, setMore] = useState(false);
  const [visible, setVisible] = useState(false);

  const { description, name, level, questions, favourited, id } = useMemo(
    () => ({
      id: _get(questionnaire, 'id'),
      name: _get(questionnaire, 'name', ''),
      level: _get(questionnaire, 'level', ''),
      questions: _get(questionnaire, 'questions', []),
      favourited: _get(questionnaire, 'favourited', false),
      description: _get(questionnaire, 'description') || '',
    }),
    [questionnaire]
  );

  const number = Constant.LEVEL.indexOf(level) + 1;
  const notReady = !questionnaire || loading;
  const disabled = notReady || !questions.length;
  const defaultValue =
    questions.length > 15 ? 15 : Math.ceil(questions.length / 2);

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
            <Text style={styles.title}>{name}</Text>
          )}
          <View style={[styles.meta, styles.row]}>
            <View style={{ flex: 1 }}>
              {notReady ? (
                <PlaceholderLine width={40} />
              ) : (
                <View style={styles.row}>
                  <Tag
                    title={level}
                    type={number}
                    onPress={() =>
                      navigation.push(Routes.QuestionnaireLevel, { level })
                    }
                  />
                  {!!questionnaire.author && (
                    <TouchableOpacity
                      style={styles.author}
                      onPress={() =>
                        navigation.push(Routes.Author, {
                          id: questionnaire.author.id,
                        })
                      }>
                      <AntDesign
                        name="user"
                        style={styles.favourite}
                        color={Color.textColor}
                      />
                      <Text style={styles.authorText}>
                        {questionnaire.author.firstName}
                      </Text>
                    </TouchableOpacity>
                  )}
                  {!!questionnaire.category && (
                    <Tag
                      title={questionnaire.category.name}
                      type={6}
                      onPress={() =>
                        navigation.push(Routes.Category, questionnaire.category)
                      }
                    />
                  )}
                </View>
              )}
            </View>
            <Button
              disabled={disabled}
              style={[styles.favourite, favourited && styles.favourited]}
              onPress={() => onFavourte(id)}>
              <Ionicons
                name="ios-heart"
                color={favourited ? Color.danger : Color.gray}
              />
            </Button>
          </View>
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
          onPress={() => setVisible(true)}>
          <MaterialCommunityIcons
            size={20}
            name="incognito"
            color={Color.white}
          />
          {`  Practice`}
        </Button>
        <Button
          type="danger"
          disabled={disabled}
          style={styles.btnFooter}
          textStyle={{ fontWeight: '600' }}
          onPress={() =>
            navigation.navigate(Routes.QuizTest, { questions, id })
          }>
          <Foundation size={20} name="clipboard-pencil" color={Color.white} />
          {`  Take a test`}
        </Button>
      </View>
      {defaultValue > 0 && (
        <Confirm
          id={id}
          visible={visible}
          questions={questions}
          navigation={navigation}
          setVisible={setVisible}
          defaultValue={defaultValue}
        />
      )}
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
    marginTop: 20,
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
