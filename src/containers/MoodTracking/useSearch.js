import { useQuery } from '@apollo/react-hooks';
import _get from 'lodash/get';
import _set from 'lodash/fp/set';
import { EMOTION_LIST } from './query';
import { useAuth } from '../Auth';
import { useState, useEffect } from 'react';


/*
export const useSearch = (id) => {
  const { loading, error, data } =  (EMOTION_LIST, {
    variables: { id },
  });

/!*  const emotionList = _get(data, 'list', []);*!/
  const emotionList = _get(data, 'result.rows', []);

  return {
    loading,
    emotionList,
    error: error ? (Array.isArray(error) ? error : [error]).join(', ') : null,
  }
};
*/
export const useSearch = ({} = {}) => {
  const { currentUser } = useAuth();
  const defaultVariables = {
    filter: {},
    orderBy: null,
    limit: 100,
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
    onRefresh: refetch,
    error: error ? (Array.isArray(error) ? error : [error]).join(', ') : null,
  };
};

