/**
 * Comprueba si un usuario está autorizado. 
 */

import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { USER_STORE } from 'src/signals/signal.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  userStore = inject(USER_STORE);
  router = inject(Router);

  jwtHelper: JwtHelperService = new JwtHelperService();
  userToken = this.userStore.select('id');

  canActivate(): boolean {

    if ( this.jwtHelper.isTokenExpired(this.userToken()) ) {
      this.router.navigate(['/signin']);
      return false;
    } else {
      return true;
    }
    
  }

}
