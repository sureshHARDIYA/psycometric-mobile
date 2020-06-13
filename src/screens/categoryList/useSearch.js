import { useQuery } from "@apollo/react-hooks";
import _get from 'lodash/get';
import _set from 'lodash/fp/set';
import _uniq from 'lodash/uniqBy';
import { useState } from "react";
import { CATEGORY_LIST } from "./query";

export const useSearch = () => {
  const defaultVariables = {
    filter: {
      name: null,
    },
    orderBy: null,
    limit: 10,
    offset: 0,
  };

  const [variables, setOption] = useState(defaultVariables);

  const { loading, error, data, fetchMore, refetch } = useQuery(CATEGORY_LIST, { variables });

  const list = _get(data, 'result.rows', []);
  const count = _get(data, 'result.count', 0);
  const current = _get(data, 'result.offset', 0);

  const onSearch = (name) => setOption((pre) => ({
    ...pre,
    filter: {
      ...pre.filter,
      name
    }
  }))

  const handleLoadMore = async (offset) => {
    console.log('handleLoadMore CATEGORY_LIST:', list.length);

    if (!loading && count > list.length) {
      await fetchMore({
        variables: {
          ...variables,
          offset: list.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (fetchMoreResult) {
            return _set('result.rows', _uniq([
              ..._get(prev, 'result.rows', []),
              ..._get(fetchMoreResult, 'result.rows', []),
            ], 'id'))(fetchMoreResult)
          }

          return prev;
        },
      })
    }
  }

  return {
    list,
    count,
    loading,
    onSearch,
    current,
    handleLoadMore,
    onRefresh: refetch,
    error: error ? (Array.isArray(error) ? error : [error]).join(', ') : null,
  }
};
