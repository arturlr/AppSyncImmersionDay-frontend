/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBook = /* GraphQL */ `
  mutation CreateBook($input: CreateBookInput!) {
    createBook(input: $input) {
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
export const updateBook = /* GraphQL */ `
  mutation UpdateBook($input: UpdateBookInput!) {
    updateBook(input: $input) {
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
export const deleteBook = /* GraphQL */ `
  mutation DeleteBook($input: DeleteBookInput!) {
    deleteBook(input: $input) {
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
