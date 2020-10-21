import gql from 'graphql-tag';

export const EMOTION_LIST = gql`
query IAM_FIND($id: String!) {
          iamFind(id: $id) {
            id
            fullName
            emotion {
              rows {
                id
                emotion
                degree
                createdAt
              }
            }
          }
        }
`;
