import gql from "graphql-tag";

export const AUTH_UPDATE_PROFILE = gql `
  mutation AUTH_UPDATE_PROFILE($profile: UserProfileInput!) {
    result: authUpdateProfile(profile: $profile)
  }
`;

