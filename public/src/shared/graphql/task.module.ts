/**
 * Módulo GraphQL para task.
 */

import { NgModule, effect } from '@angular/core';

import { ApolloLink, InMemoryCache, from, split } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { createClient } from 'graphql-ws';

import { user } from '../signals/user.signal';
import { environment } from 'src/environments/environment.development';


@NgModule()
export class TaskModule {

  constructor(
    private httpLink: HttpLink,
    private apollo: Apollo,
  ) {

    let token: string = '';

    effect( () => {

      token = user();
      console.log('an-LOG: Valor user-signals:', token);

    });

    // Configuración del error.

    const errorLink = onError(({ graphQLErrors, networkError, response, operation, forward }) => {
    
      if (graphQLErrors) {
        graphQLErrors.map( item => {
          const { message, originalError } = item;
          console.warn('AN-WARN: GraphQLError: ', originalError);
        });
      }
      if (networkError) 
        console.warn('an-WARN: Network error: ', networkError);
  
    });

    // Configuración authorization header.

    const authLink = new ApolloLink((operation, forward) => {

      operation.setContext({
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        }
      });

    return forward(operation);
  
    });

    // Configuración HttpLink.

    const task = httpLink.create({
      uri: environment.task,
      withCredentials: true,
    });

    // Configuración socket link.

    const wss = new GraphQLWsLink(createClient({
      url: environment.taskWss,
      connectionParams: {
        Authorization: token ? `Bearer ${token}` : '',
      }
    }));

    const taskLink = split( ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
      wss,
      from([errorLink, authLink, task]),
    );

    // Crear enlace para consultas.
    
    apollo.create({
      link: taskLink,
      cache: new InMemoryCache(),
    }, 'task');

  }

}
