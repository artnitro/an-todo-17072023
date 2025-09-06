/**
 * Dashboard service.
 */

import { Injectable, inject } from '@angular/core';

import { Apollo } from 'apollo-angular';

import { Observable } from 'rxjs';

import { GREETINGS } from './dashboard.query';
import { ON_NEW_MESSAGE } from './dashboard.subscription';
import { SET_USER } from './dashboard.mutation';


interface UserData {
  firstName: string;
  nickName?: string | null;
  email: string;

}


@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private apollo: Apollo = inject(Apollo);

  greetings$(): Observable<any> {

    return this.apollo
      .use('task')
      .watchQuery({
        query: GREETINGS
      })
      .valueChanges;

  }

  newMesaage$(): Observable<any> {
    return this.apollo
      .use('task')
      .subscribe({
        query: ON_NEW_MESSAGE
      })
  }

  setUser$(data: UserData): Observable<any> {

    return this.apollo
      .use('task')
      .mutate({
        mutation: SET_USER,
        variables: {
          firstName: data['firstName'],
          nickName: data['nickName'] || null,
          email: data['email'],
        }
      });

  }

}
