import gql from "graphql-tag";

export const QUESTIONNAIRE_LIST = gql `
  query QUESTIONNAIRE_LIST($filter: QuestionnaireFilterInput, $orderBy: QuestionnaireOrderByEnum, $limit: Int, $offset: Int) {
    result: questionnaireList(filter: $filter, orderBy: $orderBy, limit: $limit, offset: $offset) {
      count
      rows {
        id
        name
        description
        status
        favourited
        createdBy {
          id
          firstName
          lastName
        }
        updatedAt
        createdAt
      }
    }
  }
`;
