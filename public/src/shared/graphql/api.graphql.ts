/**
 * Configuración de GraphQL sobre el servidor de consultas.
 */

// TODO: Definir ruta donde recoger token, está asignado provisional como null.

import { onError } from '@apollo/client/link/error';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache, ApolloClientOptions } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { SERVICES } from '../config';

export function ApiGraphql(httpLink: HttpLink): ApolloClientOptions<any> {

  const token = null;

  // Configuración error.

  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) 
      graphQLErrors.map(({ message, locations, path }) => 
      console.error(`an-ERROR: [GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,),);
    if (networkError) 
      console.error(`an-ERROR: [Network error]: ${networkError}`);
    return forward(operation); 
  });

   // Configuración authoritation header.

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      }
    });
    return forward(operation);
  });

   // Configuración http link.

   const http = httpLink.create({
    uri: SERVICES['api'],
    withCredentials: true,
  });

  // Configuración socket link.

  const wss = new GraphQLWsLink(createClient({
    url: SERVICES['wss'],
    connectionParams: () => { // NOTE: Puede que no haga falta, definido anteriormente en authLink, probar cuando está operativo.
      const bearer =  token ? `Bearer ${token}` : '';
      return {
        Authorization: bearer,
      }
    }
  }));

  const link = ApolloLink.split( ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
    wss,
    ApolloLink.from([errorLink, authLink, http]),
  );

  return {
    cache: new InMemoryCache(),
    link: link
  }

}