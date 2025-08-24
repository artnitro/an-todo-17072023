/**
 * Resolver para buscar datos del perfil del usuario.
 */

import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import { USER_STORE } from 'src/signals/signal.service';
import { AppService } from './app.service';


/**
 * @description Resolver para el perfil del usuario.
 * @param route 
 * @param state 
 * @returns 
 */
export const profileResolver: ResolveFn<string | null> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string | null> => {

  const jwtHelper: JwtHelperService = new JwtHelperService();
  const userStore = inject(USER_STORE);
  const appService = inject(AppService);

  return appService.getUser$(jwtHelper.decodeToken(userStore.select('id')()).email).pipe(
    filter(user => !!user), // Asegurarse de que el usuario no sea nulo o indefinido
    map(user => user.data),
    switchMap(getUser => {
     return (getUser && getUser['getUser'] && getUser['getUser'].length > 0)
      ? of(getUser['getUser'][0]['_id'])
      : of(null);
    }),
    catchError((err) => {
      console.error('an-ERROR: Error en el resolve para la obteción de los datos de ususario:', err);
      return of(null);
    }),
  );

};
