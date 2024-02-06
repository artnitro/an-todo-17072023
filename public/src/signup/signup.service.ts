/**
 * Servicio signup.
 */

import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import { Observable } from 'rxjs';

import { SET_USER } from './signup.mutation';
import { UserData } from './signup.interface';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private apollo: Apollo,
  ) {}


  createUser$(data: UserData): Observable<any> {

    return this.apollo
      .use('oauth')
      .mutate({
        mutation: SET_USER,
        variables: {
          firstName: data['firstName'],
          lastName: data['lastName'],
          email: data['email'],
          nickName: data['nickName'],
          password: data['password']
        }
      });

  }
  
}
