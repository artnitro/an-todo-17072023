/**
 * Componente Forget Passwword.
 */

import { Component, OnInit, effect } from '@angular/core';
import { NgStyle, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router} from '@angular/router';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { FormFieldsAbstract } from 'src/shared/Forms/form-fields.abstract';
import { CardSessionComponent } from 'src/components/card-session/card-session.component';
import { COLORS } from 'src/shared/config';
import { ConfirmPasswordValidator } from 'src/shared/Forms/validators/confirm-password.validator';
import { userForgetpwd } from 'src/shared/signals/user.signal';
import { FormService } from 'src/services/forms/form.service';
import { Unsubscribe } from 'src/decorators/unsubscribe.decorator';
import { ForgetpwdService } from './forgetpwd.service';


@Component({
  selector: 'an-todo-forgetpwd',
  standalone: true,
  imports: [
    NgStyle,
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    CardSessionComponent,
  ],
  templateUrl: './forgetpwd.component.html',
  styleUrls: ['./forgetpwd.component.scss']
})
@Unsubscribe()
export class ForgetpwdComponent extends FormFieldsAbstract implements OnInit {

  forgetEmailForm!: FormGroup;
  forgetPasswordForm!: FormGroup;
  subscription$: Subscription = new Subscription();

  title: string = '¿Olvidaste la contraseña?';
  hasEmailError: {[key: string]: any} = {};
  hasPasswordError: {[key: string]: any} = {};
  colors: {[key: string]: any} = COLORS;
  userEmail: string = '';
  showEmail: boolean = true;
  showPanel: boolean = false;
  showPassword: boolean = false;
  showPanelPwd: boolean = false;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private forgetpwdService: ForgetpwdService,
  ) {
    
    super();

    effect( () => {
      console.log('an-LOG: El valor actual de Signal, forget password: ', userForgetpwd());

      if ( userForgetpwd() !== 'ok' ) {
        this.subscription$.add(
          this.forgetpwdService.isUserForgetpwd$({
            uuid: userForgetpwd(),
          })
          .pipe(map(result => result.data.isUserForgetpwd))
          .subscribe({
            next: (isUserForgetpwd) => {
              if ( isUserForgetpwd !== null ) {
                this.userEmail = isUserForgetpwd;
                this.showEmail = false;
                this.showPassword = true;
              } else {
                this.showEmail = false;
                this.showPanelPwd = true;
              }
            }
          })
        );
      } else {
        this.showEmail = true;
      }
      
    });

  }
  ngOnInit(): void {

    console.info('an-INFO: Ejecutando ForgetpwdComponent.');

    this.forgetEmailForm = this.fb.group({
      email: this.email(),
    });
    this.forgetPasswordForm = this.fb.group({
      password: this.password(),
      confirmPassword: this.password(),
    }, {
      validator: ConfirmPasswordValidator.confirmPassword
    });

  }

  checkMail(): void {

    this.hasEmailError = this.formService.hasFieldError(this.forgetEmailForm);

    if ( Object.keys(this.hasEmailError).length === 0 ) {

      this.subscription$.add(
        this.forgetpwdService.uuidForgetpwd$({
          email: this.forgetEmailForm.value.email,
        })
        .pipe(map(result => result.data.uuidForgetpwd))
        .subscribe({
          next: (uuidForgetpwd) => {
            console.log('an-LOG: uuid de usuario: ', uuidForgetpwd);
            this.showEmail = false;
            this.showPanel = true;
            this.showPassword = false;
            this.showPanelPwd = false;
          },
          error: (err) => {
            Object
              .keys(err.graphQLErrors)
              .filter( element => {
                const { originalError } = err.graphQLErrors[element];
                if ( originalError.statusCode === 400 || originalError.statusCode === 401 ) {
                  Object
                    .keys(this.forgetEmailForm.controls)
                    .filter(value => this.forgetEmailForm.controls[value].setValue(''));
                  this.hasEmailError = this.formService.hasFormError(this.forgetEmailForm);
                }
              });
          }
        })
      )

    }

  }

  checkPassword(): void {

    this.hasPasswordError = this.formService.hasFieldError(this.forgetPasswordForm);

    console.log('an-LOG: Formulario passoword: ', this.hasPasswordError);
    console.log('an-LOG: Comprobando si es usuario: ', this.userEmail);

  }

}
