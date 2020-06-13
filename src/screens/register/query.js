import gql from "graphql-tag";

export const QUESTIONNAIRE_LIST = gql `
  query QUESTIONNAIRE_LIST_PREVIEW($filter: QuestionnaireFilterInput, $orderBy: QuestionnaireOrderByEnum, $limit: Int, $offset: Int) {
    result: questionnaireList(filter: $filter, orderBy: $orderBy, limit: $limit, offset: $offset) {
      count
      rows {
        id
        name
        createdAt
      }
    }
  }
`;
