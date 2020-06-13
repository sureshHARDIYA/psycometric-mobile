import gql from "graphql-tag";

export const HISTORY_QUERY = gql `
  query HISTORY_QUERY($filter: QuizRecordFilterInput, $limit: Int, $offset: Int) {
    result: quizRecordHistory(filter: $filter, limit: $limit, offset: $offset) {
      max
      count
      rows {
        id
        title
        kind
        score
        passed
        randomizeQuestion
        randomizeOptions
        questionnaire
        createdAt
      }
    }
  }
`;
