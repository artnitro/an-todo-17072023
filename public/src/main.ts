import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { APOLLO_NAMED_OPTIONS, ApolloModule, NamedOptions } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

import { environment } from './environments/environment.development';
import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/app.routes';
import { SERVICES } from './shared/config'; 


/**
 * Comprobamos si se está ejecutando en modo PRODUCCIÓN.
 */

( environment.production ) ? enableProdMode() : console.info('an-INFO: Angular se ejecuta en modo desarrollo.');

/**
 * Arrancamos la aplicación mediante Standalone Componnents.
 */

( async (): Promise<void> => {
  try {
    await bootstrapApplication(AppComponent, {
      providers: [
        importProvidersFrom(HttpClientModule, ApolloModule),
        provideRouter(AppRoutes),
        {
          provide: APOLLO_NAMED_OPTIONS,
          useFactory(httpLink: HttpLink): NamedOptions {
            return {
              // default: { Con este valor, toma esta dirección por defecto. }
              api: {
                cache: new InMemoryCache(),
                link: httpLink.create({
                  uri: SERVICES['api'],
                }),
              },
              oauth: {
                cache: new InMemoryCache(),
                link: httpLink.create({
                  uri: SERVICES['oauth'],
                }),
              },
            };
          },
          deps: [HttpLink],
        }, 
      ]
    });
    console.info('an-INFO: Comienza la aplicacion AN-TODO-17072023.');
  } catch (err) {
    console.error('an-ERROR:', err);
  }
})();