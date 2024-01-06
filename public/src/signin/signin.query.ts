/**
 * Signin query.
 */

import { gql } from 'apollo-angular';


export const IS_USER = gql`
  query {
    getHello
  }
`;

export const GET_IS_USER = gql`
  query GetIsUser($email: String!, $password: String!) {
    isUser(email: $email, password: $password) {
      access_token
    }
  } 
`;