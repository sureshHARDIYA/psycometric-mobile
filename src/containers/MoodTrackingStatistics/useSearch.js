import { useQuery } from '@apollo/react-hooks';
import _set from 'lodash/fp/set';
import _get from 'lodash/get';
import { useState, useEffect } from 'react';

import { useAuth } from '../Auth';
import { EMOTION_LIST } from './query';

export const useSearch = ({} = {}) => {
  const { currentUser } = useAuth();
  const defaultVariables = {
    id: currentUser.id,
  };

  const [variables, setOption] = useState(defaultVariables);

  useEffect(() => {
    setOption((pre) => ({
      ...pre,
      filter: {
        ...pre.filter,
      },
    }));
  }, [currentUser]);

  const { loading, error, data, refetch } = useQuery(EMOTION_LIST, {
    variables,
    fetchPolicy: 'network-only',
  });

  const list = _get(data, 'iamFind.emotion.rows', []);

  const onSearchName = (name) =>
    setOption((pre) => ({
      ...pre,
      filter: {
        ...pre.filter,
        name,
      },
    }));

  return {
    list,
    loading,
    onSearchName,
    refetch,
    error: error ? (Array.isArray(error) ? error : [error]).join(', ') : null,
  };
};
