import React, { useEffect, useCallback } from 'react';
import _get from 'lodash/get';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { Container, Topbar, Text, Button } from '../../themes';
import { useQuestionnaire } from './useQuestionnaire';
import { ScrollView } from 'react-native-gesture-handler';
import { List } from '@ant-design/react-native';
import { useRoute } from '@react-navigation/native';

export const Questionnaire = ({ navigation }) => {
  const onSubmit = useCallback(() => {
    navigation.navigate('Register', { screen: 'Step4' })
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Topbar.Right
          actions={{
            text: 'Skip',
            onPress: onSubmit
          }}
        />
      ),
    })
  }, [])

  const { params } = useRoute();
  const { list, loading } = useQuestionnaire({ categoryIds: _get(params, 'ids') });

  return (
    <Container>
      <Topbar.Title
        title="Questionnaire for preview quiz?"
      />
      <ScrollView style={styles.list}>
        <List>
          {!list.length && (
            <List.Item>
              <View style={styles.empty}>
                {!loading ? (
                  <>
                    <Text>No Questionnaire</Text>
                    <Button onPress={onSubmit} style={{ margin: 20 }} type="danger">Continue</Button>
                  </>
                ) : (
                  <>
                    <ActivityIndicator />
                    <Text>Fetching...</Text>
                  </>
                )}
              </View>
            </List.Item>
          )}
          {list.map((item) => (
            <List.Item
              style={styles.item}
              onPress={() => navigation.navigate('Register', { screen: 'Step3', params: item })}
            >
              <Text>{item.name}</Text>
            </List.Item>
          ))}
        </List>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },
  item: {
    paddingLeft: 20,
  },
  empty: {
    marginTop: 50,
    marginBottom: 50,
    alignItems: 'center',
  }
});
