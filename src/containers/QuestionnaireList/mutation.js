import gql from "graphql-tag";

export const QUESTIONNAIRE_FAROURITE = gql `
  mutation QUESTIONNAIRE_FAROURITE($id: String!) {
    result: questionnaireFavourite(id: $id) {
      id
      favourited
    }
  }
`
