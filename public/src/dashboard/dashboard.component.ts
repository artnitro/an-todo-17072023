/**
 * Componente Dashboard.
 */

import { Component, OnInit, effect } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { user } from 'src/shared/signals/user.signal';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  jwtHelper: JwtHelperService = new JwtHelperService();
  tokenData!: any;

  constructor() {

    effect( () => {
      console.log('AN-LOG: El actual valor de Signal: ', user());
      this.tokenData = this.jwtHelper.decodeToken(user());
      console.log('AN-LOG: Email del token: ', this.tokenData.email)
    });

  }

  ngOnInit(): void {

    console.info('AN-INFO: Ejecutando DashboardComponent');

  }

}
