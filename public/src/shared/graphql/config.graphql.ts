/**
 * Configuración de GraphQL.
 */

// NOTE: Eliminar console de los errores y demás para producción. Lo dejo en desarollo para tener una mayor información de
// de los errores producidos.
// NOTE: En la configuración de onError, está el parámetro response. Puedo jugar con él 
// igual que graphQLErrors y networkError. Si hiciese falta, atacarlo.

import { effect } from '@angular/core';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { NamedOptions } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { environment } from '../../environments/environment.development';
import { user } from '../signals/user.signal';


export function ConfigGraphql( httpLink: HttpLink ): NamedOptions {

  let token: string = '';
  
  effect( () => {

      token = user();
      console.log('an-LOG: El actual valor de user-signal:', token);

  });

  // Configuración error.

  const errorLink = onError(({ graphQLErrors, networkError, response, operation, forward }) => {
    
    if (graphQLErrors) {
      graphQLErrors.map( item => {
        const { message, originalError } = item;
        console.warn('AN-WARN: GraphQLError: ', originalError);
      });
    }
    if (networkError) 
      console.warn('an-WARN: Network error: ', networkError);
    
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

  const httpOauth = httpLink.create({
    uri: environment.oauth,
    withCredentials: true,
  });

  const httpTask = httpLink.create({
    uri: environment.task,
    withCredentials: true,
  });

  // Configuración socket link.

  const wss = new GraphQLWsLink(createClient({
    url: environment.taskWss,
    connectionParams: {
      Authorization: token,
    }
  }));

  // Configuración link.

  const linkOauth = ApolloLink.from([errorLink, httpOauth]);

  const linkTask = ApolloLink.split( ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
    wss,
    ApolloLink.from([errorLink, authLink, httpTask]),
  );

  return {
    oauth: {
      cache: new InMemoryCache(),
      link: linkOauth,
    }, 
    task: {
      cache: new InMemoryCache(),
      link: linkTask,
    }
  }
  
}
