import { useNavigation } from '@react-navigation/native';
import React, { useRef, useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator as Spin,
  AsyncStorage,
} from 'react-native';
import { SimpleLineIcons, Feather } from '@expo/vector-icons';

import { Routes } from '../../navigation';
import { Color, Images, Size, Layout } from '../../constants';
import { Container, Button, Input, Form, Text } from '../../themes';
import { useLogin } from './useLogin';

export const Login = () => {
  const passwordRef = useRef(null);
  const navigation = useNavigation();
  const { control, handleSubmit, errors } = useForm();
  const { onLogin, loading, error } = useLogin();
  const onSubmitEditing = useCallback(() => passwordRef.current.focus(), []);
  const goRegister = useCallback(
    () => navigation.navigate(Routes.Register),
    []
  );

  useEffect(() => {
    AsyncStorage.setItem('@firstLoading', 'initiated');
  }, []);

  return (
    <Container>
      <View style={styles.form}>
        <Form
          enableOnAndroid
          extraHeight={150}
          extraScrollHeight={150}
          enableAutomaticScroll={Platform.OS === 'ios'}>
          <View style={styles.logo}>
            <Image source={Images.logo} style={[styles.img]} />
          </View>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Please enter an email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            }}
            defaultValue=""
            as={
              <Input
                label="Email*"
                editable={!loading}
                style={styles.input}
                returnKeyType="next"
                autoCapitalize="none"
                autoCompleteType="email"
                placeholder="name@example.com"
                textContentType="emailAddress"
                keyboardType="email-address"
                error={errors.email && errors.email.message}
                onSubmitEditing={onSubmitEditing}
              />
            }
            onChange={(args) => args[0].nativeEvent.text}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Please enter password',
              minLength: {
                value: 6,
                message: 'Password required to be more than 6',
              },
            }}
            defaultValue=""
            as={
              <Input
                secureTextEntry
                ref={passwordRef}
                editable={!loading}
                label="Password*"
                style={styles.input}
                returnKeyType="go"
                autoCompleteType="password"
                placeholder="********"
                blurOnSubmit={false}
                onSubmitEditing={handleSubmit(onLogin)}
                error={errors.password && errors.password.message}
              />
            }
            onChange={(args) => args[0].nativeEvent.text}
          />
          <Button
            semi
            height={40}
            type="primary"
            disabled={loading}
            style={styles.btnSubmit}
            onPress={handleSubmit(onLogin)}>
            {loading && (
              <Spin
                size="small"
                color={Color.white}
                style={{ marginTop: -5, marginRight: 10 }}
              />
            )}
            Login
          </Button>
          {!loading && !!error && <Text style={styles.error}>{error}</Text>}
        </Form>
        <View style={styles.footer}></View>
      </View>
      <View style={styles.footer}>
        <View style={styles.row}>
          <Text style={styles.footerText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={goRegister}>
            <Text style={styles.highlight}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.row, { justifyContent: 'center' }]}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate(Routes.Feedback)}>
          <Feather size={22} name="mail" color={Color.textColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate(Routes.About)}>
          <SimpleLineIcons size={20} name="question" color={Color.textColor} />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.danger,
  },
  about: {
    top: 40,
    right: 20,
    position: 'absolute',
  },
  img: {
    width: (Size.deviceWidth * 2) / 3,
    resizeMode: 'contain',
  },
  logo: {
    alignSelf: 'center',
  },
  form: {
    flex: 1,
    padding: 10,
  },
  error: {
    marginTop: 10,
    textAlign: 'center',
    color: Color.error,
  },
  highlight: {
    color: Color.primary,
  },
  btnSubmit: {
    marginTop: 40,
  },
  footerText: {
    padding: 5,
    textAlign: 'center',
  },
  row: {
    flexDirection: Layout.row,
    alignItems: Layout.center,
  },
  footer: {
    alignItems: Layout.center,
  },
  btn: {
    padding: 15,
    paddingTop: 5,
  },
});
