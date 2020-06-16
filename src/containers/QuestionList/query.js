import gql from "graphql-tag";

export const QUESTIONNAIRE_DETAIL = gql `
  query QUESTIONNAIRE_DETAIL($id: String!) {
    questionnaire: questionnaireFind(id: $id) {
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
      author: createdBy {
        id
        firstName
        lastName
      }
      answers {
        id
        title
        score
        type
      }
      questions {
        id
        title
      }
      createdAt
      updatedAt
    }
  }
`;
