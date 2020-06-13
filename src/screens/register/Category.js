import React, { useEffect, useMemo, useCallback } from 'react';
import { Container, Topbar, Checkbox, Text, Button } from '../../themes';
import { useFormContext, Controller } from "react-hook-form";
import { useCategory } from '../profile/useCategory';
import { ScrollView } from 'react-native-gesture-handler';
import { List } from '@ant-design/react-native';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

export const Category = ({ navigation}) => {
  const { control, watch } = useFormContext();
  const ids = useMemo(() => watch('intrestedCategories') || [], [watch('intrestedCategories')]);

  const onSubmit = useCallback(() => {
    navigation.navigate('Register', { screen: 'Step2', params: { ids } })
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Topbar.Right
          actions={{
            onPress: onSubmit,
            text: ids.length > 0 ? `Next(${ids.length})` : 'Skip',
          }}
        />
      ),
    })
  }, [ids]);

  const { list, loading } = useCategory({ limit: 1000 });

  return (
    <Container>
      <Topbar.Title
        title="Which categories are you interested in?"
      />
      <ScrollView style={{ marginTop: 20 }}>
        <List>
          {!list.length && (
            <List.Item>
              <View style={styles.empty}>
                {!loading ? (
                  <>
                    <Text>No Category</Text>
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
        </List>
        <Controller
          control={control}
          name="intrestedCategories"
          as={
            <Checkbox>
              {[...list].map((item) => <Checkbox.Item value={item.id} key={item.id}>{item.name}</Checkbox.Item>)}
            </Checkbox>
          }
        />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  empty: {
    marginTop: 50,
    marginBottom: 50,
    alignItems: 'center',
  }
});
