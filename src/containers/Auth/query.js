import gql from "graphql-tag";

export const AUTH_ME = gql `
  query AUTH_ME {
    result: authMe {
      id
      authenticationUid
      emailVerified
      fullName
      firstName
      lastName
      phoneNumber
      email
      roles
      intrestedCategories {
        id
      }
      avatars {
        id
        name
        publicUrl
      }
    }
  }
`;
