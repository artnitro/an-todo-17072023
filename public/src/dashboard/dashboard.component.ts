/**
 * Componente Dashboard.
 */

import { Component, inject, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { RouterOutlet, Router, RouterLink } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { DashboardService } from './dashboard.service';
import { Unsubscribe } from 'src/decorators/unsubscribe.decorator';

import { USER_STORE } from 'src/signals/signal.service';
import { colors } from 'src/config/config.service';


// Interfaces.

interface IMenuOpctions {
  options: string;
  backgroundColor: string;
  isClicked: boolean;
  route: string;
}

// Componente.

@Component({
  selector: 'an-todo-dashboard',
  standalone: true,
  imports: [ 
    RouterOutlet, 
    RouterLink,
    NgStyle,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss', 
})
@Unsubscribe()
export class DashboardComponent implements OnInit {

  //private apollo = inject(Apollo);
  private router: Router = inject(Router);
  private dashboardService = inject(DashboardService);
  private userStore = inject(USER_STORE);

  private jwtHelper: JwtHelperService = new JwtHelperService();
  private subscription$: Subscription = new Subscription();

  private tokenData!: any;

  menuOptions: IMenuOpctions[] = [
    {options: 'home', backgroundColor: colors['menuDashboard'], isClicked: false, route: '/dashboard'}, 
    {options: 'tasks', backgroundColor: colors['menuDashboard'], isClicked: false, route: '/dashboard/tasks'},
    {options: 'calendar', backgroundColor: colors['menuDashboard'], isClicked: false, route: '/dashboard/calendar'},
    {options: 'pupils', backgroundColor: colors['menuDashboard'], isClicked: false, route: '/dashboard/pupils'},
    {options: 'settings', backgroundColor: colors['menuDashboard'], isClicked: false, route: '/dashboard/settings'},
    {options: 'exit', backgroundColor: colors['menuDashboard'], isClicked: false, route: '/dashboard/exit'},
  ];

  userData = this.userStore.select('id');


  ngOnInit(): void {

    // Menú HOME por defecto, con su color de fondo y estado de click.

    this.menuOptions[0].backgroundColor = colors['menuDashboardClick'];
    this.menuOptions[0].isClicked = true;


    console.info('AN-INFO: Ejecutando DashboardComponent');

    console.log('an-LOG: Signals: ', this.userData());
    console.log('an-LOG: Store: ', this.userStore.get());

    this.tokenData = this.jwtHelper.decodeToken(this.userData()).email;
    console.log('an-LOG: Email del token: ', this.tokenData);

    this.subscription$.add(
      this.dashboardService.greetings$()
        .pipe(map(result => result.data))
        .subscribe({
          next: (data) => {
            console.log('an-LOG: Saludos: ', data.getHello);
          },
          error: (err) => {
            console.error('an-ERROR: Error en la consulta: ', err);
          }
        })
    )

    this.subscription$.add(
      this.dashboardService.newMesaage$()
      .pipe(map(result => result))
      .subscribe({
        next: (result) => {
          console.log('an-LOG: Datos del Socket: ', result);
        },
        error: (err) => {
          console.error('an-ERROR: Error en el Socket ', err);
        }
      })
    )

  }

  onMouseOver(option: string): void {
    
    const selectedOption = this.menuOptions.find(opt => opt.options === option);

    if (selectedOption && !selectedOption.isClicked) {
      selectedOption.backgroundColor = colors['menuDashboardHover'];
    }

  }

  onMouseOut(option: string): void {
    
    const selectedOption = this.menuOptions.find(opt => opt.options === option);

    if (selectedOption && !selectedOption.isClicked) {
      selectedOption.backgroundColor = colors['menuDashboard'];
    }
   
  }

  onMouseDown(option: string): void {

    console.log(`an-LOG: Mouse down en la opción: ${option}`);

    this.menuOptions.forEach(opt => {
      if (opt.options === option) {
        opt.isClicked = true;
        opt.backgroundColor = colors['menuDashboardClick'];
        this.router.navigate([opt.route]);
      } else {
        opt.isClicked = false;
        opt.backgroundColor = colors['menuDashboard'];
      }
    });

  }

}
