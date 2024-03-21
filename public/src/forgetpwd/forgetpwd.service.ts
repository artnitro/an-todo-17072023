/**
 * Servicion forgetpwd
 */

import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import { Observable } from 'rxjs';

import { UserData } from './forgetpwd.interface';
import { GET_UUID_FORGETPWD } from './forgetpwd.query';
import { user } from 'src/shared/signals/user.signal';


@Injectable({
  providedIn: 'root',
})
export class ForgetpwdService {

  constructor(
    private apollo: Apollo,
  ){}

  uuidForgetpwd$( data: UserData): Observable<any> {
    
    return this.apollo
      .use('oauth')
      .watchQuery({
        query: GET_UUID_FORGETPWD,
        variables: {
          email: data['email']
        }
      })
      .valueChanges;

  }

}