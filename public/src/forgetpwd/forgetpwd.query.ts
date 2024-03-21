/**
 * Frogetpwd query.
 */

import { gql } from 'apollo-angular';

export const GET_UUID_FORGETPWD = gql`
  query GetUuidForgetpwd($email: String!) {
    uuidForgetpwd(email: $email)
  }
`;