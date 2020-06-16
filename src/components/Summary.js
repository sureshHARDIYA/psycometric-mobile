import { Modal } from '@ant-design/react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useSafeArea } from 'react-native-safe-area-context';

import { Color, Layout, Size } from '../constants';
import { Text, Header } from '../themes';

export const Item = ({ item }) => (
  <View style={[styles.item, styles.shadow]}>
    <View style={styles.addon} />
    <View style={[styles.itemLeft]}>
      <Markdown style={{ body: styles.itemTitle }}>{item.title}</Markdown>
    </View>
    <View style={styles.answerList}>
      <View style={styles.answerItem} key={item.answered.id}>
        {['PICTURE'].includes(item.answered.type) ? (
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: item.answered.title }}
          />
        ) : (
          <Markdown style={{ body: styles.answerText }}>
            {item.answered.title}
          </Markdown>
        )}
      </View>
    </View>
  </View>
);

export const Summary = ({ title, setVisible, questions, ...props }) => {
  const insets = useSafeArea();

  return (
    <Modal
      closable
      maskClosable
      // popup
      title={title}
      transparent={false}
      onClose={() => setVisible(false)}
      {...props}>
      <>
        <Header style={styles.header}>
          <TouchableOpacity
            style={styles.goBack}
            onPress={() => setVisible(false)}>
            <Ionicons
              size={30}
              style={styles.icon}
              name="ios-arrow-dropleft"
              color={Color.textColor}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>{title}</Text>
        </Header>
        <FlatList
          style={styles.container}
          data={questions}
          ListFooterComponent={() => (
            <View
              style={[styles.footer, { paddingBottom: insets.bottom + 30 }]}
            />
          )}
          renderItem={({ item, index }) => <Item item={item} index={index} />}
        />
      </>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Size.deviceHeight,
    backgroundColor: Color.white,
  },
  item: {
    flex: 1,
    padding: 15,
    margin: 20,
    borderRadius: 6,
    backgroundColor: Color.white,
  },
  header: {
    alignItems: 'center',
    ...Platform.select({
      ios: {
        marginTop: 30,
      },
    }),
  },
  answerText: {
    fontSize: 14,
    color: Color.textColor,
  },
  answerItem: {
    // paddingBottom: 5,
    // borderBottomWidth: 1,
    // borderBottomColor: Color.gray
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
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
    top: -20,
    right: -30,
    width: 40,
    height: 40,
    flexShrink: 0,
    borderRadius: 20,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(210, 241, 255, 0.5)',
  },
  captionAddon: {
    margin: 5,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 5,
    color: Color.secondary,
    fontWeight: '600',
  },
  itemLeft: {},
  itemTitle: {
    fontSize: 16,
  },
  caption: {
    padding: 3,
    fontSize: 10,
  },
  footer: {
    marginBottom: 50,
  },
  correct: {
    borderWidth: 1,
    borderColor: Color.success,
  },
  incorrect: {
    borderWidth: 1,
    borderColor: Color.error,
  },
});
