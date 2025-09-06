/**
 * Dashboard mutations.
 */

import { gql } from 'apollo-angular';

export const SET_USER = gql`
  mutation SetUser($firstName: String!, $nickName: String, $email: String!) {
    setUser(userInput: {
      firstName: $firstName,
      nickName: $nickName,
      email: $email
    }) {
      _id
    }
  }
`;
