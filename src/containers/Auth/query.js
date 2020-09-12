import gql from "graphql-tag";

export const AUTH_ME = gql `
  query AUTH_ME {
    result: authMe {
      id
      authenticationUid
      fullName
      firstName
      lastName
      email
      roles
      notification
      avatars {
        id
        name
        publicUrl
      }
    }
  }
`;
