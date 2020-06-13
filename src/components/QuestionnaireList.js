import { Entypo, Ionicons, AntDesign } from '@expo/vector-icons';
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

import { Color, Layout, Questionnaire as Constant } from '../constants';
import { Routes } from '../navigation';
import { Text } from '../themes';
import { Tag } from './Tag';

export const Item = ({ hide, item, navigation }) => {
  const author = item.createdBy || {};
  const number = Constant.LEVEL.indexOf(item.level) + 1;

  return (
    <View style={[styles.item, styles.shadow]}>
      <View style={[styles.itemLeft]}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <View style={[styles.row, { flexWrap: 'wrap' }]}>
          <Ionicons
            name="ios-heart"
            style={styles.favourite}
            color={item.favourited ? Color.danger : Color.gray}
          />
          {hide !== 'level' && (
            <Tag
              title={item.level}
              type={number}
              onPress={() =>
                navigation.push(Routes.QuestionnaireLevel, {
                  level: item.level,
                })
              }
            />
          )}
          {hide !== 'author' && author.firstName && (
            <TouchableOpacity
              style={styles.author}
              onPress={() =>
                navigation.push(Routes.Author, {
                  id: author.id,
                })
              }>
              <AntDesign
                name="user"
                style={styles.favourite}
                color={Color.textColor}
              />
              <Text style={styles.authorText}>{author.firstName}</Text>
            </TouchableOpacity>
          )}
          {hide !== 'category' && !!item.category && (
            <Tag
              title={item.category.name}
              type={6}
              onPress={() => navigation.push(Routes.Category, item.category)}
            />
          )}
        </View>
      </View>
      <TouchableOpacity
        type="transparent"
        style={styles.btnRight}
        onPress={() => navigation.push(Routes.Questionnaire, { id: item.id })}>
        <View style={styles.rightIcon}>
          <Entypo size={20} color={Color.primary} name="chevron-right" />
        </View>
      </TouchableOpacity>
    </View>
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
    padding: 15,
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
