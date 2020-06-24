import gql from "graphql-tag";

export const QUESTIONNAIRE_DETAIL = gql `
  query QUESTIONNAIRE_DETAIL($id: String!) {
    questionnaire: questionnaireFind(id: $id) {
      id
      name
      status
      description
      favourited
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
      rules {
        min
        max
        message
      }
      createdAt
      updatedAt
    }
  }
`;
