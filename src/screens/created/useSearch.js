import { useQuery } from "@apollo/react-hooks";
import _get from 'lodash/get';
import _set from 'lodash/fp/set';
import { useState } from "react";
import { USER_QUESTIONNAIRE_LIST } from "./query";

export const useSearch = ({ level } = {}) => {
  const defaultVariables = {
    filter: {
      createdAtRange: [],
      level,
      status: 'ACTIVE',
      category: null,
    },
    orderBy: null,
    limit: 10,
    offset: 0,
  };

  const [variables, setOption] = useState(defaultVariables);

  const { loading, error, data, fetchMore, refetch } = useQuery(USER_QUESTIONNAIRE_LIST, {
    variables
  });

  const list = _get(data, 'result.questionnaires.rows', []);
  const count = _get(data, 'result.questionnaires.count', 0);
  const current = _get(data, 'result.questionnaires.currentPage', 0);

  const onSearchName = (name) => setOption((pre) => ({
    ...pre,
    filter: {
      ...pre.filter,
      name
    }
  }))

  const handleLoadMore = async () => {
    console.log('handleLoadMore USER_QUESTIONNAIRE_LIST:', list.length);
    if (!loading && count > list.length) {
      await fetchMore({
        variables: {
          ...variables,
          offset: list.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (fetchMoreResult) {
            return _set('result.questionnaires.rows', [
              ..._get(prev, 'result.questionnaires.rows', []),
              ..._get(fetchMoreResult, 'result.questionnaires.rows', []),
            ])(fetchMoreResult)
          }

          return prev;
        },
      })
    }
  }

  return {
    list,
    count,
    current,
    loading,
    onSearchName,
    handleLoadMore,
    onRefresh: refetch,
    error: error ? (Array.isArray(error) ? error : [error]).join(', ') : null,
  }
};
