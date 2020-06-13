import { useQuery } from "@apollo/react-hooks";
import _get from 'lodash/get';
import { useState } from "react";
import { CATEGORY_LIST } from "./query";

export const useCategory = (init = {}) => {
  const defaultVariables = {
    orderBy: null,
    limit: 10,
    offset: 0,
    ...init,
  };

  const [variables, setOption] = useState(defaultVariables);

  const { loading, error, data, refetch } = useQuery(CATEGORY_LIST, {
    variables,
  });

  const list = _get(data, 'result.rows', []);
  const count = _get(data, 'result.count', 0);

  return {
    list,
    count,
    loading,
    setOption,
    onRefresh: refetch,
    error: error ? (Array.isArray(error) ? error : [error]).join(', ') : null,
  }
};
