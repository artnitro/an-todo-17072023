/**
 * Componente Dashboard.
 */

import { Component, OnInit, effect } from '@angular/core';
import { user } from 'src/shared/signals/user.signal';

// TODO: Comprobar que el token es válido.

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(){

    effect( () => {
      console.log('AN-LOG: El actual valor de Signal: ', user());
    });

  }

  ngOnInit(): void {

    console.info('AN-INFO: Ejecutando DashboardComponent.');

  }

}
