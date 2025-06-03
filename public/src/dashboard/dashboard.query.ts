/**
 * Dashboard queries.
 */

import { gql } from 'apollo-angular';

export const GREETINGS = gql`
  query {
    getHello
  }
`;
