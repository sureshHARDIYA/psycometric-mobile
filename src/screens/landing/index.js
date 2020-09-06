import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container, Button, Text } from '../../themes';
import { Images, Size, Color } from '../../constants';
import { Routes } from '../../navigation';

export const Landing = ({ navigation }) => (
  <Container>
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={Images.logo} style={[styles.img]} />
      </View>
      <Text style={styles.text}>Don’t have an account?</Text>
      <Button
        type="primary"
        style={styles.btn}
        onPress={() => navigation.navigate(Routes.Register)}>
        Register
      </Button>
    </View>
    <View style={styles.footer}>
      <Text style={styles.footerText}>Have an account?</Text>
      <TouchableOpacity onPress={() => navigation.replace(Routes.Login)}>
        <Text style={styles.highlight}>{` Login`}</Text>
      </TouchableOpacity>
    </View>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginTop: -100,
    alignSelf: 'center',
  },
  img: {
    width: (Size.deviceWidth * 2) / 3,
    resizeMode: 'contain',
  },
  text: {
    margin: 5,
  },
  btn: {
    width: 200,
  },
  footer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlight: {
    color: Color.primary,
  },
});
