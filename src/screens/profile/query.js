import gql from "graphql-tag";

export const CATEGORY_LIST = gql `
  query CATEGORY_LIST($filter: CategoryFilterInput, $limit: Int, $offset: Int, $orderBy: CategoryOrderByEnum) {
    result: categoryList(filter: $filter, orderBy: $orderBy, limit: $limit, offset: $offset) {
      rows {
        id
        name
      }
    }
  }
`;
