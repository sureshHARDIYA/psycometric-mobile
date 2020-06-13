import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import { Color, Layout } from '../constants';
import { Text } from '../themes';

export const Item = ({ index }) => {
  return (
    <View style={[styles.item, styles.shadow]}>
      <View style={styles.addon}>
        <Text style={styles.captionAddon}>{index}</Text>
      </View>
      <View style={[styles.itemLeft]}>
        <Text style={styles.itemTitle}>
          Item {index + 1} Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Pellentesque lobortis ante non libero viverra,
        </Text>
      </View>
    </View>
  );
};

export const QuestionList = ({ title, ...props }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      style={styles.container}
      data={[...Array(10).keys()]}
      ListHeaderComponent={() => <Text style={styles.header}>{title}</Text>}
      ListFooterComponent={() => <View style={styles.footer} />}
      renderItem={(rs) => <Item {...rs} navigation={navigation} />}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Color.white,
  },
  item: {
    flex: 1,
    padding: 15,
    marginTop: 20,
    borderRadius: 6,
    flexDirection: Layout.row,
    alignItems: Layout.center,
    backgroundColor: Color.white,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
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
    backgroundColor: 'rgba(210, 241, 255, 0.5)',
  },
  captionAddon: {
    margin: 5,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 5,
    color: Color.secondary,
    fontWeight: '600',
  },
  itemLeft: {
    flex: 1,
    paddingLeft: 20,
  },
  itemTitle: {
    fontSize: 16,
  },
  caption: {
    padding: 3,
    fontSize: 10,
  },
});
