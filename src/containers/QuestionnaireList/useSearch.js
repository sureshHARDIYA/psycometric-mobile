import { useQuery } from "@apollo/react-hooks";
import _get from 'lodash/get';
import _set from 'lodash/fp/set';
import { useState, useEffect } from "react";
import { QUESTIONNAIRE_LIST } from "./query";
import { useAuth } from "../Auth";

export const useSearch = ({ level } = {}) => {
  const { categoryIds } = useAuth();

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

  const { loading, error, data, fetchMore, refetch } = useQuery(QUESTIONNAIRE_LIST, {
    variables: {
      ...variables,
      filter: {
        ...variables.filter,
        category: (variables.filter.category || []).length > 0 ? categoryIds : null,
      }
    },
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    setOption((pre) => ({
      ...pre,
      filter: {
        ...pre.filter,
        category: categoryIds
      }
    }))
  }, [categoryIds])

  const list = _get(data, 'result.rows', []);
  const count = _get(data, 'result.count', 0);
  const current = _get(data, 'result.currentPage', 0);

  const onSearchName = (name) => setOption((pre) => ({
    ...pre,
    filter: {
      ...pre.filter,
      name
    }
  }))

  const handleLoadMore = async () => {
    console.log('handleLoadMore QUESTIONNAIRE_LIST:', list.length);
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
    count,
    current,
    loading,
    onSearchName,
    handleLoadMore,
    onRefresh: refetch,
    error: error ? (Array.isArray(error) ? error : [error]).join(', ') : null,
  }
};
