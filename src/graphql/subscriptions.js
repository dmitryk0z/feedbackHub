/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateReview = /* GraphQL */ `
  subscription OnCreateReview($filter: ModelSubscriptionReviewFilterInput) {
    onCreateReview(filter: $filter) {
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
export const onUpdateReview = /* GraphQL */ `
  subscription OnUpdateReview($filter: ModelSubscriptionReviewFilterInput) {
    onUpdateReview(filter: $filter) {
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
export const onDeleteReview = /* GraphQL */ `
  subscription OnDeleteReview($filter: ModelSubscriptionReviewFilterInput) {
    onDeleteReview(filter: $filter) {
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
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
    onCreateProduct(filter: $filter) {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
    onUpdateProduct(filter: $filter) {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
    onDeleteProduct(filter: $filter) {
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
