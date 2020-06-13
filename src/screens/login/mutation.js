import gql from "graphql-tag";

export const AUTH_SIGN_IN = gql `
  mutation AUTH_SIGN_IN($email: String!, $password: String!) {
    result: authSignIn(email: $email, password: $password)
  }
`;
