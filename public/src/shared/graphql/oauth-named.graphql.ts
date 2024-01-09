/**
 * Configuración de GraphQL.
 */

// NOTE: Eliminar console para producción. La dejo en desarollo para tener una mayor información de
// de los errores producidos.
// NOTE: En la configuración de onError, está el parámetro response. Puedo jugar con él 
// igual que graphQLErrors y networkError. Si hiciese falta, atacarlo.

import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { NamedOptions } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { environment } from '../../environments/environment.development';


export function OauthNamedGraphql( httpLink: HttpLink ): NamedOptions {

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

  // Configuración http link.

  const http = httpLink.create({
    uri: environment.oauth,
    withCredentials: true,
  });

  // Configuración link.

  const link = ApolloLink.from([errorLink, http]);

  return {
    oauth: {
      cache: new InMemoryCache(),
      link: link,
    }
  }
  
}
