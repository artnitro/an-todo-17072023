/**
 * Dashboard subscriptions.
 */

import { gql } from 'apollo-angular';

export const ON_NEW_MESSAGE = gql`
  subscription OnNewMessage {
    newMessage {
    message}
  }
`;