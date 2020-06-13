import { useQuery } from "@apollo/react-hooks";
import _get from 'lodash/get';
import { QUESTIONNAIRE_LIST } from "./query";

export const useQuestionnaire = ({ categoryIds = [] } = {}) => {
  const variables = {
    filter: {
      createdAtRange: [],
      status: 'ACTIVE',
      category: categoryIds.length > 0 ? categoryIds : null,
    },
    orderBy: null,
    limit: 10,
    offset: 0,
  };

  const { loading, error, data } = useQuery(QUESTIONNAIRE_LIST, { variables });
  const list = _get(data, 'result.rows', []);

  return {
    list,
    loading,
    error: error ? (Array.isArray(error) ? error : [error]).join(', ') : null,
  }
};
