import gql from "graphql-tag";

export const EMOTION_LIST = gql `
query EMOTION_LIST($filter: EmotionFilterInput, $orderBy: EmotionOrderByEnum, $limit: Int, $offset: Int) {
    result: emotionList(filter: $filter, orderBy: $orderBy, limit: $limit, offset: $offset) {
      count
      rows {
        id
        emotion
        degree
        createdBy {
          id
          firstName
          lastName
        }
        updatedAt
        createdAt
      }
    }
  }
`;
