import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { APOLLO_OPTIONS, APOLLO_NAMED_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { environment } from './environments/environment.development';
import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/app.routes';
import { OauthNamedGraphql } from './shared/graphql/oauth-named.graphql';
import { ApiGraphql } from './shared/graphql/api.graphql';


//Comprobamos si se está ejecutando en modo PRODUCCIÓN.

( environment.production ) ? enableProdMode() : console.info('an-INFO: Angular se ejecuta en modo desarrollo.');

// Arrancamos la aplicación mediante Standalone Componnents.

( async (): Promise<void> => {
  try {
    await bootstrapApplication(AppComponent, {
      providers: [
        importProvidersFrom(HttpClientModule, ApolloModule),
        provideRouter(AppRoutes, withComponentInputBinding()),
        {
          provide: APOLLO_OPTIONS,
          useFactory: ApiGraphql,
          deps: [HttpLink],
        },
        {
          provide: APOLLO_NAMED_OPTIONS,
          useFactory: OauthNamedGraphql, 
          deps: [HttpLink],
        }, 
      ]
    });
    console.info('an-INFO: Comienza la aplicacion AN-TODO-17072023.');
  } catch (err) {
    console.error('an-ERROR:', err);
  }
})();