
import React from 'react';
import _get from 'lodash/get';
import { StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Color, Layout, Images } from '../../constants';
import { Container, Text, HeaderMain } from '../../themes';
import { SearchBar } from '../../components/SearchBar';
import { useSearch } from './useSearch';
import { PlaceholderLine, Placeholder } from 'rn-placeholder';
import { Routes } from '../../navigation';
import { useNavigation } from '@react-navigation/native';

export const CategoryList = () => {
  const navigation = useNavigation();
  const { list, loading, error, onSearch, handleLoadMore, current } = useSearch();

  return (
    <Container backgroundColor={Color.background}>
      <HeaderMain />
      <SearchBar onSearch={onSearch} />
      <FlatList
        data={list}
        style={styles.list}
        renderItem={(rs) => <Item {...rs} navigation={navigation} />}
        ListEmptyComponent={() => !loading && (
          <View
            style={[styles.item, styles.shadow, { justifyContent: 'center' }]}
          >
            <Text>No Category</Text>
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
        onEndReachedThreshold={0.4}
        onEndReached={() => handleLoadMore(current)}
        keyExtractor={(item) => item.id.toString()}
      />
    </Container>
  );
};

const Item = ({ item, navigation }) => {
  const imageURL = _get(item, 'featuredImage.0.publicUrl')

  return (
    <View style={[styles.item, styles.shadow]}>
      <Image source={imageURL ? { uri: imageURL } : Images.NoImage} style={styles.image} />
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.navigate(Routes.Category, item)}>
          <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
        <View style={styles.caption}>
          {!!item.description && <Text style={styles.subtitle}>{item.description.substr(0, 100)}</Text>}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
    paddingTop: 0,
  },
  item: {
    flex: 1,
    padding: 15,
    marginBottom: 20,
    borderRadius: 6,
    flexDirection: Layout.row,
    backgroundColor: Color.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.13,

    elevation: 4
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderRadius: 10,
    resizeMode: 'contain',
    borderColor: Color.white
  },
  content: {
    flex: 1,
    paddingLeft: 15,
  },
  caption: {
    flex: 1,
  },
  subtitle: {
    color: Color.gray
  },
  itemFooter: {
    flexDirection: Layout.row,
  }
});
