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
      questions {
        id
        title
        explainAnswer
        questionType
        answers {
          id
          title
          score
          isCorrect
          answerType
        }
      }
      createdAt
      updatedAt
    }
  }
`;
