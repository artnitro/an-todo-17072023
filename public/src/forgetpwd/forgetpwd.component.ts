/**
 * Componente Forget Passwword.
 */

import { Component, OnInit, effect } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router} from '@angular/router';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { FormFieldsAbstract } from 'src/shared/Forms/form-fields.abstract';
import { CardSessionComponent } from 'src/components/card-session/card-session.component';
import { colors } from 'src/config/config.service';
import { ConfirmPasswordValidator } from 'src/shared/Forms/validators/confirm-password.validator';
import { userForgetpwd } from 'src/shared/signals/user.signal';
import { FormService } from 'src/services/forms/form.service';
import { Unsubscribe } from 'src/decorators/unsubscribe.decorator';
import { ForgetpwdService } from './forgetpwd.service';
import { CardPasswordComponent } from 'src/components/card-password/card-password.component';


@Component({
  selector: 'an-todo-forgetpwd',
  standalone: true,
  imports: [
    NgStyle,
    RouterLink,
    ReactiveFormsModule,
    CardSessionComponent,
    CardPasswordComponent,
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
  colors: {[key: string]: any} = colors;
  userEmail: string = '';
  showEmail: boolean = true;
  showPassword: boolean = false;
  showSend: boolean = true;
  panelInfo:boolean = false;
  textInfo: string = ''; 

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private forgetpwdService: ForgetpwdService,
  ) {
    
    super();

    effect( () => {

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
                this.showSend = true;
                userForgetpwd.set('ok');
              } else {
                this.showEmail = false;
                this.panelInfo = true;
                this.textInfo = 'El identificador de usuario ha expirado o el identificador de usuario es incorrecto.'
                this.showSend = false;
                userForgetpwd.set('ok');
              }
            }
          })
        );
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

  checkForm(value: Boolean): void {

    if ( value ) {

      this.hasEmailError = this.formService.hasFieldError(this.forgetEmailForm);

      if ( Object.keys(this.hasEmailError).length === 0 ) {

        this.subscription$.add(
          this.forgetpwdService.uuidForgetpwd$({
            email: this.forgetEmailForm.value.email,
          })
          .pipe(map(result => result.data.uuidForgetpwd))
          .subscribe({
            next: (uuidForgetpwd) => {

              //console.log('an-LOG: uuid de usuario: ', uuidForgetpwd);

              this.showEmail = false;
              this.panelInfo = true;
              this.textInfo = 'Recibirás un mensaje a esa dirección de correo para poder modificar tu contraseña.' 
              this.showPassword = false;
              this.showSend = false;
            },
            error: (err) => {
              Object
                .keys(err.graphQLErrors)
                .filter( element => {
                  const { originalError } = err.graphQLErrors[element];
                  if ( originalError.statusCode === 401 || Array.isArray(originalError['message']) ) {
                    Object
                      .keys(this.forgetEmailForm.controls)
                      .filter(value => this.forgetEmailForm.controls[value].setValue(''));
                    this.hasEmailError = this.formService.hasFormError(this.forgetEmailForm);
                  } else {
                    this.panelInfo = true;
                    this.textInfo = 'Fallo en el servidor de envío de correo electrónico. Intente más tarde la solicitud de autorización para el cambio de contraseña. Disculpe las molestias.';
                    this.showEmail = false;
                    this.showSend = false;
                  }
                });
            } 
          })
        )

      }

    } else {

      this.hasPasswordError = this.formService.hasFieldError(this.forgetPasswordForm);

      if ( Object.keys(this.hasPasswordError).length === 0 ){
  
        this.subscription$.add(
          this.forgetpwdService.changePassword$({
            email: this.userEmail,
            password: this.forgetPasswordForm.value.password,
          })
          .pipe(map(result => result.data.changePassword))
          .subscribe({
            next: (changePassword) => {
              this.showEmail = false;
              this.showPassword = false;
              this.showSend = false;
              this.panelInfo = true;
              this.textInfo = 'Su contraseña se ha modificado correctamente. Con esta nueva contraseña podrá acceder a la aplicación.';
              userForgetpwd.set('ok');   
            },
            error: (err) => {
              Object
                .keys(err.graphQLErrors)
                .filter( element => {
                  const { originalError } = err.graphQLErrors[element];
                  if ( originalError.statusCode === 400 || originalError.statusCode === 401 ) {
                    Object
                      .keys(this.forgetPasswordForm.controls)
                      .filter(value => this.forgetPasswordForm.controls[value].setValue(''));
                    this.hasPasswordError = this.formService.hasFormError(this.forgetPasswordForm);
                  }
                });
            }
          })
        )
  
      }

    }

  }

}
