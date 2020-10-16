import { useQuery } from '@apollo/react-hooks';
import _set from 'lodash/fp/set';
import _get from 'lodash/get';
import { useState, useEffect } from 'react';

import { useAuth } from '../Auth';
import { EMOTION_LIST } from './query';

export const useSearch = ({} = {}) => {
  const { currentUser } = useAuth();
  const defaultVariables = {
    filter: {},
    orderBy: null,
    limit: 500,
    offset: 0,
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

  const { loading, error, data, fetchMore, refetch } = useQuery(EMOTION_LIST, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const list = _get(data, 'result.rows', []);
  const count = _get(data, 'result.count', 0);
  const current = _get(data, 'result.currentPage', 0);

  const onSearchName = (name) => setOption((pre) => ({
      ...pre,
      filter: {
        ...pre.filter,
        name,
      },
    }));

  const handleLoadMore = async () => {
    console.log('handleLoadMore EMOTION_LIST:', list.length);
    if (!loading && count > list.length) {
      await fetchMore({
        variables: {
          ...variables,
          offset: list.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (fetchMoreResult) {
            return _set('result.rows', [
              ..._get(prev, 'result.rows', []),
              ..._get(fetchMoreResult, 'result.rows', []),
            ])(fetchMoreResult);
          }

          return prev;
        },
      });
    }
  };

  return {
    list,
    count,
    current,
    loading,
    onSearchName,
    handleLoadMore,
    refetch,
    error: error ? (Array.isArray(error) ? error : [error]).join(', ') : null,
  };
};
