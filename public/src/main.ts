import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { environment } from './environments/environment.development';
import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/app.routes';

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
        provideRouter(AppRoutes),
      ]
    });
    console.info('an-INFO: Comienza la aplicacion AN-TODO-17072023.');
  } catch (err) {
    console.error('an-ERROR:', err);
  }
})();