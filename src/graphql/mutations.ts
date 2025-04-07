import {gql} from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;


export const SIGNUP_MUTATION = gql`
    mutation Signup($name: String!, $email: String!, $password: String!){
        signup(name: $name, email: $email, password: $password) 
    }
`;


export const GET_BOOK_COUNT = gql`
  query GetBookCount($page: Int, $pageSize: Int) {
    getAllBooks(page: $page, pageSize: $pageSize) {
      totalCount
    }
  }
`;

export const GET_BOOKS_QUERY = gql`
  query GetAllBooks($page: Int, $pageSize: Int, $title: String, $author: String, $genre: String) {
    getAllBooks(page: $page, pageSize: $pageSize, title: $title, author: $author, genre: $genre) {
      books {
        id
        title
        author
        publishedYear
        genre
        coverImage
      }
      totalCount
    }
  }
`;