import { useQuery } from "@apollo/react-hooks";
import _get from 'lodash/get';
import _set from 'lodash/fp/set';
import { QUESTIONNAIRE_DETAIL } from "./query";

export const useSearch = (id) => {
  const { loading, error, data } =  (QUESTIONNAIRE_DETAIL, {
    variables: { id },
  });

  const questionnaire = _get(data, 'questionnaire', []);

  return {
    loading,
    questionnaire,
    error: error ? (Array.isArray(error) ? error : [error]).join(', ') : null,
  }
};
