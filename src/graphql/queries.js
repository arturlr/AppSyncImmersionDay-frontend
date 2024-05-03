/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBook = /* GraphQL */ `
  query GetBook($id: ID!) {
    getBook(id: $id) {
      id
      title
      authorId
      publisherId
      genres
      publicationYear
      image
      description
      __typename
    }
  }
`;
export const listBooks = /* GraphQL */ `
  query ListBooks(
    $filter: TableBookFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBooks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        authorId
        publisherId
        genres
        publicationYear
        image
        description
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const queryBooksByAuthorIndex = /* GraphQL */ `
  query QueryBooksByAuthorIndex($authorId: ID!, $first: Int, $after: String) {
    queryBooksByAuthorIndex(authorId: $authorId, first: $first, after: $after) {
      items {
        id
        title
        authorId
        publisherId
        genres
        publicationYear
        image
        description
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const queryBooksByPublisherIndex = /* GraphQL */ `
  query QueryBooksByPublisherIndex(
    $publisherId: ID!
    $first: Int
    $after: String
  ) {
    queryBooksByPublisherIndex(
      publisherId: $publisherId
      first: $first
      after: $after
    ) {
      items {
        id
        title
        authorId
        publisherId
        genres
        publicationYear
        image
        description
        __typename
      }
      nextToken
      __typename
    }
  }
`;
