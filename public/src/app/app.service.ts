/**
 * Servicio app.
 */

import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import { Observable } from 'rxjs';

import { GET_REFRESH_USER } from './app.query';


@Injectable({
  providedIn: 'root',
})
export class AppService {

  constructor(
    private apollo: Apollo,
  ){}
  
  /**
   * @description Consulta para obtener datos de usuario.
   * @returns Observable
   */
  refreshUser$(): Observable<any> {
    
    return this.apollo
      .use('oauth')
      .watchQuery({
        query: GET_REFRESH_USER,
      })
      .valueChanges;
      
  }

}