import { Modal } from '@ant-design/react-native';
import { AntDesign } from '@expo/vector-icons';
import _get from 'lodash/get';
import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import { Color } from '../constants';
import { useAuth } from '../containers/Auth';
import { Routes } from '../navigation';
import { Text } from '../themes';
import { Avatar } from './Avatar';

export const DrawerContent = ({ navigation }) => {
  const { currentUser, onLogout } = useAuth();
  const insets = useSafeArea();

  const logout = useCallback(() => {
    Modal.alert('Confirm', `Confirm to log out?`, [
      { text: 'No', onPress: () => false },
      { text: 'Yes', onPress: () => onLogout() },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Avatar email={_get(currentUser, 'email')} />
        <Text style={styles.name}>{_get(currentUser, 'firstName')}</Text>
        <TouchableOpacity
          style={[styles.btnEdit, { top: insets.top + 10 }]}
          onPress={() => navigation.navigate(Routes.Profile)}>
          <AntDesign size={20} name="edit" color={Color.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate(Routes.Home)}>
          <AntDesign size={20} name="home" color={Color.primary} />
          <Text style={styles.txtItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate(Routes.History)}>
          <AntDesign size={20} name="clockcircleo" color={Color.textColor} />
          <Text style={styles.txtItem}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate(Routes.Favourite)}>
          <AntDesign size={20} name="hearto" color={Color.error} />
          <Text style={styles.txtItem}>Favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate(Routes.About)}>
          <AntDesign size={20} name="questioncircleo" color={Color.warning} />
          <Text style={styles.txtItem}>About us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate(Routes.Feedback)}>
          <AntDesign size={20} name="questioncircleo" color={Color.success} />
          <Text style={styles.txtItem}>Feedback</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnLogout} onPress={logout}>
          <AntDesign size={20} name="logout" color={Color.primary} />
        </TouchableOpacity>
        <Text>Logout</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    marginBottom: 20,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: Color.primary,
  },
  btnEdit: {
    top: 20,
    right: 20,
    position: 'absolute',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: Color.gray,
  },
  name: {
    color: Color.white,
  },
  item: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  txtItem: {
    marginLeft: 10,
    fontWeight: '600',
  },
  footer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLogout: {
    width: 50,
    height: 50,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Color.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
