/**
 * Configuro rutas de la aplicación.
 */

import { Routes } from '@angular/router';

import { SigninComponent } from '../signin/signin.component'
import { SignupComponent } from '../signup/signup.component';
import { ForgetpwdComponent } from '../forgetpwd/forgetpwd.component';
import { DashboardComponent } from 'src/dashboard/dashboard.component';
import { AuthGuard } from 'src/guard/auth.guard';


// NOTE: Cuando pueda, agregar página 404 a la aplicación.


export const AppRoutes: Routes = [
  { 
    path: 'signin', 
    component: SigninComponent,
  },
  { 
    path: 'signup', 
    loadComponent: () => import('../signup/signup.component').then(mod => mod.SignupComponent),
  },
  { 
    path: 'forgetpwd', 
    loadComponent: () => import('../forgetpwd/forgetpwd.component').then(mod => mod.ForgetpwdComponent),
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [ AuthGuard ],
  },
];
