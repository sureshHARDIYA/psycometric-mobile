import { useQuery } from "@apollo/react-hooks";
import _get from 'lodash/get';
import _set from 'lodash/fp/set';
import { CATEGORY_DETAIL } from "./query";
import { selectErrorMessage } from "../../utils/error";

export const useSearch = (id) => {
  const { loading, error, data } = useQuery(CATEGORY_DETAIL, {
    variables: { id },
  });

  const category = _get(data, 'category');

  return {
    loading,
    category,
    error: error ? selectErrorMessage(error) : null,
  }
};
