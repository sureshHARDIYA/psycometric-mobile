import { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import _get from 'lodash/get';
import _set from 'lodash/set';
import { AUTHOR_DETAIL } from "./query";
import { selectErrorMessage } from "../../utils/error";
import { useAuth } from "../../containers/Auth";

export const useSearch = (id) => {
  const { categoryIds } = useAuth();

  const defaultVariables = {
    filter: {
      createdAtRange: [],
      status: 'ACTIVE'
    },
    limit: 10,
    orderBy: "createdAt_DESC",
    offset: 0,
  };

  const [variables, setOption] = useState(defaultVariables);

  const { loading, error, data, fetchMore, refetch } = useQuery(AUTHOR_DETAIL, {
    variables: {
      ...variables,
      filter: {
        ...variables.filter,
          category: (variables.filter.category || []).length > 0 ? categoryIds : null,
      },
      id,
    },
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


  const author = _get(data, 'author');
  const count = _get(data, 'author.questionnaires.count', 0);
  const offset = _get(data, 'author.questionnaires.offset', 0);

  const handleLoadMore = async (length) => {
    if (!loading && count > length && length !== offset) {
      console.log(`handleLoadMore QUESTIONNAIRE_LIST of author ${id}:`, length, offset);
      await fetchMore({
        variables: {
          ...defaultVariables,
          id,
          offset: length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (fetchMoreResult) {
            return _set(fetchMoreResult, 'author.questionnaires.rows', [
              ..._get(prev, 'author.questionnaires.rows', []),
              ..._get(fetchMoreResult, 'author.questionnaires.rows', []),
            ])
          }

          return prev;
        },
      })
    }
  }

  return {
    loading,
    author,
    handleLoadMore,
    onRefresh: refetch,
    error: error ? selectErrorMessage(error) : null,
  }
};
