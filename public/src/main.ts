/**
 * Arranque de la aplicación an-todo-16072023.
 */

import { enableProdMode, importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { ApolloModule } from 'apollo-angular';

import { from, queueScheduler, Subscription } from 'rxjs';

import { environment } from './environments/environment.development';
import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/app.routes';
import { OauthModule } from './shared/graphql/oauth.module';
import { TaskModule } from './shared/graphql/task.module';
import { ConfigService } from './config/config.service';


( environment.production ) ? enableProdMode() : console.info('an-INFO: Angular se ejecuta en modo desarrollo.');

function initializeAppFactory( config: ConfigService ) {
  
  const tasks = [
    config.setStore(),
    config.setBackground(), 
    config.userForgetPassword(), 
    config.userRoute(),
  ];

  return () => {
    
    const subscription: Subscription = from(tasks, queueScheduler)
      .subscribe({
        next: (result) => {
          console.log('an-LOG: Configuración: ', result);
        }, 
        error: (err) => {
          console.error('an-ERROR: Error en configuración: ', err); 
        }
      });
    subscription.unsubscribe();

  }

}

( async (): Promise<void> => {
  try {
    await bootstrapApplication(AppComponent, {
      providers: [
        importProvidersFrom(
          ApolloModule, 
          TaskModule, 
          OauthModule,
        ),
        provideHttpClient(),
        provideRouter(AppRoutes, withComponentInputBinding()),
        {
          provide: APP_INITIALIZER,
          useFactory: initializeAppFactory,
          multi: true,
          deps:[ConfigService],
        },
      ]
    });
    console.info('an-INFO: Comienza la aplicacion AN-TODO-17072023.');
  } catch (err) {
    console.error('an-ERROR:', err);
  }
})();