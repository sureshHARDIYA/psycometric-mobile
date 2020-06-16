import gql from "graphql-tag";

export const RECORD_MUTATION = gql `
  mutation RECORD_MUTATION($data: QuizRecordInput!) {
    result: quizRecordCreate(data: $data) {
      id
      createdAt
      updatedAt
    }
  }
`;
