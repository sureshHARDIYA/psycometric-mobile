import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { AsyncStorage } from 'react-native';
import _get from 'lodash/get';
import { AUTH_ME } from "./query";
import { useQuery } from 'react-apollo';

const keyUser = '@User';
const keyToken = '@accessToken';

const AuthContext = createContext({
  loading: false,
  categoryIds: [],
  accessToken: null,
  currentUser: null,
  refetch: () => false,
  onLogout: () => false,
  isAuthenticated: false,
  authenticate: () => false,
  setToken: (token) => false,
});

export const useAuth = () => useContext(AuthContext);

export const getUser = async () => await AsyncStorage.getItem(keyUser);

export const getToken = async () => await AsyncStorage.getItem(keyToken);

export const Auth = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const { loading, data, error, refetch } = useQuery(AUTH_ME);
  const categoryIds = useMemo(() => _get(currentUser, 'intrestedCategories', []).map(({ id }) => id), [currentUser]);

  useEffect(() => {
    setCurrentUser(_get(data, 'result'));
  }, [data, error])

  useEffect(() => {
    if (!accessToken) {
      setCurrentUser(null);
    }
    refetch();
  }, [accessToken])

  useEffect(() => {
    if (error) {
      setToken(null)
    }
  }, [error])

  const setToken = useCallback(async (token) => {
    try {
      if (token) {
        await AsyncStorage.setItem(keyToken, token);
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
        refetch,
        loading,
        onLogout,
        setToken,
        currentUser,
        accessToken,
        authenticate,
        categoryIds,
        isAuthenticated: !!accessToken,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
