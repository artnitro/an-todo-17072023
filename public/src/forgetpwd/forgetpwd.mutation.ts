/**
 * Forgetpwd mutation.
 */

import { gql } from 'apollo-angular';

export const SET_CHANGE_PASSWORD = gql`
  mutation SetChangePassword($email: String!, $password: String!) {
    changePassword(changepwdInput: {
      email: $email,
      password: $password
    })
  }
`;