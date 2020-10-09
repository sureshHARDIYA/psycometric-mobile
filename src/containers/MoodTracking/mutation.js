import gql from "graphql-tag";

export const RECORD_MUTATION = gql `
  mutation RECORD_MUTATION($data: EmotionInput!) {
    result: emotionCreate(data: $data) {
      id
      emotion
      degree
      createdAt
      updatedAt
    }
  }
`;

export const DESTROY_MUTATION = gql `
  mutation DESTROY_MUTATION($ids: [String!]!) {
    emotionDestroy(ids: $ids)
  }
`;