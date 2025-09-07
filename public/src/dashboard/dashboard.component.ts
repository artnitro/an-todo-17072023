/**
 * Componente Dashboard.
 */

import { Component, inject, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { RouterOutlet, Router, RouterLink, ActivatedRoute } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { DashboardService } from './dashboard.service';
import { Unsubscribe } from 'src/decorators/unsubscribe.decorator';

import { USER_STORE, TASK_STORE } from 'src/signals/signal.service';
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

  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private dashboardService = inject(DashboardService);
  private userStore = inject(USER_STORE);
  private taskStore = inject(TASK_STORE);

  private jwtHelper: JwtHelperService = new JwtHelperService();
  private subscription$: Subscription = new Subscription();

  private userData!: any;


  menuOptions: IMenuOpctions[] = [
    {options: 'dashboard', backgroundColor: colors['menuDashboard'], isClicked: false, route: '/dashboard'}, 
    {options: 'tasks', backgroundColor: colors['menuDashboard'], isClicked: false, route: '/dashboard/tasks'},
    {options: 'calendar', backgroundColor: colors['menuDashboard'], isClicked: false, route: '/dashboard/calendar'},
    {options: 'pupils', backgroundColor: colors['menuDashboard'], isClicked: false, route: '/dashboard/pupils'},
    {options: 'settings', backgroundColor: colors['menuDashboard'], isClicked: false, route: '/dashboard/settings'},
    {options: 'exit', backgroundColor: colors['menuDashboard'], isClicked: false, route: '/dashboard/exit'},
  ];

  

  ngOnInit(): void {

    console.info('AN-INFO: Ejecutando DashboardComponent');

    // Menú dashboard por defecto, con su color de fondo y estado de click.

    this.menuOptions[0].backgroundColor = colors['menuDashboardClick'];
    this.menuOptions[0].isClicked = true;

    this.userData = this.jwtHelper.decodeToken(this.userStore.select('id')());

    // Obtener el ID del usuario desde el Resolve de la ruta.

    this.subscription$.add(
      this.route.data
        .pipe(map(data => data['profile']))
        .subscribe({
          next: (data) => {
            if (data !== null) {
              this.setTaskStore(data);
            } else {
              this.registeringUserInTask();
            }
          },
          error: (err) => {
            console.error('an-ERROR: Error en el Resolve de ruta: ', err);
          }
        })
    ); 
    
    // Saludando al usuario y escuchando mensajes del servidor.

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

  // Actualizar el Store de task.

  setTaskStore(data: string): void {
    this.taskStore.updateKey('id', data);
  }

  // Registrar el usuario en Tasks.

  registeringUserInTask() {
    console.log('an-LOG: Registrando usuario en tareas');
    this.subscription$.add(
      this.dashboardService.setUser$({
        firstName: this.userData['firstName'],
        nickName: this.userData['nickName'] || null,
        email: this.userData['email'],
      })
      .pipe(map(result => result.data.setUser))
      .subscribe({
        next: (data) => {
          this.setTaskStore(data._id);
        },
        error: (err) => {
          console.error('an-ERROR: Error al registrar el usuario en tareas: ', err);
        }
      })
    );
       
  }

  // Eventos del menú Dashboard.

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
