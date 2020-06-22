import React, { useRef, useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, View, Image, ActivityIndicator as Spin } from 'react-native';
import { useRegister } from './useRegister';
import { Color, Images, Size, Layout } from '../../constants';
import { Container, Button, Input, Form, Text, Topbar } from '../../themes';
import { Routes } from '../../navigation'

export const Register = ({ navigation }) => {
  const passwordRef = useRef(null);
  const { control, handleSubmit, errors } = useForm();
  const { onRegister, loading, error } = useRegister();
  const onSubmitEditing = useCallback(() => passwordRef.current.focus(), []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Topbar.Right
          actions={{
            text: 'Login',
            onPress: () => navigation.replace(Routes.Login)
          }}
        />
      ),
    })
  }, [])

  return (
    <Container>
      <Topbar.Back />
      <View style={styles.form}>
        <Form>
          <View style={styles.logo}>
            <Image source={Images.logo} style={[styles.img]} />
          </View>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Please enter an email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address"
              }
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
              required: "Please enter password",
              minLength: {
                value: 6,
                message: "Password required to be more than 6"
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
                onSubmitEditing={handleSubmit(onRegister)}
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
            onPress={handleSubmit(onRegister)}>
            {loading && <Spin size="small" color={Color.white} style={{ marginTop: -5, marginRight: 10, }} /> }
            Register
          </Button>
          {!loading && !!error && <Text style={styles.error}>{error}</Text>}
        </Form>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
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
  highlight: {
    color: Color.primary,
  },
  btnSubmit: {
    marginTop: 40,
  },
  footerText: {
    padding: 10,
    textAlign: 'center',
  },
  error: {
    marginTop: 10,
    textAlign: 'center',
    color: Color.error,
  },
  footer: {
    flexDirection: Layout.row,
    alignItems: Layout.center,
    justifyContent: Layout.center,
  },
});
