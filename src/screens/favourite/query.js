import gql from "graphql-tag";

export const USER_QUESTIONNAIRE_LIST = gql `
  query USER_QUESTIONNAIRE_LIST($filter: QuestionnaireFilterInput, $orderBy: QuestionnaireOrderByEnum, $limit: Int, $offset: Int) {
    result: authMe {
      id
      favourites(filter: $filter, orderBy: $orderBy, limit: $limit, offset: $offset) {
        count
        rows {
          id
          name
          description
          status
          favourited
          updatedAt
          createdAt
        }
      }
    }
  }
`;
