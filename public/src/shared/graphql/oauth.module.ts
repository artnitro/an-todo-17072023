/**
 * Módulo GraphQL para oauth.
 */

// NOTE: Mirar las opciones que presenta httpLink.create().
// NOTE: Mirar las opciones que presenta apollo.create().

import { NgModule } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { from, InMemoryCache } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';

import { environment } from 'src/environments/environment.development';


@NgModule()
export class OauthModule {

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
  ) {

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
    
    // Configuración HttpLink.

    const oauth = httpLink.create({ 
      uri: environment.oauth,
      withCredentials: true,
    });

    const oauthLink = from([errorLink, oauth]);

    // Crear enlace oauth para consultas.

    apollo.create({
      link: oauthLink,
      cache: new InMemoryCache(),
    }, 'oauth');

  }

}
