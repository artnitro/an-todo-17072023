/**
 * App query.
 */

import { gql } from 'apollo-angular';


export const GET_REFRESH_USER = gql`
  query {
    refreshUser {
      access_token
    }
  }
`;
