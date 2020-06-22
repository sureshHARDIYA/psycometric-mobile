import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator as Spin
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { Color } from '../../constants';
import { Text, Form, Input, Button, Header, Container } from '../../themes';
import { useSubmit } from './useSubmit';

export const Feedback = ({ navigation }) => {
  const messageRef = useRef();
  const { control, handleSubmit, errors, reset } = useForm();
  const { onSubmit, loading, notice } = useSubmit(reset);
  const onSubmitEditing = useCallback(() => messageRef.current.focus(), []);

  return (
    <Container style={styles.container}>
      <Header style={styles.header}>
        <TouchableOpacity
          style={styles.goBack}
          onPress={() => navigation.goBack()}>
          <Ionicons
            size={30}
            name="ios-arrow-dropleft"
            color={Color.textColor}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Feedback us</Text>
      </Header>
      <ScrollView style={styles.content}>
        <Form>
          <Text style={styles.text}>
            <Text style={styles.bold}>Psychometric</Text> is a free app created for
            beginners to advanced IT students, developers, designers, and another
            computer scientist.
          </Text>
          <Text style={styles.text}>
            If you have any questions or suggestions about app, do not hesitate to contact us
          </Text>
          <View style={styles.form}>
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
                  label="Email (*)"
                  editable={!loading}
                  style={styles.input}
                  returnKeyType="next"
                  autoCapitalize="none"
                  placeholder="Enter email"
                  autoCompleteType="email"
                  onSubmitEditing={onSubmitEditing}
                  error={!!errors.email && "Email is required"}
                />
              }
              onChange={(args) => args[0].nativeEvent.text}
            />
            <Controller
              control={control}
              name="message"
              rules={{ required: true }}
              defaultValue=""
              as={
                <Input
                  multiline
                  height={100}
                  label="Message (*)"
                  ref={messageRef}
                  editable={!loading}
                  style={styles.textarea}
                  returnKeyType="send"
                  placeholder="Enter message"
                  onSubmitEditing={handleSubmit(onSubmit)}
                  error={!!errors.message && "Message is required"}
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
              onPress={handleSubmit(onSubmit)}
            >
              {loading && <Spin size="small" color={Color.white} style={{ marginTop: -5, marginRight: 10, }} /> }
              Send
            </Button>
            {!loading && !!notice.message && <Text type={notice.type} style={styles.error}>{notice.message}</Text>}
          </View>
        </Form>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  goBack: {
    zIndex: 2,
    marginLeft: 10,
  },
  title: {
    flex: 1,
    fontSize: 24,
    marginLeft: -30,
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    padding: 10,
    marginBottom: 30,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  about: {
    margin: 20,
  },
  error: {
    marginTop: 10,
    textAlign: 'center',
  },
});
