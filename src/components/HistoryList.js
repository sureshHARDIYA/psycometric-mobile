import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { FlatList, View, StyleSheet, RefreshControl } from 'react-native';
import { PlaceholderLine, PlaceholderMedia, Placeholder } from 'rn-placeholder';

import { Color, Layout } from '../constants';
import { Text } from '../themes';

export const Item = ({ item, index, max }) => {
  const createdAt = moment(item.createdAt);

  return (
    <View style={[styles.item]}>
      <View style={[styles.itemLeft]}>
        <View
          style={[
            styles.line,
            !index && styles.first,
            index === max && styles.last,
          ]}
        />
        <View style={[styles.circle, styles.shadow, styles.passed]}>
          <Text style={styles.time}>{createdAt.format('HH:mm')}</Text>
          <Text style={[styles.time, { fontSize: 10 }]}>
            {createdAt.format('DD')}/{createdAt.format('MMM')}
          </Text>
        </View>
      </View>
      <View style={[styles.itemRight, styles.shadow]}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={styles.row}>
          <View style={[styles.captionAddon]}>
            <Text style={styles.caption}>
              Score: {item.score} / {item.total}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const HistoryList = ({ list, onRefresh, loading, handleLoadMore }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={list}
      style={styles.container}
      renderItem={(rs) => (
        <Item {...rs} navigation={navigation} max={list.length - 1} />
      )}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
      ListEmptyComponent={() => (
        <View style={[styles.itemRight, styles.shadow]}>
          <Text style={{ textAlign: 'center' }}>No History</Text>
        </View>
      )}
      ListFooterComponent={() => (
        <View style={styles.footer}>
          {loading && (
            <>
              <View style={[styles.itemRight, styles.shadow]}>
                <Placeholder Left={PlaceholderMedia}>
                  <PlaceholderLine width={80} />
                  <PlaceholderLine width={40} />
                  <PlaceholderLine />
                </Placeholder>
              </View>
              <View style={[styles.itemRight, styles.shadow]}>
                <Placeholder Left={PlaceholderMedia}>
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
    backgroundColor: Color.background,
  },
  header: {
    margin: 20,
    marginTop: 0,
    alignItems: 'center',
  },
  item: {
    flex: 1,
    flexDirection: Layout.row,
    alignItems: Layout.center,
  },
  time: {
    padding: 2,
    fontSize: 10,
    fontWeight: '600',
  },
  line: {
    top: 0,
    width: 2,
    bottom: 0,
    left: 30,
    position: 'absolute',
    backgroundColor: Color.gray,
  },
  first: {
    top: '50%',
  },
  last: {
    bottom: '50%',
  },
  itemLeft: {
    width: 80,
    height: '100%',
    position: 'relative',
  },
  circle: {
    width: 60,
    height: 60,
    marginTop: 10,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Color.danger,
    backgroundColor: '#fafafa',
  },
  passed: {
    borderColor: Color.success,
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
    margin: 5,
    flexGrow: 0,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 4,
    marginLeft: 0,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Color.success,
  },
  itemRight: {
    flex: 1,
    padding: 15,
    marginBottom: 20,
    paddingRight: 20,
    borderRadius: 6,
    backgroundColor: Color.white,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  caption: {
    padding: 3,
    fontSize: 10,
    color: Color.white,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    marginBottom: 20,
  },
  rightIcon: {
    width: 25,
    height: 25,
    borderRadius: 4,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Color.primary,
  },
  group4BG: {
    backgroundColor: Color.textColor,
  },
});
