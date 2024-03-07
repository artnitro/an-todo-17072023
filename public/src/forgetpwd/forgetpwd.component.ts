/**
 * Componente Forget Passwword.
 */

import { Component, OnInit, effect } from '@angular/core';
import { NgStyle, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router} from '@angular/router';

import { FormFieldsAbstract } from 'src/shared/Forms/form-fields.abstract';
import { CardSessionComponent } from 'src/components/card-session/card-session.component';
import { COLORS } from 'src/shared/config';
import { ConfirmPasswordValidator } from 'src/shared/Forms/validators/confirm-password.validator';
import { userForgetpwd } from 'src/shared/signals/user.signal';


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
export class ForgetpwdComponent extends FormFieldsAbstract implements OnInit {

  forgetEmailForm!: FormGroup;
  forgetPasswordForm!: FormGroup;

  title: string = '¿Olvidaste la contraseña?';
  hasEmailError: {[key: string]: any} = {};
  hasPasswordError: {[key: string]: any} = {};
  colors: {[key: string]: any} = COLORS;
  showEmail: boolean = true;
  showPanel: boolean = false;
  showPassword: boolean = false;
  showSend: boolean = true;

  constructor(
    private fb: FormBuilder,
  ) {
    
    super();

    effect( () => {
      console.log('an-LOG: El valor actual de Signal: ', userForgetpwd());
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

  checkForm(): void {

  }

}
