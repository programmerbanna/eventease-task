import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      accessToken
      user {
        id
        email
        name
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!, $name: String!) {
    register(
      registerInput: { email: $email, password: $password, name: $name }
    ) {
      accessToken
      user {
        id
        email
        name
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;
