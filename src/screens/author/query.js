import gql from "graphql-tag";

export const AUTHOR_DETAIL = gql `
  query AUTHOR_DETAIL($id: String!, $filter: QuestionnaireFilterInput, $limit: Int, $offset: Int, $orderBy: QuestionnaireOrderByEnum) {
    author: iamFind(id: $id) {
      id
      email
      firstName
      lastName
      createdAt
      updatedAt
      questionnaires(filter: $filter, limit: $limit, offset: $offset, orderBy: $orderBy) {
        count
        offset
        rows {
          id
          name
          description
          status
          level
          favourited
          category {
            id
            name
          }
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
  }
`;
