/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getReview = /* GraphQL */ `
  query GetReview($id: ID!) {
    getReview(id: $id) {
      id
      productID
      content
      rating
      createdBy
      userFirstName
      userLastName
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listReviews = /* GraphQL */ `
  query ListReviews(
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        productID
        content
        rating
        createdBy
        userFirstName
        userLastName
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      image
      Reviews {
        items {
          id
          productID
          content
          rating
          createdBy
          userFirstName
          userLastName
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        Reviews {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const reviewsByProductID = /* GraphQL */ `
  query ReviewsByProductID(
    $productID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    reviewsByProductID(
      productID: $productID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        productID
        content
        rating
        createdBy
        userFirstName
        userLastName
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
