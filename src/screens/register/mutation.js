import gql from "graphql-tag";

export const AUTH_SIGN_UP = gql `
  mutation AUTH_SIGN_UP($email: String!, $password: String!, $intrestedCategories: [String]) {
    result: authSignUp(email: $email, password: $password, intrestedCategories: $intrestedCategories)
  }
`;
