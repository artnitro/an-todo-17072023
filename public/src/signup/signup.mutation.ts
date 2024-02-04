/**
 * Signup query
 */

import { gql } from 'apollo-angular';


export const SET_USER = gql`
  mutation SetUser($firstName: String!, $lastName: String!, $email: String!, $nickName: String!, $password: String!) {
    createUser(userInput: {
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      nickName: $nickName,
      password: $password
    }) {
      access_token
    }
  }
`;
