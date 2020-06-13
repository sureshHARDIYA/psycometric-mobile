import gql from "graphql-tag";

export const FEEDBACK_CREATE = gql `
  mutation FEEDBACK_CREATE($data: FeedbackInput!) {
    result: feedbackCreate(data: $data) {
      id
    }
  }
`;
