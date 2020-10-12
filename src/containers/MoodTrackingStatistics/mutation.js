import gql from "graphql-tag";

export const DESTROY_MUTATION = gql `
  mutation DESTROY_MUTATION($ids: [String!]!) {
    emotionDestroy(ids: $ids)
  }
`;