/**
 * Configuración de GraphQL sobre el servidor de autentificación.
 */

import { NamedOptions } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

import { SERVICES } from '../config';

export function OauthNamedGraphql( httpLink: HttpLink): NamedOptions {

  return {
    oauth: {
      cache: new InMemoryCache(),
      link: httpLink.create({
        uri: SERVICES['oauth'],
        withCredentials: true,
      }),
    }
  }
  
}