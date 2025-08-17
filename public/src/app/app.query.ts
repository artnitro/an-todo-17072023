/**
 * App queries
 */

import { gql } from 'apollo-angular';

/**
 * @description Consulta para obtener los datos de usuario
 */
export const GET_GET_USER = gql`
  query GeTGetUser($email: String!) {
    getUser(email: $email) {
      _id
    }
  }
`;
