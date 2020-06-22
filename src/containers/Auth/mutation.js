import gql from "graphql-tag";

export const MUTATION_PUSH_NOTIFICATION = gql `
  mutation MUTATION_PUSH_NOTIFICATION($token: String!) {
    notificationCreate(token: $token)
  }
`