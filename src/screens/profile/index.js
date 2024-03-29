import React, { useMemo, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator as Loading,
  RefreshControl,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import _get from 'lodash/get';
import moment from 'moment';
import { Color } from '../../constants';
import {
  Header,
  HeaderMain,
  Text,
  Form,
  Input,
  Container,
  DatePicker,
} from '../../themes';
import { useAuth } from '../../containers/Auth';
import { useSubmit } from './useSubmit';
import { Avatar } from '../../components';

export const Profile = ({ navigation }) => {
  const { currentUser, loading: userLoading, refetch } = useAuth();
  const lastNameRef = useRef(null);
  const { loading, onSubmit } = useSubmit();

  const { control, handleSubmit, getValues, watch, errors, setValue } = useForm(
    {
      defaultValues: {
        ...(currentUser || {}),
        notification: moment(
          _get(currentUser, 'notification') || new Date()
        ).toDate(),
      },
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  const fullName = useMemo(
    () =>
      [getValues().firstName, getValues().lastName].filter((i) => i).join(' '),
    [watch('firstName'), watch('lastName')]
  );

  useEffect(() => {
    setValue([
      { email: _get(currentUser, 'email') },
      { lastName: _get(currentUser, 'lastName') },
      { firstName: _get(currentUser, 'firstName') },
      {
        notification: moment(
          _get(currentUser, 'notification') || new Date()
        ).toDate(),
      },
    ]);
  }, [
    _get(currentUser, 'email'),
    _get(currentUser, 'lastName'),
    _get(currentUser, 'firstName'),
    _get(currentUser, 'notification'),
  ]);

  return (
    <Container>
      <HeaderMain
        left={<Header.Back navigation={navigation} />}
        right={
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={handleSubmit(onSubmit)}>
            {loading && <Loading />}
            <Text style={{ marginLeft: 5 }}>Save</Text>
          </TouchableOpacity>
        }
      />
      <Container
        style={styles.form}
        refreshControl={
          <RefreshControl refreshing={userLoading} onRefresh={refetch} />
        }>
        <Form>
          <View style={styles.header}>
            <Avatar email={_get(currentUser, 'email')} />
            <Text style={styles.name}>{fullName}</Text>
          </View>
          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            as={
              <Input
                label="Email"
                editable={false}
                style={styles.input}
                returnKeyType="next"
                placeholder="Enter email"
                autoCompleteType="email"
              />
            }
            onChange={(args) => args[0].nativeEvent.text}
          />
          <Controller
            control={control}
            name="firstName"
            rules={{ required: true }}
            as={
              <Input
                editable={!loading}
                label="First name"
                style={styles.input}
                returnKeyType="next"
                placeholder="Enter first name"
                error={errors.firstName && 'First name is required'}
                onSubmitEditing={() => lastNameRef.current.focus()}
              />
            }
            onChange={(args) => args[0].nativeEvent.text}
          />
          <Controller
            control={control}
            name="lastName"
            as={
              <Input
                editable={!loading}
                label="Last name"
                style={styles.input}
                returnKeyType="next"
                ref={lastNameRef}
                placeholder="Enter last name"
                error={errors.lastName && 'Last name is required'}
              />
            }
            onChange={(args) => args[0].nativeEvent.text}
          />

          <Controller
            control={control}
            name="notification"
            as={
              <DatePicker
                mode="time"
                format="HH:mm"
                value={moment().toDate()}
                label="When do you want to receive notification?"
              />
            }
          />
        </Form>
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 10,
  },
  header: {
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    position: 'relative',
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
  btnSubmit: {
    flexDirection: 'row',
  },
});
