import { Routes } from '@angular/router';

import { SigninComponent } from '../signin/signin.component'
import { SignupComponent } from '../signup/signup.component';
import { ForgetpwdComponent } from '../forgetpwd/forgetpwd.component';
import { DashboardComponent } from 'src/dashboard/dashboard.component';


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
  },
];
