import gql from "graphql-tag";

export const CATEGORY_DETAIL = gql `
  query CATEGORY_DETAIL($id: String!) {
    category: categoryFind(id: $id) {
      id
      name
      description
      questionnaires {
        id
        name
        description
        status
        level
        favourited
      }
      createdAt
      updatedAt
    }
  }
`;
