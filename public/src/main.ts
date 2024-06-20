/**
 * Arranque de la aplicación an-todo-16072023.
 */

import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { APOLLO_OPTIONS, APOLLO_NAMED_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { environment } from './environments/environment.development';
import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/app.routes';
//import { ConfigGraphql } from './shared/graphql/config.graphql';
//import { ApiGraphql } from './shared/graphql/api.graphql';

import { OauthModule } from './shared/graphql/oauth.module';
import { TaskModule } from './shared/graphql/task.module';


//Comprobamos si se está ejecutando en modo PRODUCCIÓN.

( environment.production ) ? enableProdMode() : console.info('an-INFO: Angular se ejecuta en modo desarrollo.');

// Arrancamos la aplicación mediante Standalone Componnents.

( async (): Promise<void> => {
  try {
    await bootstrapApplication(AppComponent, {
      providers: [
        importProvidersFrom(
          HttpClientModule, 
          ApolloModule, 
          TaskModule, 
          OauthModule,
        ),
        provideRouter(AppRoutes, withComponentInputBinding()),
        /* {
          provide: APOLLO_OPTIONS,
          useFactory: ApiGraphql,
          deps: [HttpLink],
        }, */
        /* {
          provide: APOLLO_NAMED_OPTIONS,
          useFactory: ConfigGraphql, 
          deps: [HttpLink],
        }, */
      ]
    });
    console.info('an-INFO: Comienza la aplicacion AN-TODO-17072023.');
  } catch (err) {
    console.error('an-ERROR:', err);
  }
})();