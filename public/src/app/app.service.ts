/**
 * App Service.
 */

import { Injectable, inject } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

import { GET_GET_USER } from './app.query';


@Injectable({
  providedIn: 'root',
})
export class AppService {

  private apollo: Apollo = inject(Apollo);

  getUser$(data: string): Observable<any> {
    return this.apollo
      .use('task')
      .watchQuery({
        query: GET_GET_USER,
        variables: { 
          email: data
        }
      })
      .valueChanges;
  }

}