import { useQuery } from "@apollo/react-hooks";
import _get from 'lodash/get';
import _set from 'lodash/fp/set';
import { HISTORY_QUERY } from "./query";
import { useState } from "react";

export const useSearch = (kind) => {
  const defaultVariables = {
    orderBy: null,
    limit: 10,
    offset: 0,
    filter: {
      kind
    }
  };

  const [variables, setOption] = useState(defaultVariables);

  const { loading, error, data, fetchMore, refetch } = useQuery(HISTORY_QUERY, {
    variables,
  });

  const list = _get(data, 'result.rows');
  const count = _get(data, 'result.count');
  const max = _get(data, 'result.max');

  const handleLoadMore = async () => {
    console.log('handleLoadMore HISTORY_LIST:', list.length);

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
            ])(fetchMoreResult)
          }

          return prev;
        },
      })
    }
  }

  return {
    list,
    max,
    count,
    loading,
    handleLoadMore,
    onRefresh: refetch,
    error: error ? (Array.isArray(error) ? error : [error]).join(', ') : null,
  }
};
