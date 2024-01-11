/**
 * Componente Signin.
 */

// TODO: Eliminar Subscription
// TODO: Ver dónde guardar el Token de usuario.

import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { Apollo } from 'apollo-angular';

import { Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { FormFieldsAbstract } from 'src/shared/Forms/form-fields.abstract';
import { CardSessionComponent } from 'src/components/card-session/card-session.component'; 
import { FormService } from 'src/services/forms/form.service';
import { COLORS } from 'src/shared/config';
import { GET_IS_USER } from './signin.query';
import { SigninService } from './signin.service';

import { user } from 'src/shared/signals/user.signal';

@Component({
  selector: 'an-todo-signin',
  standalone: true,
  imports: [
    NgStyle,
    RouterLink,
    ReactiveFormsModule,
    CardSessionComponent,
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent extends FormFieldsAbstract implements OnInit {

  signinForm!: FormGroup;
  querySubscription!: Subscription;

  title: string = 'Iniciar sesión';
  hasError: {[key: string]: any} = {};
  colors: {[key: string]: any} = COLORS; 
    
  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private apollo: Apollo,
    private signinService: SigninService,
    private router:Router,
  ) {
    super();
  }

  ngOnInit(): void {

    console.info('an-INFO: Ejecutando SigninComponent.');

    this.signinForm = this.fb.group({
      email: this.email(),
      password: this.password(),
    });

  }

  checkForm(): void {

    this.hasError = this.formService.hasFieldError(this.signinForm);

    if ( Object.keys(this.hasError).length === 0 ) {
      this.querySubscription = this.signinService
        .isUser$({
          email: this.signinForm.value.email,
          password: this.signinForm.value.password,
        })
        .pipe(map(result => result.data.isUser))
        .subscribe({
          next: (isUser) => {
            console.log('AN-LOG: Datos de la consulta: ', isUser.access_token);
            
          },
          error: (err) => {
            Object
              .keys(err.graphQLErrors)
              .filter( element => {
                const { originalError } = err.graphQLErrors[element];
                if ( originalError.statusCode === 400 || originalError.statusCode === 401 ) {
                  this.signinForm.controls['email'].setValue('');
                  this.signinForm.controls['password'].setValue('');
                  this.hasError = {
                    email: true,
                    password: true
                  }
                }
              });
          }
        });
    }

  }
  
}
