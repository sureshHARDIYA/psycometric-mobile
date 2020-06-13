import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { Color } from '../constants';
import { QuestionnaireList } from '../containers';
import { Header, Text, Container } from '../themes';

export const QuestionnaireLevel = () => {
  const { params } = useRoute();
  const navigation = useNavigation();

  return (
    <Container>
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
        <Text style={styles.headerText}>{params.level}</Text>
        <View />
      </Header>
      <QuestionnaireList styles={styles} level={params.level} hide="level" />
    </Container>
  );
};

const styles = StyleSheet.create({
  goBack: {
    zIndex: 2,
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    marginLeft: -30,
    fontWeight: '600',
    textAlign: 'center',
  },
  logo: {
    padding: 5,
    fontSize: 36,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 18,
  },
  right: {
    flex: 1,
    paddingRight: 10,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'center',
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
    margin: 15,
    padding: 20,
    borderRadius: 10,
    backgroundColor: Color.primary,
  },
  input: {
    marginTop: 10,
  },
});
