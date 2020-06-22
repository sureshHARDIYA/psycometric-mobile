import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { AsyncStorage } from 'react-native';
import _get from 'lodash/get';
import { AUTH_ME } from "./query";
import { useQuery, useMutation, useLazyQuery } from 'react-apollo';
import { MUTATION_PUSH_NOTIFICATION } from './mutation';

const keyUser = '@User';
const keyToken = '@accessToken';

const AuthContext = createContext({
  loading: false,
  accessToken: null,
  currentUser: null,
  refetch: () => false,
  onLogout: () => false,
  isAuthenticated: false,
  authenticate: () => false,
  setToken: (token) => false,
  createToken: (token) => {},
});

export const useAuth = () => useContext(AuthContext);

export const getUser = async () => await AsyncStorage.getItem(keyUser);

export const getToken = async () => await AsyncStorage.getItem(keyToken);

export const Auth = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [profile, {loading, data, error}] = useLazyQuery(AUTH_ME);
  const [_createToken] = useMutation(MUTATION_PUSH_NOTIFICATION);

  const createToken = useCallback((token) => _createToken({ variables: { token } }), [])

  useEffect(() => {
    setCurrentUser(_get(data, 'result'));
  }, [data, error])

  useEffect(() => {
    if (!accessToken) {
      setCurrentUser(null);
    }
  }, [accessToken])

  const setToken = useCallback(async (token) => {
    try {
      if (token) {
        await AsyncStorage.setItem(keyToken, token);
        await profile();
      } else {
        await AsyncStorage.removeItem(keyToken);
      }
      setAccessToken(token);
    } catch (error) {
      setAccessToken(null);
      throw error;
    }
  }, []);

  const authenticate = useCallback(async () => {
    let token;
    try {
      await profile();
      token = await getToken();
    } catch (error) {
      token = null;
    } finally {
      setAccessToken(token);
      return token;
    }
  }, []);

  const onLogout = useCallback(() => {
    setToken(null);
  });

  return (
    <AuthContext.Provider
      value={{
        loading,
        onLogout,
        setToken,
        currentUser,
        accessToken,
        authenticate,
        createToken,
        refetch: profile,
        isAuthenticated: !!accessToken,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
