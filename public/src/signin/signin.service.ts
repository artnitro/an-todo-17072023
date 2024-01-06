/**
 * Servicio signin.
 */

import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import { Observable } from 'rxjs';

import { GET_IS_USER } from './signin.query';
import { UserData } from './signin.interface';


@Injectable({
  providedIn: 'root',
})
export class SigninService {

  constructor(
    private apollo: Apollo,
  ){}
  
  /**
   * @description Consulta para ver si es usuario de la aplicación.
   * @param data Usedata
   * @returns Observable
   */
  isUser$(data: UserData): Observable<any> {
    
    return this.apollo
      .use('oauth')
      .watchQuery({
        query: GET_IS_USER,
        variables: {
          email: data['email'],
          password: data['password']
        }
      })
      .valueChanges;
      
  }

}
