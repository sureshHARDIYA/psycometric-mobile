import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { PlaceholderLine, Placeholder } from 'rn-placeholder';

import { Color, Layout } from '../constants';
import { Routes } from '../navigation';
import { Text } from '../themes';

export const Item = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={[styles.item, styles.shadow]}
      onPress={() => navigation.push(Routes.Questionnaire, { id: item.id })}>
      <Ionicons
        name="ios-heart"
        style={styles.favourite}
        color={item.favourited ? Color.danger : Color.gray}
      />
      <Text style={styles.itemTitle}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export const QuestionnaireList = ({
  data,
  hide,
  loading,
  onRefresh,
  handleLoadMore,
}) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      style={styles.container}
      renderItem={(rs) => <Item {...rs} navigation={navigation} hide={hide} />}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
      ListEmptyComponent={() => (
        <View
          style={[styles.item, styles.shadow, { justifyContent: 'center' }]}>
          <Text>No Questionnaire</Text>
        </View>
      )}
      ListFooterComponent={() => (
        <View style={styles.footer}>
          {loading && (
            <>
              <View style={[styles.item, styles.shadow]}>
                <Placeholder>
                  <PlaceholderLine width={80} />
                  <PlaceholderLine width={40} />
                  <PlaceholderLine />
                </Placeholder>
              </View>
              <View style={[styles.item, styles.shadow]}>
                <Placeholder>
                  <PlaceholderLine width={80} />
                  <PlaceholderLine width={40} />
                  <PlaceholderLine />
                </Placeholder>
              </View>
            </>
          )}
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      onEndReachedThreshold={0.4}
      onEndReached={handleLoadMore}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  item: {
    flex: 1,
    margin: 2,
    padding: 20,
    marginBottom: 20,
    borderRadius: 6,
    flexDirection: Layout.row,
    alignItems: Layout.center,
    backgroundColor: Color.white,
  },
  row: {
    flexDirection: Layout.row,
  },
  favourite: {
    marginRight: 10,
    alignSelf: Layout.center,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.13,

    elevation: 3,
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
  itemLeft: {
    flex: 1,
    paddingRight: 20,
    flexDirection: 'row',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  caption: {
    padding: 3,
    fontSize: 10,
  },
  footer: {
    marginBottom: 20,
  },
  btnRight: {
    width: 50,
    height: 50,
    marginRight: -10,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: {
    width: 25,
    height: 25,
    padding: 0,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Color.primary,
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
